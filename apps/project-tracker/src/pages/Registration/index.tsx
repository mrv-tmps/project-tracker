import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Button,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';

function Registration() {
  const navigate = useNavigate();

  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
      >
        Create Account
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Already have an account?{' '}
        <Anchor<'a'> size="sm" onClick={() => navigate('/login')}>
          Sign in
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput label="Email" placeholder="you@mantine.dev" required />
        <PasswordInput label="Password" placeholder="Your password" required mt="md" />
        <PasswordInput label="Confirm Password" placeholder="Your password" required mt="md" />
        <Button fullWidth mt="xl">
          Sign up
        </Button>
      </Paper>
    </Container>
  );
}

export default Registration