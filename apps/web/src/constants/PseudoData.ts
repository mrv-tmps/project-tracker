import TaskStatus from 'enums/TaskStatus';

import Status from '../enums/Status';
import { Project } from '../types/Project';

export const projects: Project[] = [
  {
    created_by: 'Merv',
    id: '1',
    name: 'Project Tracker',
    tasks: [
      {
        assignee_user_id: 'Merv Tampus',
        created_by: 'Merv',
        description: 'Create Project Page',
        due_date: '2022-10-23T13:42:18.631208Z',
        id: '1',
        name: 'Project Page FE',
        project_id: '1',
        status: TaskStatus.IN_PROGRESS,
      },
    ],
    type: Status.ACTIVE,
  },
  {
    created_by: 'Ferlie',
    id: '2',
    name: 'Empath',
    tasks: [
      {
        assignee_user_id: 'Merv Tampus',
        created_by: 'Merv',
        description: 'Create Empath Consent Form',
        due_date: '2022-10-23T13:42:18.631208Z',
        id: '1',
        name: 'Consent Form FE',
        project_id: '2',
        status: TaskStatus.DONE,
      },
      {
        assignee_user_id: 'Merv Tampus',
        created_by: 'Merv',
        description: 'Create Empath Consent Form',
        id: '2',
        name: 'Consent Form BE',
        project_id: '2',
        status: TaskStatus.DONE,
      },
    ],
    type: Status.ACTIVE,
  },
  {
    created_by: 'Ezra',
    id: '3',
    name: 'Enhance CRM',
    tasks: [
      {
        assignee_user_id: 'Merv Tampus',
        created_by: 'Merv',
        description: 'Add sidebar sub items',
        due_date: '2022-10-23T13:42:18.631208Z',
        id: '1',
        name: 'Side Bar Sub Items FE',
        project_id: '3',
        status: TaskStatus.TO_DO,
      },
      {
        assignee_user_id: 'Merv Tampus',
        created_by: 'Merv',
        description: 'Add search button',
        due_date: '2022-10-23T13:42:18.631208Z',
        id: '2',
        name: 'Event Participants Search Button',
        project_id: '3',
        status: TaskStatus.TO_DO,
      },
      {
        assignee_user_id: 'Merv Tampus',
        created_by: 'Merv',
        description: 'Add event participants list',
        due_date: '2022-10-23T13:42:18.631208Z',
        id: '3',
        name: 'Event Participants List FE',
        project_id: '3',
        status: TaskStatus.TO_DO,
      },
    ],
    type: Status.ACTIVE,
  },
  {
    created_by: 'Raven',
    id: '4',
    name: 'Symph OS V2',
    tasks: [
      {
        assignee_user_id: 'Merv Tampus',
        created_by: 'Merv',
        description: 'Add Project Logo Component Backend',
        id: '1',
        name: 'Project Logo BE',
        project_id: '4',
        status: TaskStatus.TO_DO,
      },
    ],
    type: Status.INACTIVE,
  },
];
