<template>
  <el-row type="flex" justify="center">
    <el-col type="flex">
      <el-card class="box-card" empty-text="Chargement..." v-bind:key="vote._id" v-for="(vote) in votes">
        <div slot="header" class="clearfix">
          <span>{{vote.ts | formatDate }}</span>
          <el-button style="float: right; padding: 3px 0" type="text" :loading="isDownloading" @click="download(vote && vote._id)">Export</el-button>
        </div>
        <div class="text item">
          <el-table ref="multipleTable" :data="vote.amendments" stripe height="250" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column label="Heure" width="120">
              <template slot-scope="scope">{{ scope.row.ts | formatHours }}</template>
            </el-table-column>
            <el-table-column property="title" label="Amendement"></el-table-column>
          </el-table>
        </div>
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
      selectedAmendments: [],
      isDownloading: false
    };
  },
  methods: {
    viewVote: function(vote) {
      this.$router.push(`vote/${vote.id}`);
    },
    handleSelectionChange(amandements) {
      this.selectedAmendments = amandements && amandements.map(amandement => amandement._id);
    },
    download: function(voteId) {
      this.isDownloading = true;

      this.$publicApi
        .get(`/votes/${voteId}/export`, {
          params: {
            amendmentIds: this.selectedAmendments
          },
          responseType: "arraybuffer"
        })
        .then(res => {
          var fileURL = window.URL.createObjectURL(new Blob([res.data]));
          var fileLink = document.createElement("a");

          fileLink.href = fileURL;
          fileLink.setAttribute("download", `${this.voteId}.xlsx`);
          document.body.appendChild(fileLink);

          fileLink.click();
          this.$notify({ title: "Success", message: "Votre fichier peut être téléchargé", type: "success" });
          this.isDownloading = false;
        })
        .catch(err => {
          console.log("ERROR: AmendmentsList.vue#function - Error while downloading:", err);
          this.isDownloading = false;
          this.$message.error("Oops, this is a error message.");
        });
    }
  },
  mounted: function() {
    this.$publicApi
      .get("/votes")
      .then(res => {
        this.votes = (res && res.data) || [];
      })
      .catch(err => {
        console.log("ERROR: votesList.vue#mounted - Error while getting votes:", err);
      });
  }
};
</script>

<style lang="scss" scoped="true">
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  margin-bottom: 20px;
}
</style>
