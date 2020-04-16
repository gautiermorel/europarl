<template>
  <el-row type="flex" justify="center">
    <el-card class="box-card" style="width: 100%">
      <el-table ref="multipleTable" :data="amendments" empty-text="Chargement..." style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection"></el-table-column>
        <el-table-column label="Amandement" width="220">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column property="name">
          <template slot="header">
            <el-row type="flex" justify="end">
              <el-button type="success" icon="el-icon-download" :disabled="selection.length === 0" v-on:click="download()">Export XLSX</el-button>
            </el-row>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </el-row>
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
      selection: []
    };
  },
  methods: {
    forwardToDownload(checkedNames) {
      this.$emit("forwaredFromAmendments", checkedNames);
    },
    handleSelectionChange(amandements) {
      this.selection = amandements && amandements.map(amandement => amandement.id);
      this.$emit("forwaredFromAmendments", this.selection);
    },
    download: function() {
      if (this.$route && this.$route.params && this.$route.params.id) this.voteId = this.$route.params.id;

      this.$publicApi
        .get(`/votes/${this.voteId}/export`, {
          params: {
            amendmentIds: this.checkedNames
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
        })
        .catch(err => {
          console.log('ERROR: AmendmentsList.vue#function - Error while downloading:', res);
          this.$message.error('Oops, this is a error message.');
        });
    }
  },
  mounted: function() {
    if (this.$route && this.$route.params && this.$route.params.id) this.voteId = this.$route.params.id;

    this.$publicApi
      .get(`/votes/${this.voteId}/amendments`)
      .then(res => {
        this.amendments = (res && res.data && res.data.data) || [];
      })
      .catch(err => {
        console.log("ERROR: AmendmentsList.vue#mounted - Error while getting amendments:", err);
      });
  },
  watch: {}
};
</script>

<style lang="scss" scoped="true">
@import "~pretty-checkbox/src/pretty-checkbox.scss";
</style>