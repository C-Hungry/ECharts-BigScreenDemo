const routers = [
    {
        path: '/',
        redirect: "/login",
    },
    {
        path: '/login',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./views/login.vue'], resolve)
    },
    {
        path: '/authorization',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./views/authorization.vue'], resolve)
    },
    {
        path: '/',
        component: (resolve) => require(['./views/index.vue'], resolve),
        children:[
            {
                path: '/transport',
                component: (resolve) => require(['./views/transport/index.vue'], resolve)
            }
        ]
    },
];
export default routers;