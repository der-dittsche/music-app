<template>
  <div class="upload__container">
    <div
      class="upload_box"
      :class="{ is_active: is_dragover }"
      @drag.prevent.stop=""
      @dragstart.prevent.stop=""
      @dragend.prevent.stop="is_dragover = false"
      @dragover.prevent.stop="is_dragover = true"
      @dragemter.prevent.stop="is_dragover = true"
      @dragleave.prevent.stop="is_dragover = false"
      @drop.prevent.stop="upload($event)"
    >
      <div>Drop your music here</div>
    </div>
    <div class="upload_input">
      <label for="upload_music_file" class="upload-btn"
        >Choose your Files</label
      >
      <input
        type="file"
        name="upload_music_file"
        id="upload_music_file"
        multiple
        @change="upload($event)"
      />
    </div>
    <ul v-for="upload in uploads" :key="upload.name">
      <li>
        <div>{{ upload.name }}</div>
        <div class="progressbar">
          <div
            class="progress"
            :style="{ width: upload.current_progress + '%' }"
          ></div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { storage } from "@/stores/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useUserStore } from "@/stores/users";
import { useSongsStore } from "@/stores/songs";
export default {
  setup() {
    return {};
  },
  data() {
    const storeMusic = useSongsStore();
    const storeUser = useUserStore();
    return {
      is_dragover: false,
      uploads: [],
      song: [],
      storeMusic,
      storeUser,
    };
  },
  methods: {
    upload($event) {
      this.is_dragover = false;
      const files = $event.dataTransfer
        ? [...$event.dataTransfer.files]
        : [...$event.target.files];
      files.forEach((file) => {
        if (file.type !== "audio/mpeg") {
          return;
        }
        const storageRef = ref(storage);
        const songsRef = ref(storageRef, `songs/${file.name}`);
        const task = uploadBytesResumable(songsRef, file);
        const uploadIndex =
          this.uploads.push({
            task,
            current_progress: 0,
            name: file.name,
          }) - 1;
        task.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            this.uploads[uploadIndex].current_progress = progress;
          },
          (error) => {
            console.log(error);
          },
          async () => {
            const song = {
              userid: this.storeUser.user.id,
              display_name: this.storeUser.user.username,
              original_name: task.snapshot.ref.name,
              modified_name: task.snapshot.ref.name,
              artist: "",
              genre: "",
              comment_count: 0,
            };
            song.url = await getDownloadURL(task.snapshot.ref);
            this.storeMusic.addSong(song);
          }
        );
      });
    },
    cancelUploads() {
      this.uploads.forEach((upload) => {
        upload.task.cancel();
      });
    },
  },
  beforeUnmount() {
    this.uploads.forEach((upload) => {
      upload.task.cancel();
    });
  },
  computed: {},
};
</script>
