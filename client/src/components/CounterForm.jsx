import React from 'react';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './CustomerForm.css';
import { useEffect } from 'react';
import axios from 'axios';

export const CounterForm = (props) => {
  const [counter, setCounter] = useState({
    id: '',
    start_bill: '',
    end_bill: '',
    start_date: '',
    end_date: '',
    userId: '',
  });

  let navigate = useNavigate();
  const location = useLocation();
  const { id } = location?.state;

  const btnClick = async (event) => {
    try {
      event.preventDefault();
      if (counter.start_bill > counter.end_bill) {
        return window.alert(
          'Початкові показання не можуть бути більшими за поточні.'
        );
      }
      id
        ? axios.patch(`http://localhost:5000/api/counter/${id}`, counter)
        : axios.post('http://localhost:5000/api/counter/', counter);

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
          .delete(`http://localhost:5000/api/counter/${id}`)
          .then(navigate('/cabinet'));
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5000/api/counter/${id}`)
        .then((self) => setCounter(self.data))
        .then(
          setCounter({
            ...counter,
            endta: counter.start_date.split('T')[0],
            end_date: counter.end_date.split('T')[0],
          })
        );
    }
  }, [id]);

  if (counter === undefined) {
    return <>Wait</>;
  }
  return (
    <form className='form'>
      <h3 className='register-form-title'>Лічильник</h3>

      {props.wantSignIn ? (
        ''
      ) : (
        <>
          <div className='form-row'>
            <label htmlFor='id'>Номер</label>
            <input
              id='id'
              type='number'
              defaultValue={counter.id}
              onChange={(e) => setCounter({ ...counter, id: e.target.value })}
            ></input>
          </div>

          <div className='form-row'>
            <label htmlFor='start_bill'>Показання на початку</label>
            <input
              id='start_bill'
              type='number'
              defaultValue={counter.start_bill}
              onChange={(e) =>
                setCounter({ ...counter, start_bill: e.target.value })
              }
            ></input>
          </div>

          <div className='form-row'>
            <label htmlFor='end_bill'>Показання наприкінці</label>
            <input
              id='end_bill'
              type='number'
              defaultValue={counter.end_bill}
              onChange={(e) =>
                setCounter({ ...counter, end_bill: e.target.value })
              }
            ></input>
          </div>

          <div className='form-row'>
            <label htmlFor='start_date'>Початкова дата</label>
            <input
              id='start_date'
              type='date'
              defaultValue={counter.start_date.split('T')[0]}
              onChange={(e) =>
                setCounter({ ...counter, start_date: e.target.value })
              }
            ></input>
          </div>

          <div className='form-row'>
            <label htmlFor='end_date'>Кінцева дата</label>
            <input
              id='end_date'
              type='date'
              defaultValue={counter.end_date.split('T')[0]}
              onChange={(e) =>
                setCounter({ ...counter, end_date: e.target.value })
              }
            ></input>
          </div>

          <div className='form-row'>
            <label htmlFor='userId'>Власник</label>
            <input
              id='userId'
              type='number'
              defaultValue={counter.userId}
              onChange={(e) =>
                setCounter({ ...counter, userId: e.target.value })
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
