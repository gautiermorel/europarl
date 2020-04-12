import Vue from 'vue';
import VueRouter from 'vue-router';
import Votes from '@/views/votes.vue';
import Vote from '@/views/vote.vue';

Vue.use(VueRouter)

const routes = [{
	path: '/',
	name: 'votes',
	component: Votes
}, {
	path: '/vote/:id',
	name: 'vote',
	component: Vote
}]

const router = new VueRouter({ routes })

export default router
