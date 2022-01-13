import loadable from "@loadable/component";
import dynamicRoutesMap from "./dynamicRoutes";
const NotFound = loadable(() => import("@/views/404/NotFound"));
const Error = loadable(() => import("@/views/Error/Error"));
const defaultRoutes = [
  {
    path: "/",
    key: "index",
    to: "/dashboard",
  },
  {
    path: "/result/404",
    title: "页面不存在",
    components: NotFound,
  },
  {
    path: "/result/403",
    status: "403",
    errTitle: "403",
    subTitle: "Sorry, you don't have access to this page.",
    components: Error,
  },
  {
    path: "/result/500",
    status: "500",
    errTitle: "500",
    subTitle: "Sorry, the server is reporting an error.",
    components: Error,
  },
  {
    path: "*",
    key: "404",
    to:"/result/404"
  },
];
const list:any[] = dynamicRoutesMap.map((c) => ({ ...c, components: loadable(c.component) }));

list.push(...defaultRoutes);

export default list;
