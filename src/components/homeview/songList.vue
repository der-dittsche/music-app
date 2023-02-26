<template>
  <div class="songlist__item">
    <div class="songlist__items-info">
      <RouterLink :to="{ name: 'song', params: { id: song.id } }">
        <h3>
          {{ song.modified_name }}
        </h3>
        <p class="song_artist">Artist: {{ song.artist }}</p>
        <p>Genre: {{ song.genre }}</p>
        <p>Uploaded by: {{ song.display_name }}</p>
      </RouterLink>
    </div>

    <div class="songlist__items-comments">
      <RouterLink
        custom
        :to="{ name: 'song', params: { id: song.id }, hash: '#comments' }"
        v-slot="{ navigate }"
        ><p @click="navigate">{{ song.comment_count }} Comment</p></RouterLink
      >
    </div>
  </div>
</template>

<script>
import { RouterLink } from "vue-router";
export default {
  components: {
    RouterLink,
  },
  props: {
    song: {
      type: Object,
      requiered: true,
    },
  },
};
</script>
