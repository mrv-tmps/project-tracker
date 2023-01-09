import AuthLayout from 'components/AuthLayout';

function Registration() {
  return (
    <AuthLayout
      subtitle={'Already have an account?'}
      title={'Create Account'}
      type={'register'}
    />
  );
}

export default Registration;
