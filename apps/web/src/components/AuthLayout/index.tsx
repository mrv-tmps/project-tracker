import {
  Container,
  Text,
  Title,
  Anchor,
  Paper,
  TextInput,
  PasswordInput,
  Group,
  Checkbox,
  Button
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons';

import { useNavigate } from 'react-router-dom';

import { MINIMUM_PASSWORD_LENGTH } from 'constants/Password';
import routes from 'constants/routes';
import { useAuth } from 'contexts/AuthProvider';

import { createUser } from 'services/UserService';
import { registerWithEmailAndPassword, signInWithEmailPassword } from 'utils/Firebase';

import * as S from './styles';

type Props = {
  subtitle: string;
  title: string;
  type: string;
}

export default function AuthLayout(props: Props) {
  const { subtitle, title, type } = props;
  const navigate = useNavigate();

  const anchor = type === 'login' ? ' Create account' : ' Sign in';
  const navigateToRoute = type === 'login' ? '/registration' : '/login';
  const submitButtonName = type === 'login' ? 'Sign in' : 'Sign up';

  const { userDetails } = useAuth();
  const formReturnType = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length <= MINIMUM_PASSWORD_LENGTH ? 'Password should include at least 6 characters' : null),
    },
  });

  const handleLogin = async () => {
    try {
      const user = await signInWithEmailPassword(formReturnType.values.email, formReturnType.values.password);

      if (user) {
        showNotification({
          color: 'teal',
          icon: <IconCheck />,
          message: 'You have successfully logged in!',
          title: 'Success',
        });
        navigate('/');
      }
    } catch (err) {
      showNotification({
        color: 'red',
        icon: <IconX />,
        message: 'Wrong password',
        title: 'Error',
      });
    }
  };

  const handleRegister = async () => {
    try {
      const user = await registerWithEmailAndPassword(formReturnType.values.email, formReturnType.values.password);

      if (user) {
        showNotification({
          color: 'teal',
          icon: <IconCheck />,
          message: 'You have successfully signed up!',
          title: 'Success',
        });
        const saveUserSupabase = await createUser({
          email: user.email ?? '',
          firebase_id: user.uid,
          first_name: user.displayName ?? '',
          last_name: user.displayName ?? '',
        });

        console.log(saveUserSupabase);

        if (saveUserSupabase) {
          navigate('/login');
        }
      }
    } catch (err) {
      showNotification({
        color: 'red',
        icon: <IconX />,
        message: 'Registration failed',
        title: 'Error',
      });
    }
  };

  const handleForm = () => {
    if (type === 'login') {
      handleLogin();
    } else {
      handleRegister();
    }
  };

  if (userDetails) {
    navigate(routes.HOME);
  }

  const renderSignInButtons = type === 'login' && (
    <Group mt="md" position="apart">
      <Checkbox label="Remember me" />
      <Anchor<'a'> href="#" size="sm" onClick={(event) => event.preventDefault()}>
        Forgot password?
      </Anchor>
    </Group>
  );

  return (
    <S.PageContainer>
      <Container py={150} size={420}>
        <S.LogoContainer>
          <img alt="logo" src="assets/Logo.svg" />
        </S.LogoContainer>
        <Title
          align="center"
          sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
        >
          {title}
        </Title>
        <Text align="center" color="dimmed" mt={5} size="sm">
          {subtitle}
          <Anchor<'a'> size="sm" onClick={() => navigate(navigateToRoute)}>
            {anchor}
          </Anchor>
        </Text>
        <Paper p={25}>
          <form onSubmit={formReturnType.onSubmit(handleForm)}>
            <TextInput
              required
              error={formReturnType.errors['email'] && 'Invalid email'}
              label="Email"
              mb={5}
              placeholder="hello@mantine.dev"
              value={formReturnType.values['email']}
              onChange={(event) => formReturnType.setFieldValue('email', event.currentTarget.value)}
            />
            <PasswordInput
              required
              error={formReturnType.errors['password'] && 'Password should include at least 6 characters'}
              label="Password"
              placeholder="Your password"
              value={formReturnType.values['password']}
              onChange={(event) => formReturnType.setFieldValue('password', event.currentTarget.value)}
            />
            {renderSignInButtons}
            <Button fullWidth mt="xl" type="submit">
              {submitButtonName}
            </Button>
          </form>
        </Paper>
      </Container>
    </S.PageContainer >
  );
}
