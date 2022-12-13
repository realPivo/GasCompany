import React from 'react';
import { Logo } from '../components/Logo';
import { Container } from '../components/Container';
import { LogOut } from '../components/LogOut';
import './cabinet.css';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
const XLSX = require('xlsx');

export const Cabinet = () => {
  const [counters, setCounters] = useState([]);
  const [seeCustomers, setSeeCustomers] = useState(false);

  useEffect(() => {
    let url = seeCustomers
      ? 'http://localhost:5000/api/customer/'
      : 'http://localhost:5000/api/counter/';

    seeCustomers
      ? axios
          .get('http://localhost:5000/api/customer/')
          .then((res) => setCounters(res.data))
      : axios
          .get('http://localhost:5000/api/counter/')
          .then((res) => setCounters(res.data));
  }, [seeCustomers]);

  const btnSwitch = async (event) => {
    try {
      event.preventDefault();
      setSeeCustomers(!seeCustomers);
    } catch (error) {
      alert(error);
    }
  };

  const getFormattedDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString();
  };

  if (counters === undefined) {
    return <>Wait</>;
  }

  return (
    <Container>
      <Logo></Logo>
      <div className='switch'>
        <button disabled={seeCustomers} onClick={btnSwitch}>
          Клієнти
        </button>
        <button disabled={!seeCustomers} onClick={btnSwitch}>
          Лічильники
        </button>
      </div>

      <table id='maintable'>
        <thead>
          {seeCustomers ? (
            <tr>
              <th scope='col'>ID</th>
              <th scope='col'>Ім'я</th>
              <th scope='col'>Прізвище</th>
              <th scope='col'>Вулиця</th>
              <th scope='col'>Будинок</th>
              <th scope='col'>Місто</th>
              <th scope='col'>Район</th>
            </tr>
          ) : (
            <tr>
              <th scope='col'>Лічильник</th>
              <th scope='col'>Показання на початку</th>
              <th scope='col'>Показання наприкінці</th>
              <th scope='col'>Початкова дата</th>
              <th scope='col'>Кінцева дата</th>
              <th scope='col'>Власник</th>
            </tr>
          )}
        </thead>
        <tbody>
          {counters.map((cell) =>
            seeCustomers ? (
              <tr key={cell.id}>
                <td>
                  <Link to='/customer' state={{ id: cell.id }}>
                    {cell.id}
                  </Link>
                </td>
                <td>{cell.firstName}</td>
                <td>{cell.lastName}</td>
                <td>{cell.street}</td>
                <td>{cell.appartment}</td>
                <td>{cell.city}</td>
                <td>{cell.district}</td>
              </tr>
            ) : (
              <tr key={cell.id}>
                <td>
                  <Link to='/counter' state={{ id: cell.id }}>
                    {cell.id}
                  </Link>
                </td>
                <td>{cell.start_bill}</td>
                <td>{cell.end_bill}</td>
                <td>{getFormattedDate(cell.start_date)}</td>
                <td>{getFormattedDate(cell.end_date)}</td>
                <td>{cell.userId}</td>
              </tr>
            )
          )}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan='100%'>
              <Link
                to={seeCustomers ? '/customer' : '/counter'}
                state={{ add: true }}
              >
                Додати {seeCustomers ? 'клієнта' : 'лічильник'}
              </Link>
            </td>
          </tr>
        </tfoot>
      </table>
      <div className='buttons'>
        <button
          id='sheetjsexport'
          onClick={() => {
            var wb = XLSX.utils.table_to_book(
              document.getElementById('maintable')
            );
            /* Export to file (start a download) */
            // console.log(wb.Sheets.Sheet1['!rows']);
            XLSX.writeFile(
              wb,
              `${seeCustomers ? 'Customers' : 'Counters'}.xlsx`
            );
          }}
        >
          Завантажити XLSX
        </button>
      </div>
      <LogOut />
    </Container>
  );
};
