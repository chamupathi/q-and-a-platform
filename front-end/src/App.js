import logo from './logo.svg';
import './App.css';
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from 'react'

function App() {
  const { loginWithRedirect, user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

  // const token =  getAccessTokenSilently();
  // const { user, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    const getUserMetadata = async () => {
      const domain = "q-and-a.uk.auth0.com";

      try {
        console.log('getting token', user)
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

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        <div>{user?.name}</div>



        <button onClick={() => loginWithRedirect()}>Log In</button>
      </header>
    </div>
  );
}

export default App;
