import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export interface IUser {
  id?: number;
  name: string;
  email: string;
  avatar?: string;
  password?: string;
  createdTime?: number;
}

@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column({ default: '' })
  avatar!: string;

  @Column()
  password!: string;

  @Column({ default: new Date().getTime() })
  createdTime!: number;
}
