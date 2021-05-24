<template>
	<div class="sittings__main" type="flex" justify="center" align="center">
		<el-row class="sittings__search-bar" type="flex" justify="space-around" align="center">
			<div class="sittings__search-bar-container hidden-xs-only">
				<el-date-picker ref="datePicker" v-model="searchDate" type="date" placeholder="Date d'une séance" :picker-options="pickerOptions" @change="getSittings()"></el-date-picker>
			</div>
		</el-row>
		<el-row class="sittings__container">
			<el-row class="sittings__pagination" type="flex" justify="center">
				<el-pagination :hide-on-single-page="true" :current-page="page" layout="prev, pager, next" :total="total" :page-size="3" @current-change="getNewPage"></el-pagination>
			</el-row>
			<div v-if="!sittings" class="sittings__loading">
				<sitting-loader class="sittings__loading-content" v-for="o in 4" :key="o"></sitting-loader>
			</div>
			<div v-if="sittings && sittings.length === 0" style="padding: 20px">
				<el-alert title="Pas de sittings à ce jour" type="info" :closable="false"></el-alert>
			</div>

			<el-row v-if="sittings && sittings.length > 0" class="sittings__title" type="flex" align="center" justify="start">
				<h1>Liste des séances plenières</h1>
			</el-row>

			<div class="sittings__cards" v-if="sittings && sittings.length > 0">
				<div style="width: 100%" v-bind:key="sitting._id" v-for="sitting in sittings">
					<div class="sitting__publication-date">
						{{ sitting.ts | formatDate }}
					</div>

					<el-card class="box-card" shadow="never" empty-text="Chargement...">
						<div slot="header" class="clearfix sitting__header">
							<i class="el-icon-notebook-2"></i>
							<span style="padding-left: 20px">{{ sitting.votes.length }} texte(s) disponible(s)</span>
							<el-button style="float: right" type="info" icon="el-icon-download" :loading="isDownloading" @click="download(sitting && sitting._id)">Exporter</el-button>
						</div>
						<div class="text item">
							<!-- <el-table :header-row-style="changeHead" :header-cell-style="changeCellHead" ref="multipleTable" :data="sitting.votes" stripe max-height="550" empty-text="Chargement..." style="width: 100%" @selection-change="handleSelectionChange"> -->
							<el-table :header-row-style="changeHead" :header-cell-style="changeCellHead" ref="multipleTable" :data="sitting.votes" stripe empty-text="Chargement..." style="width: 100%" @selection-change="handleSelectionChange">
								<el-table-column type="selection" width="55"></el-table-column>
								<el-table-column property="title" label="Texts" min-width="500">
									<template slot="header">
										<el-row type="flex" justify="center">Textes</el-row>
									</template>
									<template slot-scope="scope">
										<div v-html="$options.filters.getReferences(scope.row.title)"></div>
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
												{{ scope.row.votes && scope.row.votes["+"] && scope.row.votes["+"].total }}
											</el-tag>
											<el-tag style="min-width: 60px" v-if="scope.row.votes && scope.row.votes['0']" type="warning">
												<i class="el-icon-document-delete"></i>
												{{ scope.row.votes && scope.row.votes["0"] && scope.row.votes["0"].total }}
											</el-tag>
											<el-tag style="min-width: 60px" v-if="scope.row.votes && scope.row.votes['-']" type="danger">
												<i class="el-icon-document-remove"></i>
												{{ scope.row.votes && scope.row.votes["-"] && scope.row.votes["-"].total }}
											</el-tag>
										</el-row>
									</template>
								</el-table-column>
							</el-table>
						</div>
					</el-card>
				</div>
			</div>
			<el-row class="sittings__pagination" type="flex" justify="center">
				<el-pagination :hide-on-single-page="true" layout="prev, pager, next" :current-page="page" :total="total" :page-size="3" @current-change="getNewPage"></el-pagination>
			</el-row>
		</el-row>
	</div>
</template>

<i18n>{}</i18n>

<script>
import SittingLoader from "@/components/sitting-loader.vue";
import moment from "moment";
import _ from "lodash";

