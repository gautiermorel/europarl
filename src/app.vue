<template>
	<div id="app">
		<el-row type="flex" justify="space-between" align="center" class="app__top-header">
			<el-row>
				<div class="app__top-header-content">
					<div class="app__top-header-text">Un site web non officiel pour l’Union européenne</div>
				</div>
				<el-dropdown class="hidden-xs-only">
					<span class="el-dropdown-link">
						FR - Français
						<i class="el-icon-arrow-down el-icon--right"></i>
					</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item disabled>EN - English</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-row>
			<el-row type="flex">
				<el-alert :title="displayLastUpdate" type="info" :closable="false"></el-alert>
			</el-row>
		</el-row>
		<el-row type="flex" justify="center" align="center">
			<el-container class="app__container">
				<el-header class="app__header" height="120px">
					<el-row class="app__header-content" type="flex">
						<el-image class="app__header-image" @click="navigate('/')" style="width: 100px; height: 50px" src="/img/logo.png" fit="scale-down"></el-image>
						<el-divider direction="vertical"></el-divider>
						<el-col type="flex" align="center">
							<div class="app__title" @click="navigate('/')">Europarl</div>
							<div class="hidden-xs-only">Séances plénières européenes</div>
						</el-col>

						<ul class="social-links">
							<a href="https://www.europarl.europa.eu/plenary/en/votes.html?tab=votes" class="social-link social-link-linkedin" title="EDPS on Linkedin" target="_blank">
								<span class="sr-only">Aller sur le site officiel</span>
							</a>
						</ul>
					</el-row>
				</el-header>
				<transition name="fade">
					<router-view></router-view>
				</transition>
				<el-footer>
					<el-row type="flex" align="center" justify="center" class="app__footer">
						<el-col type="flex" justify="center" align="center">
							<div>
								<el-link href="https://gautiermorel.com" target="_blank">
									© europal.eu.org - 2020 &nbsp; - with
									<i class="el-icon-magic-stick"></i> by Gautier
								</el-link>
							</div>
							<div>
								<el-link href="https://parltrack.org" target="_blank">© Parltrack, 2020</el-link>
							</div>

							<div>
								<el-link href="https://www.europarl.europa.eu/privacy-policy/fr" target="_blank">© European Union, 2020 – Source: European Parliament</el-link>
							</div>
							<div>
								<el-button type="text" icon="el-icon-info" @click="navigate('privacy')">Politique de confidentialité</el-button>
							</div>
						</el-col>
					</el-row>
				</el-footer>
			</el-container>
		</el-row>
	</div>
</template>

<style lang="scss">
* {
	text-align: start;
	font-family: "Europarl Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
	font-weight: 400;
}

// OVERRIDE

.el-table td,
.el-table th.is-leaf {
	border-bottom: 0px !important;
}

.el-card {
	border: none !important;
}

.el-tag.el-tag--success {
	background-color: #28a745 !important;
	border-color: #28a745 !important;
	color: white !important;
}

.el-tag.el-tag--warning {
	background-color: #edd227 !important;
	border-color: #edd227 !important;
	color: black !important;
}

.el-tag.el-tag--danger {
	background-color: #dc3545 !important;
	border-color: #dc3545 !important;
	color: white !important;
}

.el-button, .el-input__inner, .el-tag {
  border-radius: 0px !important;
}

