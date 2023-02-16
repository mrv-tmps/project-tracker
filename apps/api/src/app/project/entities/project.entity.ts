import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

import { User } from '../../user/entities/user.entity';

@Entity('project')
export class Project {
  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  deleted_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  is_active: boolean;

  @ManyToOne(() => User, (user) => user.projects_created)
  @JoinColumn({ name: 'user_id' })
  created_by: User;
}
