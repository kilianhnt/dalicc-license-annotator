import Vue from 'vue'
import Router from 'vue-router'
import DaliccLicenseAnnotator from '@/components/DaliccLicenseAnnotator'
import Home from '@/components/Home'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
        },
        {
            path: '/licensing',
            name: 'Licensing',
            component: DaliccLicenseAnnotator
        },
        {
            path: '/retrieve',
            name: 'Retrieve',
            component: DaliccLicenseAnnotator
        }
    ]
})