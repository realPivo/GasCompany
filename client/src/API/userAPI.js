import axios from 'axios';
import jwt_decode from 'jwt-decode';

export async function registerCabinet(email, pass) {
  await axios.post('http://localhost:5000/api/customer/registration', {
    email: email,
    password: pass
  })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        // console.log(localStorage.getItem('token'));
        const decodedJWT = jwt_decode(response.data.token);
        // console.log(decodedJWT);
        return decodedJWT;

      }
    })
    .catch((response) => {
      console.log(response);
    })

}

export async function login(email, pass) {
  await axios.post('http://localhost:5000/api/customer/login', {
    email: email,
    password: pass
  })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        const decodedJWT = jwt_decode(response.data.token);
        return decodedJWT;
      }
    })
    .catch((response) => {
      console.log(response);
    })
}

export async function check(email, pass) {
  await axios.get('http://localhost:5000/api/customer/auth', {
    email: email,
    password: pass
  })
    .then((response) => {
      localStorage.setItem('token', response.data.token);
      const decodedJWT = jwt_decode(response.data.token);
      return decodedJWT;
    })
    .catch((response) => {
      console.log(response);
    })
}
