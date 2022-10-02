import { ReactNode, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import { User, UserContextType } from '../types/User';
import { createGenericContext } from '../utils/Context';
import { auth } from '../utils/Firebase';
interface Props {
  children: ReactNode;
}

const [useAuth, AuthContextProvider] = createGenericContext<UserContextType>();

const AuthProvider = (props: Props) => {
  const [firebaseUserDetails, loadingFirebaseUserDetails] = useAuthState(auth);
  const [userDetails, setUserDetails] = useState<User | null>(null);
  const [loadingUserDetails, setLoadingUserDetails] = useState<boolean>(true);

  useEffect(() => {
    if (loadingFirebaseUserDetails) {
      return;
    }

    async function getUserProfileDetails() {
      setLoadingUserDetails(true);

      if (firebaseUserDetails) {
        setUserDetails({
          displayName: firebaseUserDetails.displayName,
          email: firebaseUserDetails.email,
          uid: firebaseUserDetails.uid,
        });
        /*
         * const userApi = ApiClient.use(UserApi);
         * try {
         *   const { data } = await userApi.userControllerGetProfileDetailsByFirebaseId(firebaseUserDetails.uid);
         * } catch (error) {
         *   alert('An error occurred while getting your account details. Please reload the page to try again.');
         * }
         */
      } else {
        setUserDetails(null);
      }

      setLoadingUserDetails(false);
    }

    getUserProfileDetails();
  }, [firebaseUserDetails, loadingFirebaseUserDetails]);

  function getValues(): UserContextType {
    return {
      firebaseUserDetails,
      loadingFirebaseUserDetails,
      loadingUserDetails,
      setUserDetails,
      userDetails
    };
  }

  return (
    <AuthContextProvider value={getValues()}>
      {props.children}
    </AuthContextProvider>
  );
};

export { AuthProvider, useAuth };
