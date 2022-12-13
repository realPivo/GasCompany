import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Registration } from './pages/auth';
import { Cabinet } from './pages/cabinet'
import { NotFound } from './pages/notfound';
import { AddCustomer } from './pages/addcustomer';
import { AddCounter } from './pages/addcounter';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Navigate to='/sign-in' />} />
        <Route exact path='/sign-up' element={<Registration />} />
        <Route exact path='/sign-in' element={<Registration />} />
        <Route exact path='/cabinet' element={<Cabinet />} />
        <Route exact path='/customer' element={<AddCustomer />} />
        <Route exact path='/counter' element={<AddCounter />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
