import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Login from './pages/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import PrivateRoute from './components/PrivateRoute';
import EditProfile from './pages/EditProfile';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
  <Routes>
      <Route path='/' element={<PrivateRoute />}>
        <Route path='/' element={<App />} />
      </Route>
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='edit-profile' element={<EditProfile />} />
  </Routes>
    {/* <App /> */}
  </BrowserRouter>
);
