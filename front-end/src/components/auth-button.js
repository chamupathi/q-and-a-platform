import React from 'react';
import Button from '@mui/material/Button';
import { useAuth0 } from '@auth0/auth0-react';

const AuthButton = () => {
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0();

  const handleSignout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
  };
  const handleAuth = () => {
    isAuthenticated ? handleSignout() : loginWithRedirect();
  };

  const buttonText = isAuthenticated ? 'Sign Out' : 'Sign In';

  return (
    <Button color="inherit" onClick={handleAuth}>
      {buttonText}
    </Button>
  );
};

export default AuthButton;
