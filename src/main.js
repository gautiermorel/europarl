'use strict';

/* eslint-disable import/extensions */
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import VueCarousel from 'vue-carousel';
import VueToast from 'vue-toast-notification';
import VueScrollTo from 'vue-scrollto';

import moment from 'moment';
import locale from 'element-ui/lib/locale/lang/fr';

import app from '@/app.vue';
import store from '@/store/store.js';
import router from '@/router/router.js';

import VModal from 'vue-js-modal';
import ElementUI from 'element-ui';
import Interceptors from '@/router/interceptors.js';

import 'vue-phone-number-input/dist/vue-phone-number-input.css';
import 'vue-toast-notification/dist/index.css';
import 'nprogress/nprogress.css';
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/display.css';

Vue.config.productionTip = false

Vue.use(VModal)
Vue.use(VueI18n)
Vue.use(VueCarousel)
Vue.use(VueToast)
Vue.use(VueScrollTo)
Vue.use(ElementUI, { locale })
Vue.use(Interceptors)

Vue.filter('formatDate', function (value) {
	if (value) {
		let language = 'fr';
		return moment(value).locale(language).format('DD MMMM YYYY')
	}
})
Vue.filter('formatHours', function (value) {
	if (value) {
		let language = 'fr';
		return moment(value).locale(language).format('HH:mm')
	}
})

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
	render: h => h(app)
}).$mount('#app')