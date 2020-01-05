import Vue from 'vue'
import Router from 'vue-router'
import DaliccLicenseAnnotator from '@/components/DaliccLicenseAnnotator'
import Home from '@/components/Home'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'DALLIC license annotator',
            component: Home,
        },
        {
            path: '/licensing',
            name: 'Licensing - DALLIC license annotator',
            component: DaliccLicenseAnnotator
        },
        {
            path: '/retrieve',
            name: 'Retrieve information - DALLIC license annotator',
            component: DaliccLicenseAnnotator
        }
    ]
})