import Vue from 'vue';
import moment from 'moment';
import VueI18n from 'vue-i18n';
import VueCarousel from 'vue-carousel';
import VueToast from 'vue-toast-notification';
import UUID from 'vue-uuid';
import { uuid } from 'vue-uuid';
import VuePhoneNumberInput from 'vue-phone-number-input';
import VueScrollTo from 'vue-scrollto';

import App from '@/app.vue';
import store from '@/store/store.js';
import router from '@/router/router.js';
import axios from 'axios';
import VModal from 'vue-js-modal'

import 'vue-phone-number-input/dist/vue-phone-number-input.css';
import 'vue-toast-notification/dist/index.css';
import '@/assets/global.scss';

Vue.config.productionTip = false

Vue.use(VModal)
Vue.use(VueI18n)
Vue.use(VueCarousel)
Vue.use(VueToast)
Vue.use(UUID)
Vue.use(VueScrollTo)


Vue.filter('formatDate', function (value) {
	if (value) {
		let language = 'fr';
		return moment(value).locale(language).format('dddd DD MMMM')
	}
})


Vue.component('vue-phone-number-input', VuePhoneNumberInput);

Vue.use({
	install(Vue) {
		Vue.prototype.$publicApi = axios.create({
			baseURL: process.env.VUE_APP_PUBLIC_API_URL
		})

		let device = uuid.v1();

		// Interceptor that adds device and token to every request header
		Vue.prototype.$publicApi.interceptors.request.use(function (config) {
			config.headers['x-session-device'] = device;
			return config;
		}, function (err) {
			return Promise.reject(err);
		})
	}
})

// let language = navigator.language ? navigator.language.split('-')[0]: 'en';
let language = 'fr';

const i18n = new VueI18n({
	locale: language || 'en',
	fallbackLocale: 'fr',
	messages: {} //Empty messages as we manage them in single file components
})


new Vue({
	i18n,
	router,
	store,
	render: h => h(App)
}).$mount('#app')