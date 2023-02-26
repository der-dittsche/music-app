import { defineStore } from "pinia";
import { db } from "@/stores/firebase";
import {
  collection,
  onSnapshot,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
} from "firebase/firestore";

let songsCollectionRef = collection(db, "songs");
let songsCollectionQuerry = query(songsCollectionRef, orderBy("timestamp"));
let getSongsSnapshot = null;

export const useSongsStore = defineStore("storeSongs", {
  state: () => {
    return {
      songs: [],
      songsLoaded: false,
    };
  },
  actions: {
    async getSongs() {
      this.songsLoaded = false;
      getSongsSnapshot = onSnapshot(songsCollectionQuerry, (querySnapshot) => {
        const songs = [];
        querySnapshot.forEach((doc) => {
          const song = {
            id: doc.id,
            comment_count: doc.data().comment_count,
            display_name: doc.data().display_name,
            original_name: doc.data().original_name,
            modified_name: doc.data().modified_name,
            artist: doc.data().artist,
            genre: doc.data().genre,
            url: doc.data().url,
            userid: doc.data().userid,
            timestamp: doc.data().timestamp,
          };
          songs.push(song);
        });

        this.songs = songs;
        this.songsLoaded = true;
      });
    },
    async addSong(song) {
      const uploadtime = new Date().toISOString();
      await addDoc(songsCollectionRef, {
        userid: song.userid,
        comment_count: song.comment_count,
        display_name: song.display_name,
        original_name: song.original_name,
        modified_name: song.modified_name,
        artist: song.artist,
        genre: song.genre,
        url: song.url,
        timestamp: uploadtime,
      });
    },
    async updateSong(song) {
      await updateDoc(doc(songsCollectionRef, song.id), {
        display_name: song.display_name,
        original_name: song.original_name,
        modified_name: song.modified_name,
        artist: song.artist,
        genre: song.genre,
      });
    },
    async deleteSongs(songtodelete) {
      songsCollectionRef = collection(db, "songs");
      await deleteDoc(doc(songsCollectionRef, songtodelete));
    },
    clearSongs() {
      this.songs = [];
      if (getSongsSnapshot) getSongsSnapshot(); // unsubscribe from any listener
    },
  },
});
