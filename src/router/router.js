import Vue from 'vue'
import VueRouter from 'vue-router'

import Main from '../pages/Main.vue'
const Login = { template: '<div>please login</div>' }
import Test from '../pages/Test.vue'
import Error from '../pages/Error.vue'

Vue.use(VueRouter)
export default new VueRouter({
    mode:'history',
    routes: [
        {
            path: '/',
            name: 'Main',
            component: Main
        },
        {
            path: '/test',
            name: 'Test',
            component: Test
        },
        {
            path: '*',
            component: Error
        }
    ]

})