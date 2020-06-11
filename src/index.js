console.log("main.js loading")

if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}


//Добавление vue.js
import Vue from 'vue'

import App from './App.vue';
//
import router from './router/router'
// import router from './router'

import vuetify from './plugins/vuetify' // path to vuetify export

new Vue({
    router, //сокращенная запись для router:router
    vuetify,
    el:'#vue-app',
    render: a => a(App)
})
    // .$mount('#vue-app')
