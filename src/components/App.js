import UsersList from "./UsersList";
import { createUseStyles } from 'react-jss';
import { theming } from '@mantine/core';

const useStyles = createUseStyles(
  (theme) => ({
    '@global': {
      body: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
      },
    },
  }),
  { theming }
);

function App() {
  useStyles();
  return <UsersList />;
}

export default App;
