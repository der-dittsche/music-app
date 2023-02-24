<template>
  <div class="uploads__items-content">
    <div class="uploads__items-info">
      <h3>{{ song.modified_name }}</h3>
      <p>Artist: {{ song.artist }}</p>
      <p>Genre: {{ song.genre }}</p>
    </div>
    <div class="uploads__items-comments">
      <i class="bx bx-trash bx-sm" @click="deleteSong"></i>
      <i class="bx bx-pencil bx-sm" @click.prevent="editSong = true"></i>
    </div>
  </div>
  <div class="uploads__item-edit" v-if="editSong">
    <vee-form
      action="submit"
      @submit="editSongDetails"
      :validation-schema="schema_song"
    >
      <label for="song_modified_name">Songname</label>
      <vee-field
        name="song_modified_name"
        :bails="false"
        v-slot="{ field, errors }"
      >
        <input
          v-model="songdetails.modified_name"
          type="text"
          id="song_modified_name"
          autocomplete="off"
          v-bind="field"
        />
        <div v-for="error in errors" :key="error">{{ error }}</div>
      </vee-field>
      <label for="song_artist">Artist</label>
      <vee-field name="song_artist" :bails="false" v-slot="{ field, errors }"
        ><input
          v-model="songdetails.artist"
          type="text"
          id="song_artist"
          autocomplete="off"
          v-bind="field"
        />
        <div v-for="error in errors" :key="error">{{ error }}</div></vee-field
      >
      <label for="song_genre">Genre</label>
      <vee-field name="song_genre" :bails="false" v-slot="{ field, errors }"
        ><input
          v-model="songdetails.genre"
          type="text"
          id="song_genre"
          autocomplete="off"
          v-bind="field"
        />
        <div v-for="error in errors" :key="error">{{ error }}</div>
      </vee-field>
      <button type="submit">Save</button> </vee-form
    ><button @click="editSong = false">Cancel</button>
  </div>
</template>

<script>
import { reactive } from "vue";
import { useSongsStore } from "@/stores/songs";
import { storage } from "@/stores/firebase";
import { ref, deleteObject } from "firebase/storage";
export default {
  data() {
    const songdetails = reactive({
      id: this.song.id,
      display_name: this.song.display_name,
      original_name: this.song.original_name,
      modified_name: "",
      artist: "",
      genre: "",
    });
    const storeMusic = useSongsStore();
    return {
      editSong: false,
      storeMusic,
      songdetails,
      schema_song: {
        song_modified_name: "required|min:6|max:100|alphaSpaces",
        song_artist: "required|min:6|max:100|alphaSpaces",
        song_genre: "required|min:6|max:100|alphaSpaces",
      },
    };
  },
  props: {
    song: {
      type: Object,
      requiered: true,
    },
  },
  methods: {
    editSongDetails() {
      this.storeMusic.updateSong(this.songdetails);
      this.editSong = false;
    },
    async deleteSong() {
      const songRef = ref(storage, `songs/${this.song.original_name}`);
      await deleteObject(songRef)
        .then(() => {
          this.storeMusic.deleteSongs(this.song.id);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
