import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export interface IUser {
  id?: number;
  name: string;
  email: string;
  password?: string;
}

@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;
}
