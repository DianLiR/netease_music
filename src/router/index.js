import Vue from "vue";
import VueRouter from "vue-router";

import Recommend from "../views/Recommend.vue";
import Hot from "../views/Hot.vue";
import Search from "../views/Search.vue";
import PlayList from "../views/PlayList.vue";

Vue.use(VueRouter);

// const routes = [
// 	{ path: "/", redirect: "/home" },
// 	{
// 		path: "/home",
// 		name: "Home",
// 		component: () => {
// 			"../views/Home.vue";
// 		},
// 		children: [
// 			{
// 				path: "/",
// 				name: "Recommend",
// 				component: () => {
// 					("../views/Recommend");
// 				},
// 			},
// 			{
// 				path: "search",
// 				name: "Search",
// 				component: () => {
// 					"../views/Search";
// 				},
// 			},
// 		],
// 	},
// 	{
// 		path: "/playList",
// 		name: "Playlist",
// 		component: () => {
// 			"../views/PlayList";
// 		},
// 	},
// ];
const routes = [
  {
    path: "/",
    name: "Recommend",
    component: Recommend,
    meta: { isShowNav: true },
  },
  {
    path: "/hot",
    name: "Hot",
    component: Hot,
    meta: { isShowNav: true },
  },
  {
    path: "/search",
    name: "Search",
    component: Search,

    meta: { isShowNav: true },
  },
  {
    path: "/playList",
    name: "PlayList",
    component: PlayList,
  },
];
const router = new VueRouter({
  routes,
});

export default router;
