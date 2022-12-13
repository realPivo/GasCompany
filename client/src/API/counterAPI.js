import axios from 'axios';
import jwt_decode from 'jwt-decode';

export async function createCounter(id, start_bill, end_bill, start_date, end_date) {
  await axios.post('http://localhost:5000/api/counter/', {
    id: id,
    start_bill: start_bill,
    end_bill: end_bill,
    start_date: start_date,
    end_date: end_date,
  })
    .then((response) => {
      return response.data;
    })
    .catch((response) => {
      console.log(response);
    })

}

export async function fetchCounters() {
  await axios.get('http://localhost:5000/api/counter/', {
  })
    .then((response) => {
      return response;
    })
    .catch((response) => {
      console.log(response);
    })
}
