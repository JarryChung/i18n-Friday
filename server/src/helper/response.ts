import { Context } from "koa";

interface IResponse {
  success(ctx: Context, data: object): void;
  error(ctx: Context, data: object, code?: number, message?: string): void;
}

export const response: IResponse = {
  success(ctx: Context, data: object) {
    ctx.body = {
      code: 0,
      message: "Ok",
      data,
    };
  },

  error(ctx: Context, data: object, code?: number, message?: string) {
    ctx.body = {
      code: code || -1,
      message: message || "Error",
      data,
    };
  },
};
