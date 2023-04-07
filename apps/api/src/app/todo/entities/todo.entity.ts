import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity('todo')
export class ToDo {
  @CreateDateColumn({ nullable: true, type: 'timestamptz' })
  created_at: Date;

  @DeleteDateColumn({ nullable: true, type: 'timestamptz' })
  deleted_at: Date;

  @UpdateDateColumn({ nullable: true, type: 'timestamptz' })
  updated_at: Date;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column()
  is_done: boolean;

  @Column('uuid')
  task_id: string;
}
