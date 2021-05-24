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


import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/analytics";

const firebaseConfig = {
	apiKey: "AIzaSyB4XT2czDAVNw9Ltmkni8LFcp-I52QJBhA",
	authDomain: "europarl-web.firebaseapp.com",
	projectId: "europarl-web",
	storageBucket: "europarl-web.appspot.com",
	messagingSenderId: "532322533960",
	appId: "1:532322533960:web:35a67bd0af00e0ff6e4e7d",
	measurementId: "G-043JWHLQVK"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

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
		return moment(value).locale(language).format('DD MMM YYYY')
	}
})
Vue.filter('formatHours', function (value) {
	if (value) {
		let language = 'fr';
		return moment(value).locale(language).format('HH:mm')
	}
})

const {
	REGEX_1 = /[a-zA-Z0-9]{2}-[a-zA-Z0-9]{4}\/[a-zA-Z0-9]{4}/g,
	REGEX_2 = /[0-9]{4}\/[0-9]{4}\([a-zA-Z]{3}\)/g,
	REGEX_3 = /[a-zA-Z]{3}\([0-9]{4}\)[0-9]{4}/g

} = {};

Vue.filter('getReferences', function (value) {
	if (value) {
		let texts = value.match(REGEX_1) || [];
		let budORCodes = value.match(REGEX_2) || [];
		let coms = value.match(REGEX_3) || [];

		if (texts.length === 0) return value;

		let newValue = '';

		for (let i = 0; i < texts.length; i++) {
			let text = texts[i];
			newValue += value.replace(text, `<a href="https://oeil.secure.europarl.europa.eu/oeil/popups/ficheprocedure.do?lang=fr&reference=${text}" target="_blank">${text}</a>`)
		}

		if (budORCodes.length === 0) return newValue;

		let codeValue = '';

		for (let i = 0; i < budORCodes.length; i++) {
			let budORCode = budORCodes[i];
			codeValue += newValue.replace(budORCode, `<a href="https://oeil.secure.europarl.europa.eu/oeil/popups/ficheprocedure.do?lang=fr&reference=${budORCode}" target="_blank">${budORCode}</a>`)
		}

		if (coms.length === 0) return codeValue;

		let comValue = '';

		for (let i = 0; i < coms.length; i++) {
			let com = coms[i];
			comValue += codeValue.replace(com, `<a href="https://oeil.secure.europarl.europa.eu/oeil/popups/ficheprocedure.do?lang=fr&reference=${com}" target="_blank">${com}</a>`)
		}

		return comValue;
	}
	return value;
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