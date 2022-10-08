import { Navigate } from 'react-router-dom';

import routes from '../constants/routes';
import { useAuth } from '../contexts/AuthProvider';
import Role from '../enums/Role';

import CustomLoader from './CustomLoader';

type Props = {
  children: JSX.Element,
  roles: Array<Role>
}

export default function ProtectedRoute(props: Props) {
  const { children, roles } = props;
  const {
    firebaseUserDetails,
    loadingFirebaseUserDetails,
    loadingUserDetails,
    userDetails
  } = useAuth();

  if (loadingFirebaseUserDetails) {
    return <CustomLoader />;
  }

  if (!firebaseUserDetails) {
    return <Navigate to={routes.LOGIN} />;
  }

  if (loadingUserDetails) {
    return <CustomLoader />;
  }

  if (!(userDetails)) {
    return <Navigate to={routes.FORBIDDEN_PAGE} />;
  }

  return children;
}
