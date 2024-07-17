import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { USER_TYPES } from '../../common/enums';
import { AsyncThunkConfig, SignInRequestBody, SignUpRequestBody, UserAuthResponse, UserSignInUpResponse } from '../../common/types';
import { ValueOf } from '../../services/constants';
import { DataStatus } from '../../common/enums';
import { LOCAL_STORAGE_TOKEN } from '../../common/constants';

const setStatus = createAction(
  USER_TYPES.SET_STATUS,
  (status: ValueOf<typeof DataStatus>) => {
    return {
      payload:status
    };
  }
);

const userSignIn =
    createAsyncThunk<UserSignInUpResponse, SignInRequestBody, AsyncThunkConfig>
    (USER_TYPES.SIGN_IN,
      async (payload: SignInRequestBody, { extra }) => {
        const { usersService } = extra;
        const signInResponse = await usersService.signIn(payload);
        localStorage.setItem(LOCAL_STORAGE_TOKEN, signInResponse.token);
        return signInResponse;
      });
      
const userSignUp =
    createAsyncThunk<UserSignInUpResponse, SignUpRequestBody, AsyncThunkConfig>
    (USER_TYPES.SIGN_UP,
      async (payload: SignUpRequestBody, { extra }) => {
        const { usersService } = extra;
        const signUpResponse = await usersService.signUp(payload);
        localStorage.setItem(LOCAL_STORAGE_TOKEN, signUpResponse.token);
        return signUpResponse;
      });


const userAuth = createAsyncThunk<UserAuthResponse, string, AsyncThunkConfig>
(USER_TYPES.AUTH,
  async ( token,{ extra }) => {
    const { usersService } = extra;
    const authResponse = await usersService.authUser(token);      
    return authResponse;
  });
  

export const userActions = {
  userSignIn,
  userSignUp,
  userAuth,
  setStatus
};