export default {
	name: "Sittings",
	components: {
		SittingLoader
	},
	props: {},
	methods: {
		handleSelectionChange(votes) {
			this.selectedVotes = votes && votes.map(vote => vote._id);
		},
		download(sittingId) {
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
				.catch(() => { });
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
		refreshSittingsDates: _.debounce(function (options) {
			let { startDate, endDate } = options || {};

			let [firstSitting] = this.sittingsDates || [];

			if (moment(firstSitting).isSameOrAfter(startDate) && moment(firstSitting).isSameOrBefore(endDate)) return true;
			else {
				this.$publicApi.get("/sittings", { params: { startDate, endDate } })
					.then(res => {
						let { sittings, total } = (res && res.data) || {};
						this.sittingsDates = (sittings && sittings.map(s => s.ts)) || [];
					})
					.catch(err => {
						console.log("ERROR: sittingsList.vue#getSittingDates - Error while getting sitting dates:", err);
					});
				return false;
			}

			return false;
		}, 200),
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
		},
		navigate(page) {
			this.$router.push(page);
		}
	},
	data() {
		let startDate = moment().subtract(1, "month");
		let endDate = moment();

		let self = this;

		return {
			sittings: null,
			sittingsDates: [],
			total: 0,
			page: 1,
			selectedVotes: [],
			isDownloading: false,
			pickerOptions: {
				disabledDate(time) {
					return time.getTime() > Date.now();
				},
				cellClassName(time) {
					self.refreshSittingsDates({ startDate: moment(time).subtract(42, "days").toDate(), endDate: moment(time).toDate() });
					let sittingsDates = self.sittingsDates;
					if (sittingsDates.some(s => moment(s).startOf("day").isSame(moment(time)))) return "has-sitting"
					return "no-sitting";
				}
			},
			searchDate: ""
		};
	},
	mounted() {
		this.$publicApi
			.get("/sittings", {
				params: {
					page: 1
				}
			})
			.then(res => {
				let { sittings, total, page = 1 } = (res && res.data) || {};

				this.sittingsDates = sittings.map(s => s.ts);

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

<style lang="scss" scoped>
.text {
	font-size: 14px;
}

.item {
	margin-bottom: 18px;
}

.sittings__main {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.clearfix:before,
.clearfix:after {
	display: table;
	content: "";
}
.clearfix:after {
	clear: both;
}

.app__warning {
	display: flex;
	flex-direction: row;
	align-content: center;
	align-items: center;
	justify-content: center;
	padding: 20px;

	.app__warning-message {
		max-width: 50%;
	}
}

.sittings__title h1::after {
	display: block;
	content: " ";
	background-color: #edd227;
	width: 20px;
	height: 4px;
  margin-top: 5px;
}

.sittings__loading {
	display: flex;
	flex-direction: column;
	align-items: center;
	align-content: center;

	.sittings__loading-content {
		max-width: 70%;
	}
}

.box-card {
	margin-bottom: 20px;
	margin-left: 20px;
	margin-right: 20px;
}

.sitting__publication-date {
	display: block;
	width: 60px;
	background-color: #edd227;
	text-align: center;
	padding: 10px;
	margin: 0px 20px 0 0;
	float: left;
	font-weight: bold;
	color: #494634;
}

.sitting__header {
	font-size: 18px;
	color: #198cdc;
	font-weight: 600;
}

@media screen and (max-width: 1200px) {
	.box-card {
		margin-left: 20px;
		margin-right: 20px;
		max-width: 90%;
		min-width: 90%;
	}
}

.sittings__pagination {
	padding: 20px;
}

.sittings__search-bar {
	padding-top: 20px;
	padding-bottom: 20px;
	background-color: #034ea2;
	border-bottom: 1px solid #d1d3d4;
	width: 100%;
}

.sittings__container {
	width: 60%;
	padding: 0 20px;

	@media screen and (max-width: 1200px) {
		width: 100%;
	}
}

.sittings__cards {
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;

	@media screen and (max-width: 1200px) {
		display: inline-block;
		max-width: 100%;
	}
}
</style>

<style lang="scss">
.has-sitting {
	color: #67c23a;
	font-weight: 700;
}

.no-sitting {
	border-radius: 50%;
}

a {
	color: #198cdc;
}
</style>
