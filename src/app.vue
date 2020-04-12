<template>
	<div id="app">
		<transition name="fade">
			<router-view></router-view>
		</transition>
	</div>
</template>

<style lang="scss">

* {
	text-align: start;
	font-family: 'roboto' !important;
}

#app {
	font-family: 'roboto', 'Avenir', Helvetica, Arial, sans-serif;
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
</style>
<script>
export default { }
</script>
