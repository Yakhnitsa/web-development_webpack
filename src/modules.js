console.log("modules.js loading")

if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}

import Vue from 'vue'
import App from './App.vue';//
import router from './router/router'
import vuetify from './plugins/vuetify' // path to vuetify export

