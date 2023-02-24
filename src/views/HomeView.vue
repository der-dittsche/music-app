<template>
  <h1>Listen to great music</h1>
  <div class="container">
    <h2 class="songlist__title">Songs</h2>
    <div
      class="songlist__items"
      v-for="song in storeMusic.songs"
      :key="song.id"
      :song="song"
    >
      <div class="songlist__items-info">
        <h3>{{ song.modified_name }}</h3>
        <p>Artist: {{ song.artist }}</p>
        <p>Genre: {{ song.genre }}</p>
        <p>Uploaded by: {{ song.display_name }}</p>
      </div>
      <div class="songlist__items-comments">Comment</div>
    </div>
  </div>
</template>

<script>
import { useSongsStore } from "@/stores/songs";
export default {
  setup() {
    return {};
  },
  data() {
    const storeMusic = useSongsStore();

    return {
      storeMusic,
    };
  },
  methods: {},
  mounted() {
    this.storeMusic.getSongs();
  },
};
</script>
