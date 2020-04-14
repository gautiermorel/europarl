<template>
  <el-row type="flex" justify="center">
    <el-card class="box-card amendments-list__card">
      <el-table ref="multipleTable" :data="amendments" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="Amandement" width="220">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column property="name" label="Name"></el-table-column>
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
      console.log("amandement", amandements);
      this.selection =
        amandements && amandements.map(amandement => amandement.id);
      console.log("this.selection", this.selection);
      this.$emit("forwaredFromAmendments", this.selection);
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

.amendments-list__card {
  width: 75%;
}
</style>