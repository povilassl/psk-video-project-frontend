import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { UserProvider } from "./components/LoginPage/UserContext";
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserProvider>
    <App />
  </UserProvider>
);
