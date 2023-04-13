import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity('comment')
export class Comment {
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
  commenter_user_id: string;

  @Column('uuid')
  task_id: string;
}
