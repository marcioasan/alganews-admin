//14.6. Usuários no Redux
import {
  createAsyncThunk,
  createReducer,
  isFulfilled,
  isPending,
  isRejected,
} from '@reduxjs/toolkit';
import { User, UserService } from 'marcioasan-sdk';

interface UserState {
  list: User.Summary[];
  fetching: boolean;
}

const initialState: UserState = {
  fetching: false,
  list: [],
};

export const getAllUsers = createAsyncThunk('user/getAllUsers', async () =>
  UserService.getAllUsers()
);

//14.7. Alterando o status do usuário no Redux, 14.9. Remapeando dados locais ao disparar uma action 4'
export const toggleUserStatus = createAsyncThunk(
  'user/toggleUserStatus',
  async (user: User.Summary | User.Datailed) => {
    user.active
      ? await UserService.deactivateExistingUser(user.id)
      : await UserService.activateExistingUser(user.id);

    return user;
  }
);

export default createReducer(initialState, (builder) => {
  const success = isFulfilled(getAllUsers, toggleUserStatus);
  const error = isRejected(getAllUsers, toggleUserStatus);
  const loading = isPending(getAllUsers, toggleUserStatus);

  builder
    .addCase(getAllUsers.fulfilled, (state, action) => {
      state.list = action.payload;
    })
    //14.9. Remapeando dados locais ao disparar uma action - *** na aula 14.9 mostra configuração do docker-compose.yml na propriedade ALGANEWS_SECURITY_DEFAULT_USER_ID_IF_DISABLED
    /*
    .addCase(toggleUserStatus.fulfilled, (state, action) => {
      state.list = state.list.map((user) => {
        if (user.id === action.payload.id) return { ...user, active: !user.active };
        return user;
      });
    })
    */
    .addMatcher(success, (state) => {
      state.fetching = false;
    })
    .addMatcher(error, (state) => {
      state.fetching = false;
    })
    .addMatcher(loading, (state) => {
      state.fetching = true;
    });
});
