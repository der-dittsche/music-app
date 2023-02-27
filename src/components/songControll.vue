<template>
  <div class="text-center" v-if="current_song.modified_name">
    <span class="song-title font-bold">{{ current_song.modified_name }}</span>
    by
    <span class="song-artist">{{ current_song.display_name }}</span>
  </div>
  <div class="player__controll">
    <div class="play-button" @click.prevent="toggleAudio">
      <i
        class="bx"
        :class="{ 'bx-play-circle': !playing, 'bx-pause': playing }"
      ></i>
    </div>
    <div class="vol-controll" @click.prevent="isOpenVol = !isOpenVol">Vol</div>
    <div :class="hiddenClassVol">
      <div class="vol-controll-bar" @click.prevent="updateVolume">
        <div class="vol-controll-bar-line">
          <div
            class="vol-controll-bar-line-progress"
            :style="{ height: volumeHeight }"
          ></div>
        </div>
      </div>
    </div>
    <div class="time-current">{{ seek }}</div>
    <div class="time-bar" @click.prevent="updateSeek">
      <div class="time-bar-line">
        <div
          class="time-bar-line-progress"
          :style="{ width: playerProgress }"
        ></div>
      </div>
    </div>
    <div class="time-duration">{{ duration }}</div>
  </div>
</template>
<script>
import { mapActions, mapState, mapWritableState } from "pinia";
import { usePlayerStore } from "@/stores/player";
import useModalStore from "@/stores/modal";

export default {
  computed: {
    ...mapState(useModalStore, ["hiddenClassVol"]),
    ...mapWritableState(useModalStore, ["isOpenVol"]),
    ...mapState(usePlayerStore, [
      "playing",
      "duration",
      "seek",
      "playerProgress",
      "current_song",
      "volume",
      "volumeHeight",
    ]),
  },
  methods: {
    ...mapActions(usePlayerStore, [
      "toggleAudio",
      "updateSeek",
      "updateVolume",
    ]),
  },
};
</script>
<style>
.play-button {
  cursor: pointer;
}
</style>
