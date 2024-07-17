import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { LOCAL_STORAGE_TOKEN } from './constants';

type Props = {
    children: ReactElement,
}

const ProtectedRoute = ({ children }: Props): JSX.Element => {
  const localStorageToken = localStorage.getItem(LOCAL_STORAGE_TOKEN);
  if (!localStorageToken) {
    return <Navigate to="/sign-in" />;
  }
  
  return children;
};

export default ProtectedRoute;
