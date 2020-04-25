<template>
	<el-row type="flex" justify="center">
		<el-col type="flex">
			<el-row class="sittings-list__search-bar" type="flex" justify="center" align="center">
				<div class="sittings-list__search-bar-container">
					<el-date-picker popper-class="yesytet" v-model="searchDate" type="date" placeholder="Date d'une séance" :picker-options="pickerOptions"></el-date-picker>
					<el-button type="primary" icon="el-icon-search" @click="getSittings()">Rechercher</el-button>
				</div>
			</el-row>

			<el-row class="sittings-list__pagination" type="flex" justify="center">
				<el-pagination :hide-on-single-page="true" layout="prev, pager, next" :total="total" :page-size="3" @current-change="getNewPage"></el-pagination>
			</el-row>

			<div v-if="!sittings" style="margin-top: 20px">
				<content-loader v-for="o in 4" :key="o"></content-loader>
			</div>

			<div v-if="sittings && sittings.length === 0" style="padding: 20px">
				<el-alert title="Pas de sittings à ce jour" type="info" :closable="false"></el-alert>
			</div>

			<div class="sittings-list__cards" v-if="sittings && sittings.length > 0">
				<el-card class="box-card" empty-text="Chargement..." v-bind:key="sitting._id" v-for="(sitting) in sittings">
					<div slot="header" class="clearfix">
						<i class="el-icon-date"></i>
						<span style="padding-left: 20px">Séance plénière du {{sitting.ts | formatDate }} - {{sitting.votes.length}} textes disponibles</span>
						<el-button style="float: right" type="success" icon="el-icon-download" :loading="isDownloading" @click="download(sitting && sitting._id)">Exporter</el-button>
					</div>
					<div class="text item">
						<!-- <el-table :header-row-style="changeHead" :header-cell-style="changeCellHead" ref="multipleTable" :data="sitting.votes" stripe max-height="550" empty-text="Chargement..." style="width: 100%" @selection-change="handleSelectionChange"> -->
						<el-table :header-row-style="changeHead" :header-cell-style="changeCellHead" ref="multipleTable" :data="sitting.votes" stripe empty-text="Chargement..." style="width: 100%" @selection-change="handleSelectionChange">
							<el-table-column type="selection" width="55"></el-table-column>
							<el-table-column property="title" label="Texts" min-width="500">
								<template slot="header">
									<el-row type="flex" justify="center">Textes</el-row>
								</template>
							</el-table-column>
							<el-table-column width="250">
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

			<el-row class="sittings-list_pagination" type="flex" justify="center">
				<el-pagination :hide-on-single-page="true" layout="prev, pager, next" :total="total" :page-size="10" @current-change="getNewPage"></el-pagination>
			</el-row>
		</el-col>
	</el-row>
</template>

<i18n>{}</i18n>

<script>
import ContentLoader from "@/components/ContentLoader.vue";

export default {
	name: "SittingsList",
	components: {
		ContentLoader
	},
	props: {},
	data() {
		return {
			sittings: null,
			total: 0,
			page: 1,
			selectedVotes: [],
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
		handleSelectionChange(votes) {
			this.selectedVotes = votes && votes.map(vote => vote._id);
		},
		download: function(sittingId) {
			let confirmMessage =
				this.selectedVotes.length === 0
					? this.$confirm("Vous n'avez selectionné aucun texte, êtes-vous sûr de vouloir continuer ?", "Attention", {
							confirmButtonText: "OK",
							cancelButtonText: "Annuler",
							type: "warning"
					  })
					: Promise.resolve();

			confirmMessage
				.then(() => {
					this.isDownloading = true;

					this.$publicApi
						.post(
							`/sittings/${sittingId}/votes`,
							{
								voteIds: this.selectedVotes
							},
							{ responseType: "arraybuffer" }
						)
						.then(res => {
							var fileURL = window.URL.createObjectURL(new Blob([res.data]));
							var fileLink = document.createElement("a");

							fileLink.href = fileURL;
							fileLink.setAttribute("download", `${sittingId}.xlsx`);
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
			return this.getSittings();
		},
		getSittings() {
			this.$publicApi
				.get("/sittings", {
					params: {
						page: this.page,
						searchDate: this.searchDate
					}
				})
				.then(res => {
					let { sittings, total } = (res && res.data) || {};
					this.sittings = sittings || [];
					this.total = total || 0;
				})
				.catch(err => {
					console.log("ERROR: sittingsList.vue#mounted - Error while getting sittings:", err);
				});
		}
	},
	mounted: function() {
		this.$publicApi
			.get("/sittings", {
				params: {
					page: 1
				}
			})
			.then(res => {
				let { sittings, total, page = 1 } = (res && res.data) || {};

				this.sittings = sittings || [];
				this.total = total || [];
				this.page = 1;
			})
			.catch(err => {
				console.log("ERROR: sittingsList.vue#mounted - Error while getting sittings:", err);
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

.sittings-list__pagination {
	padding: 20px;
}

.sittings-list__search-bar {
	padding-top: 20px;
	padding-bottom: 20px;
	background-color: #fafafa;
	border-bottom: 1px solid #d1d3d4;

	.sittings-list__search-bar-container {
		border: 1px solid #d1d3d4;
		border-radius: 4px;
	}

	.el-button {
		border-radius: 0px;
		border-top-right-radius: 3px;
		border-bottom-right-radius: 3px;
	}
}
.sittings-list__cards {
	padding-left: 20px;
	padding-right: 20px;
}
</style>
<style lang="scss">
.sittings-list__search-bar {
	input.el-input__inner {
		border: 0px;
		border-radius: 0px;
		border-top-left-radius: 3px;
		border-bottom-left-radius: 3px;
	}
}
</style>