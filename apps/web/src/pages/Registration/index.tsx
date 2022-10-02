import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Button,
  Notification,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconCheck } from '@tabler/icons';
import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { MINIMUM_PASSWORD_LENGTH } from '../../constants/Password';

import { registerWithEmailAndPassword } from '../../utils/Firebase';

function Registration() {
  const navigate = useNavigate();
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
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

  const renderAlert = isRegistered &&
  <Notification color="teal" icon={<IconCheck size={18} />} title="Success">
    You have successfully signed up!
  </Notification>;

  const handleRegister = async () => {
    await registerWithEmailAndPassword(form.values.email, form.values.password);
    setIsRegistered(true);
    navigate('/login');
  };

  return (
    <Container my={40} size={420}>
      {renderAlert}
      <Title
        align="center"
        sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
      >
        Create Account
      </Title>
      <Text align="center" color="dimmed" mt={5} size="sm">
        Already have an account?{' '}
        <Anchor<'a'> size="sm" onClick={() => navigate('/login')}>
          Sign in
        </Anchor>
      </Text>

      <Paper withBorder mt={30} p={30} radius="md" shadow="md">
        <form onSubmit={form.onSubmit(handleRegister)}>
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
          <Button fullWidth mt="xl" type="submit">
            Sign up
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default Registration;
