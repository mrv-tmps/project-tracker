import { useParams } from 'react-router-dom';

function Project() {
  const params = useParams();

  return (
    <div>This is the project page for id: {params['projectId']}</div>
  );
}

export default Project;
