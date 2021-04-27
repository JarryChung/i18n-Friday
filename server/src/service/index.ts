import { Context } from "koa";
import { response } from "../helper/response";

class IndexSvrc {
  async demo(ctx: Context) {
    response.success(ctx, { name: "Jarry Chung" });
  }
}

export const indexSvrc = new IndexSvrc();
