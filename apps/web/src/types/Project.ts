import Status from '../enums/Status';

export type Project = {
  id: string,
  name: string,
  created_by: string,
  type: Status,
};
