import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import reportWebVitals from './reportWebVitals';
import { store } from './core/store';
import DefaultLayout from './app/layouts/Default';
import Routes from './app/routes';

import './index.less';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* 13.25. Acessando as rotas pelo menu lateral - 2' */}
      <BrowserRouter>
        <DefaultLayout>
          <Routes /> {/* 13.23. Criando a primeira rota - 2'50" */}
        </DefaultLayout>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
