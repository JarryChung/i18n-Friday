import { Context, Next } from "koa";
import { indexSvrc } from "../service";

class IndexCtrl {
  async demo(ctx: Context, next: Next) {
    await indexSvrc.demo(ctx);
  }
}

export const indexCtrl = new IndexCtrl();
