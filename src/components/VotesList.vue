<template>
  <el-row type="flex" justify="center">
    <el-col type="flex" class="vote-list__content">
      <el-card class="box-card vote-list__card" v-bind:key="vote.id" v-for="(vote, index) in votes">
        <div slot="header" class="clearfix">
          <span>
            <b>{{ vote.date }}</b> |
          </span>
          <el-tag style="margin-left: 10px" size="medium">{{ vote.place }}</el-tag>

          <el-badge v-show="index===0" style="float: right; margin-right:10px" value="new" class="item" type="warning">
            <el-button size="small" @click="viewVote(vote)">details</el-button>
          </el-badge>
          <el-button v-show="index!==0" style="float: right; margin-right:10px" size="small" @click="viewVote(vote)">details</el-button>
        </div>
        <div>{{ vote.pdf }}</div>
      </el-card>
    </el-col>
  </el-row>
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

.vote-list__content {
  width: 50%;
}

.vote-list__card {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
</style>
