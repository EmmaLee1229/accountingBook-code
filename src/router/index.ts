import Vue from 'vue';
import VueRouter, {RouteConfig} from 'vue-router';
import Money from '@/views/Money.vue';
import Labels from '@/views/Labels.vue';
import Statistics from '@/components/Statistics.vue';
import NotFound from '@/components/NotFound.vue';
import EditLabel from '@/views/EditLabel.vue';
import Echart from '@/views/Echart.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: '/',
        redirect: '/money'
    },
    {
        path: '/money',
        component: Money
    },
    {
        path: '/labels',
        component: Labels
    },
    {
        path: '/labels/EditLabel/:id',
        component: EditLabel
    },
    {
        path: '/statistics',
        component: Statistics
    },
    {
        path: '/charts',
        component: Echart
    },
    {
        path: '*',
        component: NotFound
    }
];

const router = new VueRouter({
    routes
});

export default router;
