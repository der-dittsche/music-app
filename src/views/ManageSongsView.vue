<template>
  <main>
    <h1>This is the Manage Page</h1>
    <div class="container manage">
      <UploadFiles />
      <div class="manage__music">
        <div class="uploads__you-songs">
          <h2>Your Songs</h2>
        </div>
        <div class="uploads__items">
          <ListUploadsVue v-for="song in filter" :key="song.id" :song="song" />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import ListUploadsVue from "@/components/manageview/listUploads.vue";
import UploadFiles from "@/components/manageview/uploadFiles.vue";
import { useUserStore } from "@/stores/users";
import { useSongsStore } from "@/stores/songs";
export default {
  components: {
    ListUploadsVue,
    UploadFiles,
  },
  data() {
    const storeMusic = useSongsStore();
    const storeUser = useUserStore();
    return {
      storeMusic,
      storeUser,
      editSong: false,
    };
  },
  mounted() {
    this.storeMusic.getSongs();
  },
  computed: {
    filter() {
      let sortMusic = this.storeMusic.songs;
      sortMusic = sortMusic.filter((item) => {
        return item.userid === this.storeUser.user.id;
      });
      return sortMusic;
    },
  },
};
</script>
