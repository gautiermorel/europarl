<template>
	<div class="sitting__content">
		<sittings-list></sittings-list>
	</div>
</template>

<i18n>{}</i18n>

<script>
import SittingsList from "@/components/SittingsList.vue";

export default {
	name: "home",
	components: {
		SittingsList
	},
	props: {},
	data() {
		return {
			sittings: null
		};
	},
	methods: {},
	mounted: function() {},
	watch: {}
};
</script>

<style lang="scss" scoped>
.sitting__content {
	padding-left: 20px;
	padding-right: 20px;
}
</style>
