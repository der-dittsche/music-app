import { defineStore } from "pinia";
import { Howl, Howler } from "howler";
import helper from "@/includes/helper";

export const usePlayerStore = defineStore("player", {
  state: () => ({
    current_song: {},
    sound: {},
    volume: "0.1",
    seek: "00:00",
    duration: "00:00",
    playerProgress: "0%",
    volumeHeight: "0%",
  }),
  actions: {
    async newSong(song) {
      if (this.sound instanceof Howl) {
        this.sound.unload();
      }

      this.current_song = song;

      this.sound = new Howl({
        src: [song.url],
        html5: true,
        volume: this.volume,
      });

      this.sound.play();

      this.sound.on("play", () => {
        requestAnimationFrame(this.progress);
      });
    },
    async toggleAudio() {
      if (!this.sound.playing) {
        return;
      }

      if (this.sound.playing()) {
        this.sound.pause();
      } else {
        this.sound.play();
      }
    },
    progress() {
      this.seek = helper.formatTime(this.sound.seek());
      this.duration = helper.formatTime(this.sound.duration());

      this.playerProgress = `${
        (this.sound.seek() / this.sound.duration()) * 100
      }%`;

      if (this.sound.playing()) {
        requestAnimationFrame(this.progress);
      }
    },
    updateVolume(event) {
      const { y, height } = event.currentTarget.getBoundingClientRect();
      const clickY = event.clientY - y;
      const percentageY = clickY / height;
      const volume = 1 - percentageY;
      this.volume = volume;
      this.volumeHeight = `${this.volume * 100}%`;
      this.setVol(volume);
    },
    setVol(val) {
      Howler.volume(val);
    },
    updateSeek(event) {
      if (!this.sound.playing) {
        return;
      }

      const { x, width } = event.currentTarget.getBoundingClientRect();
      const clickX = event.clientX - x;
      const percentage = clickX / width;
      const seconds = this.sound.duration() * percentage;

      this.sound.seek(seconds);
      this.sound.once("seek", this.progress);
    },
  },
  getters: {
    playing: (state) => {
      if (state.sound.playing) {
        return state.sound.playing();
      }

      return false;
    },
  },
});
