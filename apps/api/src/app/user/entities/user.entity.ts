import { Role } from '@project-tracker/enums';

import { CreateDateColumn, Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn, DeleteDateColumn, OneToMany } from 'typeorm';

import { Project } from '../../project/entities/project.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  firebase_id?: string;

  @Column({
    enum: Role,
    type: 'enum',
  })
  role: Role;

  @OneToMany(() => Project, (project) => project.created_by)
  projects_created: Project[];

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  deleted_at: Date;
}
