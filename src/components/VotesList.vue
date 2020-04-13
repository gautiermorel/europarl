<template>
  <div class="votes-list">
    <div v-bind:key="vote.id" v-for="(vote) in votes">
      <p>{{vote.date}}</p>
      <p>@ {{vote.place}}</p>
      <button v-on:click="viewVote(vote)">{{vote.name}}</button>
      <br />
    </div>
    <div v-show="!votes" class="votes-list__loaders">
      <content-loader v-bind:key="index" v-for="(loader, index) in loaders"></content-loader>
    </div>
  </div>
</template>

<i18n>{}</i18n>

<script>
import ContentLoader from "@/components/ContentLoader.vue";

export default {
  name: "VotesList",
  components: {
    ContentLoader
  },
  props: {},
  data() {
    return {
      votes: null,
      loaders: Array(5),
      checkedNames: []
    };
  },
  methods: {
    viewVote: function(vote) {
      this.$router.push(`vote/${vote.id}`);
    }
  },
  mounted: function() {
    this.$publicApi
      .get("/votes")
      .then(res => {
        this.votes = (res && res.data) || [];
      })
      .catch(err => {
        console.log(
          "ERROR: votesList.vue#mounted - Error while getting votes:",
          err
        );
      });
  }
};
</script>

<style lang="scss" scoped="true">
.votes-list__loaders {
  width: 400px;
}
</style>
