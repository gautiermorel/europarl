<template>
	<el-col>
		<el-row type="flex" justify="center" style="padding: 20px; width: 100%">
			<el-select ref="select" style="width: 100%; padding-right: 20px" v-model="value" multiple filterable remote reserve-keyword placeholder="Rechercher un ou plusieurs MEPs" :remote-method="remoteMethod" :loading="loading" @change="refresh">
				<el-option v-for="item in options" :key="item.mepid" :label="item.fullName" :value="item.mepid"></el-option>
			</el-select>
			<el-input placeholder="Rechercher et filtrer par texte" prefix-icon="el-icon-search" v-model="search" @keyup.enter.native="refresh">
				<el-button slot="append" icon="el-icon-search" @click="refresh"></el-button>
			</el-input>
		</el-row>
		<el-row type="flex" justify="center">
			<el-table v-if="votes && votes.length > 0" ref="multipleTable" :data="votes" stripe empty-text="Chargement..." style="width: 100%">
				<el-table-column type="selection" width="55"></el-table-column>
				<el-table-column v-for="property in meps" :key="property" :property="property" :label="property" min-width="100">
					<template slot="header">
						<el-row type="flex" justify="center">{{getHeader(property)}}</el-row>
					</template>
					<template slot-scope="scope">
						<el-row type="flex" justify="start" align="center">
							<div v-if="scope.row[property] !== '+' && scope.row[property] !== '-' && scope.row[property] !== '0' && scope.row[property] !== 'Non Présent'">{{scope.row[property]}}</div>
						</el-row>
						<el-row type="flex" justify="center" align="center">
							<el-tag v-if="scope.row[property] === '+'" style="min-width: 100px; text-align: center" type="success">
								<i class="el-icon-document-checked" style="margin-right:4px"></i>
								<span>Pour</span>
							</el-tag>
							<el-tag v-if="scope.row[property] === '0'" style="min-width: 100px; text-align: center" type="warning">
								<i class="el-icon-document-delete" style="margin-right:4px"></i>
								<span>Abstention</span>
							</el-tag>
							<el-tag v-if="scope.row[property] === '-'" style="min-width: 100px; text-align: center" type="danger">
								<i class="el-icon-document-remove" style="margin-right:4px"></i>
								<span>Contre</span>
							</el-tag>
							<el-tag v-if="scope.row[property] === 'Non Présent'" style="min-width: 100px; text-align: center" type="info">{{scope.row[property]}}</el-tag>
						</el-row>
					</template>
				</el-table-column>
			</el-table>
			<div v-if="votes && votes.length === 0" style="padding: 20px">
				<el-alert title="Aucun vote disponible, vous pouvez rechercher un ou plusieurs MEPs et les filtrer par texte" type="info" :closable="false"></el-alert>
			</div>
		</el-row>
	</el-col>
</template>

<i18n>{}</i18n>

<script>
export default {
	name: "Compare",
	components: {},
	props: {},
	computed: {
		meps: function() {
			let [vote = {}] = this.votes || [];
			return Object.keys(vote)
				.filter(k => k !== "_id" && k !== "meps")
				.reverse();
		}
	},
	methods: {
		getHeader: function(property) {
			if (property === "_id") return property;
			if (property === "title") return "Textes";

			let [vote = {}] = this.votes || [];
			let mep = vote.meps.find(mep => `${mep.UserID}` === `${property}`) || {};

			return mep.Name.full;
		},
		remoteMethod: function(query) {
			if (query !== "") {
				this.loading = true;

				this.$publicApi
					.get("/search/meps", {
						params: {
							search: query
						}
					})
					.then(res => {
						this.loading = false;
						let meps = (res && res.data) || {};
						this.options = meps || [];
					})
					.catch(err => {
						console.log("ERROR: sittingsList.vue#mounted - Error while getting sittings:", err);
					});
			} else {
				this.options = [];
			}
		},
		refresh: function() {
			this.$router.replace({ name: "compare", query: { mepids: this.value, search: this.search } });

			setTimeout(() => {
				this.$refs.select.blur();
			}, 300);

			this.options = [];

			this.$publicApi
				.get("/compare", {
					params: {
						page: 1,
						mepids: this.value,
						search: this.search
					}
				})
				.then(res => {
					let { votes } = (res && res.data) || {};
					this.votes = votes || [];
				})
				.catch(err => {
					console.log("ERROR: sittingsList.vue#mounted - Error while getting sittings:", err);
				});
		}
	},
	data() {
		return {
			votes: [],
			options: [],
			value: [],
			loading: false,
			states: [],
			search: null
		};
	},
	mounted() {
		let mepids = this.$route.query.mepids;
		mepids = (mepids && ((Array.isArray(mepids) && mepids) || [mepids])) || null;

		let search = this.$route.query.search;

		this.$publicApi
			.get("/compare", {
				params: {
					page: 1,
					mepids: mepids,
					search: search
				}
			})
			.then(res => {
				let { votes } = (res && res.data) || {};
				this.votes = votes || [];
			})
			.catch(err => {
				console.log("ERROR: sittingsList.vue#mounted - Error while getting sittings:", err);
			});
	}
};
</script>

<style lang="scss" scoped="true">
</style>