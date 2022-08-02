import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Login from './pages/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
  <Routes>
      <Route path='/' element={<App />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
  </Routes>
    {/* <App /> */}
  </BrowserRouter>
);
