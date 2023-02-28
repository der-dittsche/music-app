<template>
  <main>
    <h1>Listen to great music</h1>
    <div class="container">
      <h2 class="songlist__title" v-icon.red.fs3="'headphone'">Songs</h2>

      <songList v-for="song in songs" :key="song.id" :song="song" />
    </div>
  </main>
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
import { useSongsStore } from "@/stores/songs";
export default {
  components: {
    songList,
  },
  data() {
    const storeMusic = useSongsStore();
    return {
      songs: [],
      maxPerPage: 10,
      pendingRequest: false,
      listetSongsSnapshot: null,
      allSongsSnapshot: null,
      storeMusic,
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

      this.allSongsSnapshot = await getDocs(collection(db, "songs"));
      const totalSongCount = this.allSongsSnapshot.docs.length;
      const listedSongCount = this.songs.length;
      let songsToLoad = this.maxPerPage;
      if (listedSongCount >= totalSongCount) {
        songsToLoad = 0;
      }

      if (songsToLoad > 0) {
        let songsQuery;
        if (this.listetSongsSnapshot === null) {
          songsQuery = query(
            collection(db, "songs"),
            orderBy("timestamp"),
            limit(songsToLoad)
          );
        } else {
          const lastDoc =
            this.listetSongsSnapshot.docs[
              this.listetSongsSnapshot.docs.length - 1
            ];
          songsQuery = query(
            collection(db, "songs"),
            orderBy("timestamp"),
            startAfter(lastDoc),
            limit(songsToLoad)
          );
        }

        const nextLoadedSongs = await getDocs(songsQuery);
        this.listetSongsSnapshot = nextLoadedSongs;
        nextLoadedSongs.forEach((doc) => {
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
      }
      this.pendingRequest = false;
    },
  },
};
</script>
<style>
.clr-red {
  color: red;
}
.clr-blue {
  color: blue;
}
.fs-3 {
  font-size: 3rem;
}
</style>
