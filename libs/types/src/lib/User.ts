
import { User as FirebaseUserDetails} from 'firebase/auth';

type User = {
  displayName: string | null,
  email: string | null,
  uid: string,
}

type UserContextType = {
  firebaseUserDetails?: FirebaseUserDetails | null;
  loadingFirebaseUserDetails: boolean;
  loadingUserDetails: boolean;
  userDetails: User | null;
  setUserDetails: (params: User) => void;
}

export {
  User,
  UserContextType
};
