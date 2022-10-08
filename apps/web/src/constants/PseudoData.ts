import Status from '../enums/Status';
import { Project } from '../types/Project';

export const projects: Project[] = [
  {
    created_by: 'Merv',
    id: '1',
    name: 'Project Tracker',
    type: Status.ACTIVE,
  },
  {
    created_by: 'Ferlie',
    id: '2',
    name: 'Empath',
    type: Status.ACTIVE,
  },
  {
    created_by: 'Ezra',
    id: '3',
    name: 'Enhance CRM',
    type: Status.ACTIVE,
  },
  {
    created_by: 'Raven',
    id: '4',
    name: 'Symph OS V2',
    type: Status.INACTIVE,
  },
];
