<template>
	<el-row type="flex" justify="center">
		<el-table ref="multipleTable" :data="votes" stripe empty-text="Chargement..." style="width: 100%">
			<el-table-column type="selection" width="55"></el-table-column>
			<el-table-column v-for="property in meps" :key="property" :property="property" :label="property" min-width="100">
				<template slot-scope="scope">{{scope.row[property]}}</template>
			</el-table-column>
		</el-table>
	</el-row>
</template>

<i18n>{}</i18n>

<script>
export default {
	name: "Compare",
	components: {},
	props: {},
	data: function() {
		return {
			votes: []
		};
	},
	computed: {
		meps: function() {
			let [vote = {}] = this.votes || [];
			return Object.keys(vote).reverse();
		}
	},
	methods: {},
	mounted: function() {
		let mepids = this.$route.query.mepids;
		mepids = (Array.isArray(mepids) && mepids) || [mepids];

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