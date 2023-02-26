<template>
  <div class="songlist__item">
    <div class="songlist__items-info">
      <h3>
        <RouterLink :to="{ name: 'song', params: { id: song.id } }">{{
          song.modified_name
        }}</RouterLink>
      </h3>
      <p>Artist: {{ song.artist }}</p>
      <p>Genre: {{ song.genre }}</p>
      <p>Uploaded by: {{ song.display_name }}</p>
    </div>
    <div class="songlist__items-comments">Comment</div>
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
