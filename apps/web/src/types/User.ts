
import { User as FirebaseUserDetails} from 'firebase/auth';

export type User = {
  displayName: string | null,
  email: string | null,
  uid: string,
}

export type UserContextType = {
  firebaseUserDetails?: FirebaseUserDetails | null;
  loadingFirebaseUserDetails: boolean;
  loadingUserDetails: boolean;
  userDetails: User | null;
  setUserDetails: (params: User) => void;
}
