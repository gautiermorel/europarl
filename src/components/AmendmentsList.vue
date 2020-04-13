<template>
  <div class="amendments-list">
    <br />
    <br />
    <br />

    <div v-if="!amendments" class="votes-list__loaders">
      <bullet-list-loader class="votes-list__loader"></bullet-list-loader>
      <br />
      <bullet-list-loader class="votes-list__loader"></bullet-list-loader>
      <br />
      <bullet-list-loader class="votes-list__loader"></bullet-list-loader>
      <br />
      <bullet-list-loader class="votes-list__loader"></bullet-list-loader>
      <br />
      <bullet-list-loader class="votes-list__loader"></bullet-list-loader>
      <br />
    </div>

    <div v-bind:key="amendment.id" v-for="(amendment) in amendments">
      <div class="pretty p-default">
        <input
          type="checkbox"
          :id="amendment.id"
          :value="amendment.id"
          v-model="checkedNames"
          v-on:change="forwardToDownload(checkedNames)"
        />
        <div class="state">
          <label :for="amendment.id">{{amendment.name}} ({{amendment.date}})</label>
        </div>
      </div>
      <br />
      <br />
    </div>
  </div>
</template>

<i18n>{}</i18n>

<script>
import { BulletListLoader } from "vue-content-loader";

export default {
  name: "AmendmentsList",
  components: {
    BulletListLoader
  },
  props: {},
  data() {
    return {
      voteId: "",
      amendments: null,
      checkedNames: [] // https://lokesh-coder.github.io/pretty-checkbox/
    };
  },
  methods: {
    forwardToDownload(checkedNames) {
      this.$emit("forwaredFromAmendments", checkedNames);
    }
  },
  mounted: function() {
    if (this.$route && this.$route.params && this.$route.params.id)
      this.voteId = this.$route.params.id;

    this.$publicApi
      .get(`/votes/${this.voteId}/amendments`)
      .then(res => {
        this.amendments = (res && res.data && res.data.data) || [];
        console.log("this.amendments=", this.amendments);
      })
      .catch(err => {
        console.log(
          "ERROR: AmendmentsList.vue#mounted - Error while getting amendments:",
          err
        );
      });
  },
  watch: {}
};
</script>

<style lang="scss" scoped="true">
@import "~pretty-checkbox/src/pretty-checkbox.scss";
.votes-list__loaders {
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.votes-list__loader {
  height: 100px;
}
</style>