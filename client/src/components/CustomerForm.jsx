import React from 'react';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './CustomerForm.css';
import { useEffect } from 'react';
import axios from 'axios';

export const CustomerForm = (props) => {
  const [customer, setCustomer] = useState({
    firstName: '',
    lastName: '',
    street: '',
    appartment: '',
    city: '',
    district: '',
  });

  let navigate = useNavigate();
  const location = useLocation();
  const { id } = location?.state;

  const btnClick = async (event) => {
    try {
      event.preventDefault();
      id
        ? axios.patch(`http://localhost:5000/api/customer/${id}`, customer)
        : axios.post('http://localhost:5000/api/customer/', customer);

      navigate('/cabinet');
    } catch (error) {
      alert(error);
    }
  };

  const btnDelete = async (event) => {
    try {
      event.preventDefault();
      if (window.confirm('Ви впевнені в видаленні?')) {
        axios
          .delete(`http://localhost:5000/api/customer/${id}`)
          .then(navigate('/cabinet'));
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5000/api/customer/${id}`)
        .then((self) => setCustomer(self.data));
    }
  }, [id]);

  if (customer === undefined) {
    return <>Wait</>;
  }
  return (
    <form className='form'>
      <h3 className='register-form-title'>Користувач</h3>

      {props.wantSignIn ? (
        ''
      ) : (
        <>
          <div className='form-row'>
            <label htmlFor='firstName'>Ім'я</label>
            <input
              id='firstName'
              type='text'
              defaultValue={customer.firstName}
              onChange={(e) =>
                setCustomer({ ...customer, firstName: e.target.value })
              }
            ></input>
          </div>

          <div className='form-row'>
            <label htmlFor='lastName'>Прізвище</label>
            <input
              id='lastName'
              type='text'
              defaultValue={customer.lastName}
              onChange={(e) =>
                setCustomer({ ...customer, lastName: e.target.value })
              }
            ></input>
          </div>

          <div className='form-row'>
            <label htmlFor='street'>Вулиця</label>
            <input
              id='street'
              type='text'
              defaultValue={customer.street}
              onChange={(e) =>
                setCustomer({ ...customer, street: e.target.value })
              }
            ></input>
          </div>

          <div className='form-row'>
            <label htmlFor='appartment'>Номер будинку</label>
            <input
              id='appartment'
              type='number'
              defaultValue={customer.appartment}
              onChange={(e) =>
                setCustomer({ ...customer, appartment: e.target.value })
              }
            ></input>
          </div>

          <div className='form-row'>
            <label htmlFor='city'>Місто</label>
            <input
              id='city'
              type='text'
              defaultValue={customer.city}
              onChange={(e) =>
                setCustomer({ ...customer, city: e.target.value })
              }
            ></input>
          </div>

          <div className='form-row'>
            <label htmlFor='district'>Район</label>
            <input
              id='district'
              type='text'
              defaultValue={customer.district}
              onChange={(e) =>
                setCustomer({ ...customer, district: e.target.value })
              }
            ></input>
          </div>
        </>
      )}
      <button className='form-btn' type='submit' onClick={btnClick}>
        {id ? 'Змінити' : 'Додати'}
      </button>
      {id ? (
        <button className='form-btn' onClick={btnDelete}>
          Видалити
        </button>
      ) : (
        <></>
      )}
    </form>
  );
};
