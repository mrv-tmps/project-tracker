import { Task } from './Task';

export interface Project {
  created_by: string,
  id: string,
  name: string,
  task: Task[],
  is_active: boolean,
}
