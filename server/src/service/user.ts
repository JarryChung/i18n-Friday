import { getManager } from 'typeorm';
import { User, IUser } from '../entity/user';

class UserSvrc {
  async queryList() {
    const userRepo = getManager().getRepository(User);
    const users: IUser[] = await userRepo
      .createQueryBuilder('user')
      .select(['user.id', 'user.name', 'user.email', 'user.avatar'])
      .getMany();
    return users;
  }

  async queryOne(username: string) {
    const userRepo = getManager().getRepository(User);
    const user: IUser = (await userRepo.findOne({ name: username })) as IUser;
    return user;
  }

  async createOne(data: IUser) {
    const userRepo = getManager().getRepository(User);
    const newUser = userRepo.create(data);
    await userRepo.save(newUser);
    return newUser;
  }
}

export const userSvrc = new UserSvrc();