@font-face {
	font-family: "Europarl Sans";
	font-weight: 200;
	font-style: normal;
	font-stretch: normal;
	src: url(/fonts/europarl/200_normal/europarl.woff2) format("woff2"), url(/fonts/europarl/200_normal/europarl.woff) format("woff"), url(/fonts/europarl/200_normal/europarl.otf) format("opentype"), url(/fonts/europarl/200_normal/europarl.ttf) format("truetype");
}
@font-face {
	font-family: "Europarl Sans";
	font-weight: 200;
	font-style: italic;
	font-stretch: normal;
	src: url(/fonts/europarl/200_italic/europarl.woff2) format("woff2"), url(/fonts/europarl/200_italic/europarl.woff) format("woff"), url(/fonts/europarl/200_italic/europarl.otf) format("opentype"), url(/fonts/europarl/200_italic/europarl.ttf) format("truetype");
}
@font-face {
	font-family: "Europarl Sans";
	font-weight: 300;
	font-style: normal;
	font-stretch: normal;
	src: url(/fonts/europarl/300_normal/europarl.woff2) format("woff2"), url(/fonts/europarl/300_normal/europarl.woff) format("woff"), url(/fonts/europarl/300_normal/europarl.otf) format("opentype"), url(/fonts/europarl/300_normal/europarl.ttf) format("truetype");
}
@font-face {
	font-family: "Europarl Sans";
	font-weight: 300;
	font-style: italic;
	font-stretch: normal;
	src: url(/fonts/europarl/300_italic/europarl.woff2) format("woff2"), url(/fonts/europarl/300_italic/europarl.woff) format("woff"), url(/fonts/europarl/300_italic/europarl.otf) format("opentype"), url(/fonts/europarl/300_italic/europarl.ttf) format("truetype");
}
@font-face {
	font-family: "Europarl Sans";
	font-weight: 400;
	font-style: normal;
	font-stretch: normal;
	src: url(/fonts/europarl/400_normal/europarl.woff2) format("woff2"), url(/fonts/europarl/400_normal/europarl.woff) format("woff"), url(/fonts/europarl/400_normal/europarl.otf) format("opentype"), url(/fonts/europarl/400_normal/europarl.ttf) format("truetype");
}
@font-face {
	font-family: "Europarl Sans";
	font-weight: 400;
	font-style: italic;
	font-stretch: normal;
	src: url(/fonts/europarl/400_italic/europarl.woff2) format("woff2"), url(/fonts/europarl/400_italic/europarl.woff) format("woff"), url(/fonts/europarl/400_italic/europarl.otf) format("opentype"), url(/fonts/europarl/400_italic/europarl.ttf) format("truetype");
}
@font-face {
	font-family: "Europarl Sans";
	font-weight: 600;
	font-style: normal;
	font-stretch: normal;
	src: url(/fonts/europarl/600_normal/europarl.woff2) format("woff2"), url(/fonts/europarl/600_normal/europarl.woff) format("woff"), url(/fonts/europarl/600_normal/europarl.otf) format("opentype"), url(/fonts/europarl/600_normal/europarl.ttf) format("truetype");
}
@font-face {
	font-family: "Europarl Sans";
	font-weight: 600;
	font-style: italic;
	font-stretch: normal;
	src: url(/fonts/europarl/600_italic/europarl.woff2) format("woff2"), url(/fonts/europarl/600_italic/europarl.woff) format("woff"), url(/fonts/europarl/600_italic/europarl.otf) format("opentype"), url(/fonts/europarl/600_italic/europarl.ttf) format("truetype");
}
@font-face {
	font-family: "Europarl Sans";
	font-weight: 700;
	font-style: normal;
	font-stretch: normal;
	src: url(/fonts/europarl/700_normal/europarl.woff2) format("woff2"), url(/fonts/europarl/700_normal/europarl.woff) format("woff"), url(/fonts/europarl/700_normal/europarl.otf) format("opentype"), url(/fonts/europarl/700_normal/europarl.ttf) format("truetype");
}
@font-face {
	font-family: "Europarl Sans";
	font-weight: 700;
	font-style: italic;
	font-stretch: normal;
	src: url(/fonts/europarl/700_italic/europarl.woff2) format("woff2"), url(/fonts/europarl/700_italic/europarl.woff) format("woff"), url(/fonts/europarl/700_italic/europarl.otf) format("opentype"), url(/fonts/europarl/700_italic/europarl.ttf) format("truetype");
}
@font-face {
	font-family: "Europarl Sans";
	font-weight: 900;
	font-style: normal;
	font-stretch: normal;
	src: url(/fonts/europarl/900_normal/europarl.woff2) format("woff2"), url(/fonts/europarl/900_normal/europarl.woff) format("woff"), url(/fonts/europarl/900_normal/europarl.otf) format("opentype"), url(/fonts/europarl/900_normal/europarl.ttf) format("truetype");
}
@font-face {
	font-family: "Europarl Sans";
	font-weight: 900;
	font-style: italic;
	font-stretch: normal;
	src: url(/fonts/europarl/900_italic/europarl.woff2) format("woff2"), url(/fonts/europarl/900_italic/europarl.woff) format("woff"), url(/fonts/europarl/900_italic/europarl.otf) format("opentype"), url(/fonts/europarl/900_italic/europarl.ttf) format("truetype");
}

