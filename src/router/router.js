import Vue from 'vue';
import VueRouter from 'vue-router';
import Votes from '@/views/votes.vue';
import Vote from '@/views/vote.vue';
import NProgress from 'nprogress';

import 'nprogress/nprogress.css';

Vue.use(VueRouter)

const routes = [{
	path: '/',
	name: 'votes',
	component: Votes,
	meta: {
		breadcrumb: [
			{ name: 'Accueil' }
		]
	}
},
	// {
	// 	path: '/vote/:id',
	// 	name: 'vote',
	// 	component: Vote,
	// 	meta: {
	// 		breadcrumb: [
	// 			{ name: 'Accueil', path: '/' },
	// 			{ name: 'Vote' }
	// 		]
	// 	}
	// }
]

const router = new VueRouter({ routes })

router.beforeResolve((to, from, next) => {
	if (to.name) NProgress.start()
	next()
})

router.afterEach(() => {
	NProgress.done()
})

export default router
