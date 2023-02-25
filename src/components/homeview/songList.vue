<template>
  <div class="songlist__item">
    <div class="songlist__items-info">
      <h3>{{ song.modified_name }}</h3>
      <p>Artist: {{ song.artist }}</p>
      <p>Genre: {{ song.genre }}</p>
      <p>Uploaded by: {{ song.display_name }}</p>
    </div>
    <div class="songlist__items-comments">Comment</div>
  </div>
</template>

<script>
export default {
  props: {
    song: {
      type: Object,
      requiered: true,
    },
  },
};
</script>
