import { ReactElement, useEffect } from 'react';
import { LOCAL_STORAGE_TOKEN } from './constants';
import { useAppDispatch, useAppSelector } from '../components/hooks/redux-hooks';
import { allUserActions } from '../store/users/users';
import { useNavigate } from 'react-router-dom';
import { DataStatus } from './enums';

type Props = {
    children: ReactElement
}

const CheckedRoute = ({ children }: Props): JSX.Element => {
  const localStorageToken = localStorage.getItem(LOCAL_STORAGE_TOKEN);
  const dispatch= useAppDispatch();
  const navigate = useNavigate();
  const authStatus = useAppSelector(state => state.users.status);
  
  useEffect(() => {
    if (localStorageToken) {
      dispatch(allUserActions.userAuth(localStorageToken));
    }
  }, [ localStorageToken, dispatch ]);

  useEffect(() => {
    if (authStatus === DataStatus.SUCCESS) {
      localStorage.setItem(LOCAL_STORAGE_TOKEN, localStorageToken as string);
      navigate('/');
    }
  }, [ authStatus, navigate ]);
  
  return  children;
};

export default CheckedRoute;
