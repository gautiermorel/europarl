<template>
  <div class="download-vote">
    <br />
    <br />
    <br />
    <el-button v-on:click="download()" type="primary">Export XLSX</el-button>
  </div>
</template>

<i18n>{}</i18n>

<script>
export default {
  name: "DownloadVote",
  components: {},
  props: ["checked-names"],
  data() {
    return {
      voteId: ""
    };
  },
  methods: {
    download: function() {
      if (this.$route && this.$route.params && this.$route.params.id)
        this.voteId = this.$route.params.id;

      console.log(
        "Downloading...",
        this.checkedNames,
        "this.voteId:",
        this.voteId
      );

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
          console.log("", err);
        });
    }
  }
};
</script>

<style lang="scss" scoped></style>