body {
	margin: 0px;
}

#app {
	font-family: "Europarl Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
	text-align: center;
	color: #212529;

	.fade-enter-active,
	.fade-leave-active {
		transition: opacity 0.3s;
	}

	.fade-enter,
	.fade-leave-to {
		opacity: 0;
	}
}

@media screen and (max-width: 1200px) {
	.app__container {
		max-width: 100%;
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
	cursor: pointer;
	color: #034ea2;
	text-transform: uppercase;
	font-size: 24px;
}

.app__top-header {
	background-color: #eee;
	padding: 0 0 0 16px;
	position: relative;
	height: 28px;
	line-height: 22px;
}

.app__top-header-content {
	display: inline-block;
	position: relative;
	font-size: 14px;
	font-family: Arial, Verdana;
	box-sizing: border-box;
	color: #212529;
	font-weight: normal;
	line-height: 16px;
	padding-right: 30px;
}

.app__top-header-text::before {
	content: "\00a0" !important;
	display: inline-block;
	width: 24px;
	height: 16px;
	background: center center / 110% auto no-repeat #004494 url("data:image/svg+xml,%3C%3Fxml version='1.0' standalone='no'%3F%3E%0A%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%0A version='1.1'%0A viewBox='0 0 810 540'%0A width='810' height='540'%3E%0A %3Cdesc%3EEuropean flag%3C/desc%3E%0A %3Cdefs%3E%0A %3Cg id='s'%3E%0A %3Cg id='c'%3E%0A %3Cpath id='t' d='M0%2C0v1h0.5z' transform='translate(0%2C-1) rotate(18)'/%3E%0A %3Cuse xlink:href='%23t' transform='scale(-1%2C1)'/%3E%0A %3C/g%3E%0A %3Cg id='a'%3E%0A %3Cuse xlink:href='%23c' transform='rotate(72)'/%3E%0A %3Cuse xlink:href='%23c' transform='rotate(144)'/%3E%0A %3C/g%3E%0A %3Cuse xlink:href='%23a' transform='scale(-1%2C1)'/%3E%0A %3C/g%3E%0A %3C/defs%3E%0A %3Crect fill='%23039' width='810' height='540'/%3E%0A %3Cg fill='%23fc0' transform='scale(30)translate(13.5%2C9)'%3E%0A %3Cuse xlink:href='%23s' y='-6'/%3E%0A %3Cuse xlink:href='%23s' y='6'/%3E%0A %3Cg id='l'%3E%0A %3Cuse xlink:href='%23s' x='-6'/%3E%0A %3Cuse xlink:href='%23s' transform='rotate(150)translate(0%2C6)rotate(66)'/%3E%0A %3Cuse xlink:href='%23s' transform='rotate(120)translate(0%2C6)rotate(24)'/%3E%0A %3Cuse xlink:href='%23s' transform='rotate(60)translate(0%2C6)rotate(12)'/%3E%0A %3Cuse xlink:href='%23s' transform='rotate(30)translate(0%2C6)rotate(42)'/%3E%0A %3C/g%3E%0A %3Cuse xlink:href='%23l' transform='scale(-1%2C1)'/%3E%0A %3C/g%3E%0A%3C/svg%3E");
	margin: 5.5px 8px 0 0;
	border: 1px solid #004494;
}

.app__header {
	border-bottom: 1px solid #d1d3d4;
	display: flex;
	justify-content: center;
}

.app__header-content {
	padding-top: 30px;
	padding-bottom: 30px;
	width: 50%;

	.el-divider {
		height: 50px;
	}
}
.app__disclamer {
	color: #f56c6c;
	font-size: 10px;
}
.app__header-image {
	cursor: pointer;
}
.app__footer {
	width: 100%;
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
	methods: {
		navigate(page) {
			if (this.$route.path !== page) this.$router.push(page);
		}
	},
	mounted: function () {
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
		displayLastUpdate: function () {
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
