<template>
	<el-col>
		<el-row type="flex" justify="center" style="padding: 20px; width: 100%">
			<el-select style="width: 100%" v-model="value" multiple filterable remote reserve-keyword placeholder="Please enter a keyword" :remote-method="remoteMethod" :loading="loading">
				<el-option v-for="item in options" :key="item.mepid" :label="item.fullName" :value="item.mepid"></el-option>
			</el-select>
		</el-row>
		<el-row type="flex" justify="center">
			<el-table ref="multipleTable" :data="votes" stripe empty-text="Chargement..." style="width: 100%">
				<el-table-column type="selection" width="55"></el-table-column>
				<el-table-column v-for="property in meps" :key="property" :property="property" :label="property" min-width="100">
					<template slot="header">
						<el-row type="flex" justify="center">{{getHeader(property)}}</el-row>
					</template>
					<template slot-scope="scope">{{scope.row[property]}}</template>
				</el-table-column>
			</el-table>
		</el-row>
	</el-col>
</template>

<i18n>{}</i18n>

<script>
export default {
	name: "Compare",
	components: {},
	props: {},
	data: function() {
		return {
			votes: [],
			options: [],
			value: [],
			list: [],
			loading: false,
			states: []
		};
	},
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
			if (property === "_id" || property === "title") return property;
			let [vote = {}] = this.votes || [];
			let mep = vote.meps.find(mep => `${mep.UserID}` === `${property}`) || {};
			return mep.Name.full;
		},
		remoteMethod: function(query) {
			if (query !== "") {
				this.loading = true;

				this.$publicApi
					.get("/meps", {
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

				// setTimeout(() => {
				// 	this.loading = false;
				// 	this.options = this.list.filter(item => {
				// 		return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
				// 	});
				// }, 200);
			} else {
				this.options = [];
			}
		}
	},
	mounted: function() {
		this.list = this.states.map(item => {
			return { value: `value:${item}`, label: `label:${item}` };
		});

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