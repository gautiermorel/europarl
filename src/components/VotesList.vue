<template>
  <div class="votes-list">
    <div v-bind:key="vote.id" v-for="(vote) in votes" v-on:click="viewVote(vote)">
      <p>{{vote.date}}</p>
      <p>@ {{vote.place}}</p>
      <b>{{vote.name}}</b>
      <p>Link: ({{vote.pdf}})</p>
      <p>id: ({{vote.id}})</p>
      <br />
      <br />
    </div>
  </div>
</template>

<i18n>{}</i18n>

<script>
export default {
  name: "VotesList",
  components: {},
  props: {},
  data() {
    return {
      votes: null,
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

<style lang="scss" scoped="true"></style>
