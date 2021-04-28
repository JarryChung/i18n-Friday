import { Context } from "koa";
import { response } from "../helper/response";
import { indexSvrc } from "../service";

class IndexCtrl {
  async query(ctx: Context) {
    try {
      const result = await indexSvrc.query();
      response.success(ctx, result);
    } catch (err) {
      response.error(ctx, err);
    }
  }

  async create(ctx: Context) {
    try {
      const data = ctx.request.body;
      const result = await indexSvrc.create(data);
      response.success(ctx, result);
    } catch (err) {
      response.error(ctx, err);
    }
  }
}

export const indexCtrl = new IndexCtrl();
