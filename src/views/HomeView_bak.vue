<template>
  <main>
    <h1>Listen to great music</h1>
    <div class="container">
      <div></div>
      <h2 class="songlist__title" v-icon.red.fs3="'headphone'">Songs</h2>

      <songList v-for="song in storeMusic.songs" :key="song.id" :song="song" />
    </div>
  </main>
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
  beforeMount() {
    this.storeMusic.getSongs();
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
