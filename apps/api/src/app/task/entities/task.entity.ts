import TaskStatus from 'libs/enums/src/lib/Status';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity('task')
export class Task {
  @CreateDateColumn({ nullable: true, type: 'timestamptz' })
  created_at: Date;

  @DeleteDateColumn({ nullable: true, type: 'timestamptz' })
  deleted_at: Date;

  @UpdateDateColumn({ nullable: true, type: 'timestamptz' })
  updated_at: Date;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  due_date: Date;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;

  @Column()
  assignee_id: string;

  @Column()
  created_by: string;

  @Column('uuid')
  project_id: string;
}
