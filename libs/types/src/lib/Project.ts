import Status from '../../../enums/Status';

type Project = {
  id: string,
  name: string,
  created_by: string,
  type: Status,
};

export default Project;
