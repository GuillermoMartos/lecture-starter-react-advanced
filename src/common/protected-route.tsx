import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

type Props = {
    children: ReactElement,
    isUserLogged: boolean
}

const ProtectedRoute = ({ isUserLogged, children }:Props):JSX.Element => {
  if (!isUserLogged) {
    return <Navigate to="/sign-in" />;
  }
  
  return children;
};

export default ProtectedRoute;
