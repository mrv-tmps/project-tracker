import { createStyles, Title, Text, Button, Container, Group } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

import routes from '../../constants/routes';

const useStyles = createStyles((theme) => ({
  description: {
    color: theme.colors[theme.primaryColor][1],
    margin: 'auto',
    marginBottom: theme.spacing.xl,
    marginTop: theme.spacing.xl,
    maxWidth: 540,
  },

  label: {
    color: theme.colors[theme.primaryColor][3],
    fontSize: 220,
    fontWeight: 900,
    lineHeight: 1,
    marginBottom: theme.spacing.xl,
    textAlign: 'center',

    [theme.fn.smallerThan('sm')]: {
      fontSize: 120,
    },
  },

  root: {
    backgroundColor: theme.fn.variant({ color: theme.primaryColor, variant: 'filled' }).background,
    paddingBottom: 120,
    paddingTop: 80,
  },

  title: {
    color: theme.white,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 38,
    fontWeight: 900,
    textAlign: 'center',

    [theme.fn.smallerThan('sm')]: {
      fontSize: 32,
    },
  },

}));

export default function ErrorPage() {
  const { classes } = useStyles();
  const navigate = useNavigate();

  function handleRefresh() {
    navigate(routes.HOME);
  }

  return (
    <div className={classes.root}>
      <Container>
        <div className={classes.label}>500</div>
        <Title className={classes.title}>Something bad just happened...</Title>
        <Text align="center" className={classes.description} size="lg">
          Our servers could not handle your request. Don&apos;t worry, our development team was
          already notified. Try refreshing the page.
        </Text>
        <Group position="center">
          <Button size="md" variant="white" onClick={handleRefresh}>
            Refresh the page
          </Button>
        </Group>
      </Container>
    </div>
  );
}
