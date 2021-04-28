import { Context, Next } from "koa";
import Router from "koa-router";
import { indexCtrl } from "./controller";

type TMethod = "get" | "put" | "post" | "delete";
interface IRoutes {
  path: string;
  method: TMethod;
  ctrl: (ctx: Context, next: Next) => Promise<void>;
}

const router: Router = new Router();
const routes: IRoutes[] = [
  { path: "/index", method: "get", ctrl: indexCtrl.query },
  { path: "/index", method: "post", ctrl: indexCtrl.create },
];

export function route() {
  routes.forEach((route) => router[route.method](route.path, route.ctrl));
  return router.routes();
}
