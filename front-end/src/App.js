import './App.css';
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from 'react'
import Dashboard from './pages/dashboard';
import Welome from './pages/welcome';
import { GlobalProvider } from './providers/global-provider';

function App() {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();


  useEffect(() => {
    const getUserMetadata = async () => {
      const domain = "q-and-a.uk.auth0.com";

      try {
        const accessToken = await getAccessTokenSilently({
          audience: `https://${domain}/api/v2/`,
          scope: "read:current_user",
          ignoreCache: true
        });

        console.log('accessToken', accessToken)
      } catch (e) {
        console.log(e.message);
      }
    };

    getUserMetadata();
  }, [getAccessTokenSilently, user?.sub]);

  if (!isAuthenticated) {
    return <Welome />
  }

  return <GlobalProvider>
    <Dashboard />
  </GlobalProvider>
}

export default App;
