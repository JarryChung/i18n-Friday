import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export interface IUser {
  id?: number;
  name: string;
  likes?: number;
}

@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ default: 0 })
  likes!: number;
}
