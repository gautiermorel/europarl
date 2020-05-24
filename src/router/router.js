import Vue from 'vue';
import VueRouter from 'vue-router';
import NProgress from 'nprogress';

import Sittings from '@/views/sittings.vue';
import Compare from '@/views/compare.vue';
import Privacy from '@/views/privacy.vue';

import 'nprogress/nprogress.css';

Vue.use(VueRouter)

const routes = [{
	path: '/',
	name: 'home',
	component: Sittings,
	meta: {
		breadcrumb: [
			{ name: 'Accueil' }
		]
	}
}, {
	path: '/sittings',
	name: 'sittings',
	component: Sittings,
	meta: {
		breadcrumb: [
			{ name: 'Accueil', path: '/' },
			{ name: 'Séance plénières' }
		]
	}
}, {
	path: '/compare',
	name: 'compare',
	component: Compare,
	meta: {
		breadcrumb: [
			{ name: 'Acceuil', path: '/' },
			{ name: 'Compare' }
		]
	}
}, {
	path: '/privacy',
	name: 'privacy',
	component: Privacy,
	meta: {
		breadcrumb: [
			{ name: 'Acceuil', path: '/' },
			{ name: 'Privacy' }
		]
	}
}]

const router = new VueRouter({
	mode: 'history',
	routes: routes
})

router.beforeResolve((to, from, next) => {
	if (to.name) NProgress.start()
	next()
})

router.afterEach(() => {
	NProgress.done()
})

export default router
