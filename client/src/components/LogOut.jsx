import React, { useContext } from 'react';
import './LogOut.css';
import { Context } from '../index';
import { useNavigate } from 'react-router-dom';
export const LogOut = () => {
  const { user } = useContext(Context);
  const navigate = useNavigate();

  const logout = () => {
    user.setUser({});
    user.setIsAuth(false);
    navigate('/');
  };

  return (
    <button id='exit' onClick={logout}>
      Вийти з кабінету
    </button>
  );
};
