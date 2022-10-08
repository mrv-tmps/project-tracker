const HOME = '/';
const LOGIN = '/login';
const REGISTER = '/register';
const FORBIDDEN_PAGE = '/error';

export const NAMED_ROUTES = [
  { name: 'Home', path: HOME },
  { name: 'Login', path: LOGIN },
  { name: 'Register', path: REGISTER },
  { name: 'Error', path: FORBIDDEN_PAGE },
];

export default {
  FORBIDDEN_PAGE,
  HOME,
  LOGIN,
  REGISTER
};
