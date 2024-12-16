import './App.css';
import { useAuth0 } from '@auth0/auth0-react';
import Dashboard from './pages/dashboard';
import Welome from './pages/welcome';
import { GlobalProvider } from './providers/global-provider';
import useDebouncedValue from './hooks/useDebouncedValue';

function App() {
  const { isAuthenticated } = useAuth0();
  // To give auth0 to setup auth from theie end, wait a bit
  const debouncedIsAuthenticated = useDebouncedValue(isAuthenticated, 1000);

  if (!debouncedIsAuthenticated) {
    return <Welome hideSubTitle={isAuthenticated} />;
  }

  return (
    <GlobalProvider>
      <Dashboard />
    </GlobalProvider>
  );
}

export default App;
