<template>
  <main>
    <div class="play__content">
      <div class="play__content-button" @click.prevent="newSong(song)">
        <i class="bx bx-play-circle"></i>
      </div>
      <div class="play__content-info">
        <h1>{{ song.modified_name }}</h1>
        <p>{{ song.genre }}</p>
      </div>
    </div>
    <section id="comments">
      <div class="container">
        <h2 class="songlist__title">Comments ({{ song.comment_count }})</h2>
        <div
          class="songlist__comment_alert"
          v-if="comment_show_alert"
          :class="comment_alert_variant"
        >
          {{ comment_alert_message }}
        </div>

        <vee-form
          @submit="addComment"
          :validation-schema="schema_comment"
          v-if="storeUser.user.id"
        >
          <vee-field
            as="textarea"
            name="comment"
            placeholder="Add a comment here..."
            autocomplete="off"
          ></vee-field>
          <ErrorMessage name="comment" />

          <button type="submit" :disabled="comment_in_submission">
            Submit
          </button>
        </vee-form>
        <select v-model="sort">
          <option value="1">Latest</option>
          <option value="2">Oldest</option>
        </select>
        <div
          class="songlist__item"
          v-for="comment in sortedComments"
          :key="comment.id"
        >
          <div class="songlist__items-info">
            <h3>{{ comment.username }}</h3>
            <p>{{ comment.timestamp }}</p>
          </div>
          <div class="songlist__items-comments">{{ comment.comment }}</div>
        </div>
      </div>
    </section>
  </main>
</template>
<script>
import { useSongsStore } from "@/stores/songs";
import { useUserStore } from "@/stores/users";
import { mapActions } from "pinia";
import { usePlayerStore } from "@/stores/player";
import { db } from "@/stores/firebase";
import {
  doc,
  getDoc,
  collection,
  addDoc,
  updateDoc,
  onSnapshot,
  query,
} from "firebase/firestore";
export default {
  data() {
    const storeMusic = useSongsStore();
    const storeUser = useUserStore();
    let getSongsSnapshot = null;
    return {
      storeMusic,
      storeUser,
      song: {},
      schema_comment: {
        comment: "required|min:3",
      },
      comment_in_submission: false,
      comment_show_alert: false,
      comment_alert_variant: "clr-blue",
      comment_alert_message: "Please wait! Your comment is being submitted",
      comments: [],
      getSongsSnapshot,
      sort: "1",
    };
  },
  computed: {
    sortedComments() {
      return this.comments.slice().sort((a, b) => {
        if (this.sort === "1") {
          return new Date(b.timestamp) - new Date(a.timestamp);
        }
        return new Date(a.timestamp) - new Date(b.timestamp);
      });
    },
  },
  mounted() {
    this.getSongDetail(this.$route.params.id);
    this.getComments();
    const { sort } = this.$route.query;

    this.sort = sort === "1" || sort === "2" ? sort : "1";
  },
  methods: {
    ...mapActions(usePlayerStore, ["newSong"]),
    async getSongDetail(idToShow) {
      console.log("Hallo Song");
      const songsCollectionRef = doc(db, "songs", idToShow);
      const getSongsSnapshot = await getDoc(songsCollectionRef);
      if (getSongsSnapshot.exists()) {
        this.song = getSongsSnapshot.data();
      } else {
        console.log("No such document!");
      }
    },
    async addComment(values, { resetForm }) {
      this.comment_in_submission = true;
      this.comment_show_alert = true;
      this.comment_alert_variant = "clr-blue";
      this.comment_alert_message =
        "Please wait! Your comment is being submitted";

      const comment = {
        text: values.comment,
      };
      const commentCollectionRef = collection(
        db,
        "songs",
        this.$route.params.id,
        "comment"
      );
      const uploadtime = new Date().toString();
      await addDoc(commentCollectionRef, {
        username: this.song.display_name,
        comment: comment.text,
        timestamp: uploadtime,
      });

      this.song.comment_count += 1;
      const songsCollectionRef = collection(db, "songs");
      await updateDoc(doc(songsCollectionRef, this.$route.params.id), {
        comment_count: this.song.comment_count,
      });

      this.getComments();

      this.comment_in_submission = false;
      this.comment_alert_variant = "clr-green";
      this.comment_alert_message = "Comment added!";
      resetForm();
    },
    async getComments() {
      const commentCollectionRef = collection(
        db,
        "songs",
        this.$route.params.id,
        "comment"
      );
      this.getCommentSnapshot = onSnapshot(
        query(commentCollectionRef),
        (querySnapshot) => {
          const comments = [];
          querySnapshot.forEach((doc) => {
            const comment = {
              id: doc.id,
              username: doc.data().username,
              comment: doc.data().comment,
              timestamp: doc.data().timestamp,
            };
            comments.push(comment);
          });
          this.comments = comments;
        }
      );
    },
  },
  watch: {
    sort(newVal) {
      if (newVal === this.$route.query.sort) {
        return;
      }
      this.$router.push({
        query: {
          sort: newVal,
        },
      });
    },
  },
};
</script>
