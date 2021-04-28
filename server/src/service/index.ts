import { Context } from "koa";
import { getManager } from "typeorm";
import { User, IUser } from "../entity/user";

class IndexSvrc {
  async query() {
    const userRepo = getManager().getRepository(User);
    const users: IUser[] = await userRepo.find();
    return users;
  }

  async create(data: IUser) {
    const userRepo = getManager().getRepository(User);
    const newUser = userRepo.create(data);
    await userRepo.save(newUser);
    return newUser;
  }
}

export const indexSvrc = new IndexSvrc();
