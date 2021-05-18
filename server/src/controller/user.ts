import { Context } from 'koa';
import { IUser } from '../entity/user';
import { response } from '../helper/response';
import { userSvrc } from '../service/user';

interface IAuthRequset {
  username: string;
  password: string;
}

class UserCtrl {
  async queryList(ctx: Context) {
    try {
      const result: IUser[] = await userSvrc.queryList();
      response.success(ctx, result);
    } catch (err) {
      response.error(ctx, err);
    }
  }

  async signup(ctx: Context) {
    try {
      const data = ctx.request.body;
      const result = await userSvrc.createOne(data);
      response.success(ctx, result);
    } catch (err) {
      response.error(ctx, err);
    }
  }

  async login(ctx: Context) {
    const { username, password }: IAuthRequset = ctx.request.body;
    const user = await userSvrc.queryOne(username);
    if (user?.password !== password) {
      response.error(ctx, {}, -1, '用户不存在或密码错误');
      return;
    }
    const { id, name } = user;
    response.success(ctx, { id, name, token: 'token123' });
  }
}

export const userCtrl = new UserCtrl();
