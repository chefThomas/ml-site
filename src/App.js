// import './App.css';
// import Toxicity from './components/Toxicity'

// function App() {

//   return (
//     <div className="App">
//       <Toxicity />
//     </div>
//   );
// }

// export default App;


import { AppShell, Navbar, Header } from '@mantine/core';
import Toxicity from './components/Toxicity'


function App() {
  return (
    <AppShell
      padding="md"
      navbar={<Navbar width={{ base: 300 }} height={500} p="xs">{/* Navbar content */}</Navbar>}
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