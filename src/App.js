import { AppShell, Navbar, Header, Stack } from '@mantine/core';

import Toxicity from './components/toxicity/Toxicity'
import NavButton from './components/NavButton'

function NavButtons() {
  const buttons = [ { text: 'Language-based Classifier', subText: 'TensorFlow.js Toxicity', page: 'toxicity' } ]
  return (
    <Stack cols={1}>
      {buttons.map( props => <NavButton {...props} /> )}
    </Stack>
  )
}


function App() {
  return (
    <AppShell
      padding="md"
      navbar={<Navbar width={{ base: 300 }} height={500} p="xs">{<NavButtons />}</Navbar>}
      header={<Header height={60} p="xs">{/* Header content */}</Header>}
      styles={( theme ) => ( {
        main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[ 8 ] : theme.colors.gray[ 0 ] },
      } )}
    >
      <Toxicity />
    </AppShell>
  );
}


export default App