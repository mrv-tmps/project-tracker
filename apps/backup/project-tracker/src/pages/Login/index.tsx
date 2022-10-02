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
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthProvider';

export function Login() {
  const { login } = useAuth();
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
      password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
    },
  });

  const handleLogin = async () => {
    try {
        await login(form.values.email, form.values.password);
        alert("You have successfully logged in!");
        navigate("/");
    } catch (err) {
        alert(err);
    }
  };
  
  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
      >
        Welcome!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Do not have an account yet?{' '}
        <Anchor<'a'> size="sm" onClick={() => navigate('/registration')}>
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(handleLogin)}>
          <TextInput
            required
            label="Email"
            placeholder="hello@mantine.dev"
            value={form.values['email']}
            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
            error={form.errors['email'] && 'Invalid email'}
          />
          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={form.values['password']}
            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
            error={form.errors['password'] && 'Password should include at least 6 characters'}
          />
          <Group position="apart" mt="md">
            <Checkbox label="Remember me" />
            <Anchor<'a'> onClick={(event) => event.preventDefault()} href="#" size="sm">
              Forgot password?
            </Anchor>
          </Group>
          <Button fullWidth mt="xl" type="submit">
            Sign in
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default Login
