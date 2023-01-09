import AuthLayout from 'components/AuthLayout';

export function Login() {
  return (
    <AuthLayout
      subtitle={'Do not have an account yet?'}
      title={'Welcome!'}
      type={'login'}
    />
  );
}

export default Login;
