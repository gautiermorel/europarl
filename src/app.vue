<template>
	<div id="app">
		<el-row type="flex" justify="space-between" align="center" class="app__top-header">
			<el-dropdown class="hidden-xs-only">
				<span class="el-dropdown-link">
					FR - Français
					<i class="el-icon-arrow-down el-icon--right"></i>
				</span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item disabled>EN - English</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
			<el-row type="flex">
				<el-alert :title="displayLastUpdate" type="info" :closable="false"></el-alert>
			</el-row>
		</el-row>
		<el-container>
			<el-header class="app__header" height="120px">
				<el-row class="app__header-content" type="flex">
					<el-image style="width: 100px; height: 50px" src="/img/logo.png" fit="scale-down"></el-image>
					<el-divider direction="vertical"></el-divider>
					<el-col type="flex">
						<div class="app__title">Europarl</div>
						<div class="hidden-xs-only">Résultats des votes des séances plénières européenes</div>
						<el-row type="flex" justify="start" align="center" class="app__disclamer">
							<i style="margin-right: 3px; margin-top: 1px" class="el-icon-warning-outline"></i>
							<span>Avertissement - Ce site est un projet personnel citoyen. Il n'est lié à aucune institution.</span>
						</el-row>
					</el-col>
				</el-row>
			</el-header>
			<transition name="fade">
				<router-view></router-view>
			</transition>
			<el-footer>
				<el-row type="flex" justify="center" class="app__footer">
					<el-link href="https://gautiermorel.com" target="_blank">
						© europal.eu.org - 2020 &nbsp; - with
						<i class="el-icon-magic-stick"></i> by Gautier
					</el-link>
				</el-row>
			</el-footer>
		</el-container>
	</div>
</template>

<style lang="scss">
* {
	text-align: start;
	font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}

body {
	margin: 0px;
}

#app {
	font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;

	.fade-enter-active,
	.fade-leave-active {
		transition: opacity 0.3s;
	}

	.fade-enter,
	.fade-leave-to {
		opacity: 0;
	}
}

#nav {
	padding: 30px;

	a {
		font-weight: bold;
		color: #2c3e50;

		&.router-link-exact-active {
			color: #42b983;
		}
	}
}

.app__tagline {
	padding-top: 10px;
	padding-bottom: 50px;
}
.app__title {
	font-family: Georgia, Garamond, serif, Palatino;
	font-size: 30px;
	font-weight: 400;
}

.app__top-header {
	background-color: #fafafa;
	height: 40px;
	padding: 10px;
	border-bottom: 1px solid #d1d3d4;
}
.app__header {
	border-bottom: 1px solid #d1d3d4;
}

.app__header-content {
	padding-top: 30px;
	padding-bottom: 30px;

	.el-divider {
		height: 50px;
	}
}
.app__disclamer {
	color: #F56C6C;
	font-size: 10px;
}
</style>
<script>
import moment from "moment";
export default {
	data() {
		return {
			breadcrumbList: this.$route.meta.breadcrumb,
			lastUpdate: ""
		};
	},
	mounted: function() {
		this.$publicApi
			.get("/logs")
			.then(res => {
				let { lastUpdate = null } = (res && res.data) || {};
				this.lastUpdate = lastUpdate;
			})
			.catch(err => {
				console.log("ERROR: sittingsList.vue#mounted - Error while getting sittings:", err);
			});
	},
	computed: {
		displayLastUpdate: function() {
			let lastUpdate = moment(this.lastUpdate)
				.locale("fr")
				.format("DD MMMM YYYY HH:mm:ss");
			return `Dernière mise à jour: ${lastUpdate}`;
		}
	},
	watch: {
		$route(to, from) {
			this.breadcrumbList = this.$route.meta.breadcrumb;
		}
	}
};
</script>
