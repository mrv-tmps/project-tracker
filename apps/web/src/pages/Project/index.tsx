import { Group, Text } from '@mantine/core';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import CustomLoader from 'components/CustomLoader';
import { fetchProject } from 'services/ProjectService';

import { Project } from '../../types/Project';
import * as S from '../styles';

function ProjectPage() {
  const params = useParams();
  const [project, setProject] = useState<Project>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function getUserProjects() {
      setLoading(true);

      const currentProject = params['projectId'] && await fetchProject(params['projectId']);

      if (currentProject) {
        setProject(currentProject);
      }

      setLoading(false);
    }

    if (params['projectId']) {
      getUserProjects();
    }
  }, [params, project]);

  const renderLoading = loading && <CustomLoader />;

  return (
    <S.PageContainer>
      {renderLoading}
      <Group my={80} position="left">
        <Text align="center" size={42} weight={800}>{project?.name}</Text>
      </Group>
    </S.PageContainer>
  );
}

export default ProjectPage;
