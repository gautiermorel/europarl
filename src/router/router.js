import Vue from 'vue';
import VueRouter from 'vue-router';
import Sittings from '@/views/sittings.vue';
import NProgress from 'nprogress';

import 'nprogress/nprogress.css';

Vue.use(VueRouter)

const routes = [{
	path: '/',
	name: 'sittings',
	component: Sittings,
	meta: {
		breadcrumb: [
			{ name: 'Accueil' }
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
