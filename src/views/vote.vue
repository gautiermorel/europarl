<template>
  <div class="vote__content">
    <amendments-list @forwaredFromAmendments="getCheckedNames($event)"></amendments-list>
    <!-- <download-vote :checked-names="checkedNames"></download-vote> -->
  </div>
</template>

<i18n>{}</i18n>

<script>
import AmendmentsList from "@/components/AmendmentsList.vue";
import DownloadVote from "@/components/DownloadVote.vue";

export default {
  name: "vote",
  components: {
    AmendmentsList,
    DownloadVote
  },
  props: {},
  data() {
    return {
      checkedNames: []
    };
  },
  methods: {
    getCheckedNames(checkedNames) {
      this.checkedNames = checkedNames;
    }
  },
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
