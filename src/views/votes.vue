<template>
  <div class="vote__content">
    <votes-list></votes-list>
  </div>
</template>

<i18n>{}</i18n>

<script>
import VotesList from "@/components/VotesList.vue";

export default {
  name: "home",
  components: {
    VotesList
  },
  props: {},
  data() {
    return {
      votes: null
    };
  },
  methods: {},
  mounted: function() {},
  watch: {}
};
</script>

<style lang="scss" scoped>
.vote__content {
  padding-left: 20px;
  padding-right: 20px;
}
</style>
