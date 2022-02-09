import loadable from "@loadable/component";
import dynamicRoutesMap from "@/routes/dynamicRoutes";
const NotFound = loadable(() => import("@/views/404/NotFound"));
const Error = loadable(() => import("@/views/Error/Error"));
/***
 * 固定路由需要有固定的key
 * 生成的路由不需要，由数据库记录
 */
const defaultRoutes = [
  {
    path: "/",
    key: "index",
    to: "/dashboard",
  },
  {
    path: "/result/404",
    key:"/result/404",
    title: "页面不存在",
    component: NotFound,
  },
  {
    path: "/result/403",
    status: "403",
    errTitle: "403",
    key:"403",
    subTitle: "Sorry, you don't have access to this page.",
    component: Error,
  },
  {
    path: "/result/500",
    status: "500",
    errTitle: "500",
    key:"500",
    subTitle: "Sorry, the server is reporting an error.",
    component: Error,
  },
  {
    path: "*",
    key: "404",
    to:"/result/404"
  },
];
let list:any[] = dynamicRoutesMap.map((c:any) => ({ ...c, component: loadable(c.component) }));
list.push(...defaultRoutes);
export default list;
