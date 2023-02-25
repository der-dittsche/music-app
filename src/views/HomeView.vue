<template>
  <h1>Listen to great music</h1>
  <div class="container">
    <h2 class="songlist__title">Songs</h2>

    <songList v-for="song in songs" :key="song.id" :song="song" />
  </div>
</template>

<script>
import { db } from "@/stores/firebase";
import {
  collection,
  query,
  startAfter,
  limit,
  getDocs,
  orderBy,
} from "firebase/firestore";
import songList from "@/components/homeview/songList.vue";
export default {
  components: {
    songList,
  },
  data() {
    return {
      songs: [],
      maxPerPage: 10,
      pendingRequest: false,
    };
  },
  mounted() {
    this.getSongsList();
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeMount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      const { scrollTop, offsetHeight } = document.documentElement;
      const { innerHeight } = window;
      const bottomOfWindow =
        Math.round(scrollTop) + innerHeight === offsetHeight;

      if (bottomOfWindow) {
        this.getSongsList();
      }
    },
    async getSongsList() {
      if (this.pendingRequest) {
        return;
      }

      this.pendingRequest = true;

      let documentSnapshots = await getDocs(collection(db, "songs"));
      const end = documentSnapshots.docs.length;
      const actual = this.songs.length;
      console.log("total:", end);
      console.log("actual:", actual);

      if (actual < end) {
        const songsCollectionRef = query(
          collection(db, "songs"),
          limit(this.maxPerPage)
        );

        documentSnapshots = await getDocs(
          songsCollectionRef,
          orderBy("timestamp")
        );
        const lastDoc =
          documentSnapshots.docs[documentSnapshots.docs.length - 1];

        const next = query(
          collection(db, "songs"),
          limit(this.maxPerPage),
          startAfter(lastDoc)
        );
        documentSnapshots = await getDocs(next);
      }
      if (actual > end) {
        const loadingsong = actual - end;
        console.log("ending:", loadingsong);

        const songsCollectionRef = query(
          collection(db, "songs"),
          limit(this.maxPerPage - loadingsong)
        );

        documentSnapshots = await getDocs(
          songsCollectionRef,
          orderBy("timestamp")
        );
        const lastDoc =
          documentSnapshots.docs[documentSnapshots.docs.length - 1];

        const nextpart = query(
          collection(db, "songs"),
          limit(this.maxPerPage - loadingsong),
          startAfter(lastDoc)
        );
        documentSnapshots = await getDocs(nextpart);
      } else {
        const songsCollectionRef = query(
          collection(db, "songs"),
          limit(this.maxPerPage)
        );
        documentSnapshots = await getDocs(
          songsCollectionRef,
          orderBy("timestamp")
        );
      }

      documentSnapshots.forEach((doc) => {
        this.songs.push({
          id: doc.id,
          comment_count: doc.data().comment_count,
          display_name: doc.data().display_name,
          original_name: doc.data().original_name,
          modified_name: doc.data().modified_name,
          artist: doc.data().artist,
          genre: doc.data().genre,
          url: doc.data().url,
          userid: doc.data().userid,
        });
      });

      this.pendingRequest = false;
    },
  },
};
</script>
