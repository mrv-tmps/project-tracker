import TaskStatus from 'enums/TaskStatus';

export type Task = {
  assignee_id: string,
  created_by: string,
  description: string,
  due_date?: Date | string,
  id: string,
  name: string,
  project_id: string,
  status: TaskStatus,
};
