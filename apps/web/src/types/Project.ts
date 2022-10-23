import Status from '../enums/Status';

import { Task } from './Task';

export type Project = {
  created_by: string,
  id: string,
  name: string,
  tasks: Task[],
  type: Status,
};
