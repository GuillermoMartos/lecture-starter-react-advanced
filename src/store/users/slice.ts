import { createSlice } from '@reduxjs/toolkit';
import { DataStatus } from '../../common/enums';
import { ValueOf } from '../../services/constants';
import { USER_TYPES } from '../../common/enums';
import { userActions } from './actions';
import { LOCAL_STORAGE_TOKEN } from '../../common/constants';

type UsersState = {
    status: ValueOf<typeof DataStatus>,
  token: string | null
    username:  string | null
}

const initialUserState: UsersState = {
  status: DataStatus.IDLE,
  token: null,
  username: null
};

const { reducer, actions } = createSlice(
  {
    name: USER_TYPES.USER_REDUCER_NAME,
    initialState: initialUserState,
    reducers: {},
    extraReducers(builder) {
      builder.addCase(userActions.setStatus, (state, action) => {
        state.status= action.payload;
      });

      builder.addCase(userActions.userSignIn.pending, (state) => {
        state.status= DataStatus.PENDING;
      });
      builder.addCase(userActions.userSignIn.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.username= action.payload.user.fullName;
        localStorage.setItem(LOCAL_STORAGE_TOKEN, action.payload.token);
        state.status = DataStatus.SUCCESS;
      });
      builder.addCase(userActions.userSignIn.rejected, (state) => {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN);
        state.status= DataStatus.ERROR;
      });

      builder.addCase(userActions.userSignUp.pending, (state) => {
        state.status= DataStatus.PENDING;
      });
      builder.addCase(userActions.userSignUp.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.username= action.payload.user.fullName;
        localStorage.setItem(LOCAL_STORAGE_TOKEN, action.payload.token);
        state.status= DataStatus.SUCCESS;
      });
      builder.addCase(userActions.userSignUp.rejected, (state) => {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN);
        state.status= DataStatus.ERROR;
      });

      builder.addCase(userActions.userAuth.pending, (state) => {
        state.status= DataStatus.PENDING;
      });
      builder.addCase(userActions.userAuth.fulfilled, (state, action) => {
        state.username= action.payload.fullName;
        state.status= DataStatus.SUCCESS;
      });
      builder.addCase(userActions.userAuth.rejected, (state) => {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN);
        state.status= DataStatus.ERROR;
      });
    },
  }
);

export { actions as userReducerActions, reducer as userReducer };

