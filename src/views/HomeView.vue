<template>
  <h1>Listen to great music</h1>
  <div class="container">
    <h2 class="songlist__title">Songs</h2>

    <songList v-for="song in storeMusic.songs" :key="song.id" :song="song" />
  </div>
</template>

<script>
import { useSongsStore } from "@/stores/songs";
import songList from "@/components/homeview/songList.vue";
export default {
  components: {
    songList,
  },
  data() {
    const storeMusic = useSongsStore();
    return {
      storeMusic,
    };
  },
  mounted() {
    this.storeMusic.getSongs();
  },
};
</script>
