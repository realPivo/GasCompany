import React from 'react';
import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AuthForm.css';
import { registerCabinet, login } from '../API/userAPI';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';

export const AuthForm = observer((props) => {
  const { user } = useContext(Context);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let navigate = useNavigate();

  const btnClick = async (event) => {
    try {
      event.preventDefault();
      props.wantSignIn
        ? await login(email, password)
        : await registerCabinet(email, password);

      user.setUser(user);
      user.setIsAuth(true);
      navigate('/cabinet');
    } catch (error) {
      alert(error);
    }
  };

  return (
    <form className='form'>
      <h3 className='register-form-title'>
        {props.wantSignIn ? 'Вхід' : 'Реєстрація'}
      </h3>

      {props.wantSignIn ? (
        ''
      ) : (
        <>
          <div className='form-row'>
            <label htmlFor='phone'>Ім'я</label>
            <input id='name' type='text'></input>
          </div>

          <div className='form-row'>
            <label htmlFor='phone'>Прізвище</label>
            <input id='phone' type='text'></input>
          </div>

          <div className='form-row'>
            <label htmlFor='street'>Вулиця</label>
            <input id='street' type='text'></input>
          </div>

          <div className='form-row'>
            <label htmlFor='appartment'>Номер будинку</label>
            <input id='appartment' type='number'></input>
          </div>

          <div className='form-row'>
            <label htmlFor='city'>Місто</label>
            <input id='city' type='text'></input>
          </div>

          <div className='form-row'>
            <label htmlFor='district'>Район</label>
            <input id='district' type='text'></input>
          </div>
        </>
      )}
      <div className='form-row'>
        <label htmlFor='email'>Електронна пошта</label>
        <input
          id='email'
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
      </div>

      <div className='form-row'>
        <label htmlFor='pass'>Пароль</label>
        <input
          id='pass'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
      </div>

      {props.wantSignIn ? (
        ''
      ) : (
        <>
          <div className='form-row'>
            <label htmlFor='pass'>Підтвердження паролю</label>
            <input id='check-pass' type='password'></input>
          </div>
        </>
      )}

      <button className='form-btn' type='submit' onClick={btnClick}>
        {/* <span className='form-btn-span'> */}
        {props.wantSignIn ? 'Вхід' : 'Зареєструватись'}
        {/* </span> */}
      </button>

      <Link
        className='form-proposal'
        to={props.wantSignIn ? '/sign-up' : '/sign-in'}
      >
        {props.wantSignIn ? 'Створити кабінет' : 'Увійти в кабінет'}
      </Link>
    </form>
  );
});
