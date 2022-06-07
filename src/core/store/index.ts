//13.6. Configurando o Redux no Projeto

import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
