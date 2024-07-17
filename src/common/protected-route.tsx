import { ReactElement, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { LOCAL_STORAGE_TOKEN } from './constants';
import { useAppDispatch } from '../components/hooks/redux-hooks';
import { allUserActions } from '../store/users/users';

type Props = {
    children: ReactElement,
}

const ProtectedRoute = ({ children }: Props): JSX.Element => {
  const dispatch= useAppDispatch();
  const localStorageToken = localStorage.getItem(LOCAL_STORAGE_TOKEN);

  useEffect(() => {
    if (localStorageToken) {
      dispatch(allUserActions.userAuth(localStorageToken));
    }
  }, [ localStorageToken, dispatch ]);
  
  if (!localStorageToken) {
    return <Navigate to="/sign-in" />;
  }
  
  return children;
};

export default ProtectedRoute;
