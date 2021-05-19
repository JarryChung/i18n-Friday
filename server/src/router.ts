import { Context, Next } from 'koa';
import Router from 'koa-router';
import { userCtrl } from './controller/user';

type TMethod = 'get' | 'put' | 'post' | 'delete';
interface IRoutes {
  path: string;
  method: TMethod;
  ctrl: (ctx: Context, next: Next) => Promise<void>;
}

const router: Router = new Router();
const routes: IRoutes[] = [
  { path: '/login', method: 'post', ctrl: userCtrl.login },
  { path: '/signup', method: 'post', ctrl: userCtrl.register },
  { path: '/users', method: 'get', ctrl: userCtrl.queryList },
];

export function route() {
  routes.forEach((route) => router[route.method](route.path, route.ctrl));
  return router.routes();
}
