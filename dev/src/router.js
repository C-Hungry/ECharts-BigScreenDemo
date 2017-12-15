const routers = [
    {
        path: '/',
        redirect: "/transport",
    },
    {
        path: '/index1',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./views/index1.vue'], resolve)
    },
    {
        path: '/index2',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./views/index2.vue'], resolve)
    },
    {
        path: '/transport',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./views/transport/index.vue'], resolve)
    }
];
export default routers;