<template>
  <el-row type="flex" justify="center">
    <el-col type="flex">
      <el-row type="flex" justify="start">
        <el-date-picker v-model="searchDate" type="date" placeholder="Date d'une séance" :picker-options="pickerOptions"></el-date-picker>
        <el-button type="primary" icon="el-icon-search" @click="getVotes()">Rechercher</el-button>
      </el-row>

      <el-row class="votes-list_pagination" type="flex" justify="center">
        <el-pagination :hide-on-single-page="true" layout="prev, pager, next" :total="total" :page-size="3" @current-change="getNewPage"></el-pagination>
      </el-row>

      <div v-if="!votes" style="margin-top: 20px">
        <content-loader v-for="o in 4" :key="o"></content-loader>
      </div>

      <div v-if="votes && votes.length === 0" style="padding: 20px">
        <el-alert title="Pas de votes à ce jour" type="info" :closable="false"></el-alert>
      </div>

      <div v-if="votes && votes.length > 0">
        <el-card class="box-card" empty-text="Chargement..." v-bind:key="vote._id" v-for="(vote) in votes">
          <div slot="header" class="clearfix">
            <i class="el-icon-date"></i>
            <span style="padding-left: 20px">{{vote.ts | formatDate }}</span>
            <el-button style="float: right" type="success" icon="el-icon-download" :loading="isDownloading" @click="download(vote && vote._id)">Exporter</el-button>
          </div>
          <div class="text item">
            <el-table :header-row-style="changeHead" :header-cell-style="changeCellHead" ref="multipleTable" :data="vote.amendments" stripe max-height="550" empty-text="Chargement..." style="width: 100%" @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column property="title" label="Amendements" min-width="500">
                <template slot="header">
                  <el-row type="flex" justify="center">Amendements</el-row>
                </template>
              </el-table-column>
              <el-table-column label="Votes" width="250">
                <template slot="header">
                  <el-row type="flex" justify="center">Votes</el-row>
                </template>
                <template slot-scope="scope">
                  <el-row type="flex" justify="space-between">
                    <el-tag style="min-width: 60px" v-if="scope.row.votes && scope.row.votes['+']" type="success">
                      <i class="el-icon-document-checked"></i>
                      {{scope.row.votes && scope.row.votes['+'] && scope.row.votes['+'].total}}
                    </el-tag>
                    <el-tag style="min-width: 60px" v-if="scope.row.votes && scope.row.votes['0']" type="warning">
                      <i class="el-icon-document-delete"></i>
                      {{scope.row.votes && scope.row.votes['0'] && scope.row.votes['0'].total}}
                    </el-tag>
                    <el-tag style="min-width: 60px" v-if="scope.row.votes && scope.row.votes['-']" type="danger">
                      <i class="el-icon-document-remove"></i>
                      {{scope.row.votes && scope.row.votes['-'] && scope.row.votes['-'].total}}
                    </el-tag>
                  </el-row>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-card>
      </div>

      <el-row class="votes-list_pagination" type="flex" justify="center">
        <el-pagination :hide-on-single-page="true" layout="prev, pager, next" :total="total" :page-size="10" @current-change="getNewPage"></el-pagination>
      </el-row>
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
      total: 0,
      page: 1,
      selectedAmendments: [],
      isDownloading: false,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      searchDate: ""
    };
  },
  methods: {
    handleSelectionChange(amandements) {
      this.selectedAmendments = amandements && amandements.map(amandement => amandement._id);
    },
    download: function(voteId) {
      let confirmMessage =
        this.selectedAmendments.length === 0
          ? this.$confirm("Vous n'avez selectionné aucun amendement, êtes-vous sûr de vouloir continuer ?", "Attention", {
              confirmButtonText: "OK",
              cancelButtonText: "Annuler",
              type: "warning"
            })
          : Promise.resolve();

      confirmMessage
        .then(() => {
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
              fileLink.setAttribute("download", `${voteId}.xlsx`);
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
        })
        .catch(() => {});
    },
    changeHead({ row, column, rowIndex, columnIndex }) {
      return { color: "#2b3e4f", width: "100%" };
    },
    changeCellHead({ row, column, rowIndex, columnIndex }) {
      return { textAlign: "center" };
    },
    getNewPage(page) {
      this.page = page;
      return this.getVotes();
    },
    getVotes() {
      this.$publicApi
        .get("/votes", {
          params: {
            page: this.page,
            searchDate: this.searchDate
          }
        })
        .then(res => {
          let { votes, total } = (res && res.data) || {};
          this.votes = votes || [];
          this.total = total || 0;
        })
        .catch(err => {
          console.log("ERROR: votesList.vue#mounted - Error while getting votes:", err);
        });
    }
  },
  mounted: function() {
    this.$publicApi
      .get("/votes", {
        params: {
          page: 1
        }
      })
      .then(res => {
        let { votes, total, page = 1 } = (res && res.data) || {};
        this.votes = votes || [];
        this.total = total || [];
        this.page = 1;
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

.votes-list_pagination {
  padding: 20px;
}
</style>
