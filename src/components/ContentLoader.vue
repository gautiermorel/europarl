<template>
  <content-loader
    :width="400"
    :height="75"
    :speed="2"
    primaryColor="#f3f3f3"
    secondaryColor="#e0e0e0"
  >
    <rect x="5" y="10" rx="5" ry="5" width="100" height="5" />
    <circle cx="10" cy="30" r="5" />
    <rect x="25" y="28" rx="5" ry="5" width="70" height="5" />
    <rect x="5" y="45" rx="5" ry="5" width="300" height="10" />
    <rect x="5" y="60" rx="5" ry="5" width="300" height="10" />
  </content-loader>
</template>

<script>
import { ContentLoader } from "vue-content-loader";

export default {
  components: { ContentLoader }
};
</script>