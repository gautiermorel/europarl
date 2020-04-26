import Vue from 'vue';
import VueRouter from 'vue-router';
import NProgress from 'nprogress';

import Sittings from '@/views/sittings.vue';
import Compare from '@/views/compare.vue';

import 'nprogress/nprogress.css';

Vue.use(VueRouter)

const routes = [{
	path: '/',
	name: 'sittings',
	component: Sittings,
	meta: {
		breadcrumb: [
			{ name: 'Séance plénières' }
		]
	}
}, {
	path: '/compare',
	name: 'compare',
	component: Compare,
	meta: {
		breadcrumb: [
			{ name: 'Séance plénières' },
			{ name: 'Compare' }
		]
	}
}]

const router = new VueRouter({ routes })

router.beforeResolve((to, from, next) => {
	if (to.name) NProgress.start()
	next()
})

router.afterEach(() => {
	NProgress.done()
})

export default router
