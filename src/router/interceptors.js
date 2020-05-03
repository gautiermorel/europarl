/* eslint-disable import/extensions */

import NProgress from 'nprogress';

import axios from 'axios';
import { uuid } from 'vue-uuid';


const Plugin = {
	install(Vue) {
		Vue.prototype.$publicApi = axios.create({
			baseURL: process.env.VUE_APP_PUBLIC_API_URL
		})

		let device = uuid.v1();

		// Interceptor that adds device and token to every request header
		Vue.prototype.$publicApi.interceptors.request.use(function (config) {
			config.headers['x-session-device'] = device;
			NProgress.start()
			return config;
		}, function (err) {
			return Promise.reject(err);
		})

		// before a response is returned stop nprogress
		Vue.prototype.$publicApi.interceptors.response.use(response => {
			NProgress.done()
			return response
		})
	}
}

export default Plugin