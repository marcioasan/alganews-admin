//13.6. Configurando o Redux no Projeto

import { configureStore } from '@reduxjs/toolkit';
import UserReducer from './User.reducer';

export const store = configureStore({
  reducer: {
    user: UserReducer, //14.6. Usuários no Redux
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
