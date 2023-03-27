import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import todoReducer from './reducer/Todo';
import memoReducer from './reducer/Memo';
import {createStore, combineReducers} from 'redux';
import { Provider } from 'react-redux';

const rootReducer = combineReducers({
  todoReducer,
  memoReducer
})

const store = createStore(rootReducer); // 취소선 코드에 아무 영향도 x

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
