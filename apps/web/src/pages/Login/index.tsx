import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons';
import { useNavigate } from 'react-router-dom';

import { MINIMUM_PASSWORD_LENGTH } from '../../constants/Password';
import routes from '../../constants/routes';
import { useAuth } from '../../contexts/AuthProvider';

import { signInWithEmailPassword } from '../../utils/Firebase';

import * as S from '../styles';

export function Login() {
  const { userDetails } = useAuth();
  const navigate = useNavigate();
  const form = useForm({
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
      const user = await signInWithEmailPassword(form.values.email, form.values.password);

      if (user) {
        showNotification({
          color: 'teal',
          icon: <IconCheck />,
          message: 'You have successfully logged in!',
          title: 'Success',
        });
        navigate('/');
      }
    } catch(err) {
      showNotification({
        color: 'red',
        icon: <IconX />,
        message: 'Wrong password',
        title: 'Error',
      });
    }
  };

  if (userDetails) {
    navigate(routes.HOME);
  }

  return (
    <S.PageContainer>
      <Container py={150} size={420}>
        <Title
          align="center"
          sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
        >
        Welcome!
        </Title>
        <Text align="center" color="dimmed" mt={5} size="sm">
        Do not have an account yet?{' '}
          <Anchor<'a'> size="sm" onClick={() => navigate('/registration')}>
          Create account
          </Anchor>
        </Text>
        <Paper withBorder mt={30} p={30} radius="md" shadow="md">
          <form onSubmit={form.onSubmit(handleLogin)}>
            <TextInput
              required
              error={form.errors['email'] && 'Invalid email'}
              label="Email"
              placeholder="hello@mantine.dev"
              value={form.values['email']}
              onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
            />
            <PasswordInput
              required
              error={form.errors['password'] && 'Password should include at least 6 characters'}
              label="Password"
              placeholder="Your password"
              value={form.values['password']}
              onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
            />
            <Group mt="md" position="apart">
              <Checkbox label="Remember me" />
              <Anchor<'a'> href="#" size="sm" onClick={(event) => event.preventDefault()}>
              Forgot password?
              </Anchor>
            </Group>
            <Button fullWidth mt="xl" type="submit">
            Sign in
            </Button>
          </form>
        </Paper>
      </Container>
    </S.PageContainer>
  );
}

export default Login;
