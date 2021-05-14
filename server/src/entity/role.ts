import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export interface IRole {
  id?: number;
  type?: 0 | 1;
  name: string;
  createdTime?: number;
  updatedTime?: number;
  creator: number;
  updater: number;
}

@Entity()
export class Role implements IRole {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ default: 0 })
  type!: 0 | 1;

  @Column()
  name!: string;

  @Column({ default: new Date().getTime() })
  createdTime!: number;

  @Column({ default: new Date().getTime() })
  updatedTime!: number;

  @Column()
  creator!: number;

  @Column()
  updater!: number;
}
