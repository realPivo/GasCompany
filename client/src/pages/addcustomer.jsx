import React from 'react';
import { Logo } from '../components/Logo';
import { Container } from '../components/Container';
import { CustomerForm } from '../components/CustomerForm';

export const AddCustomer = () => {
  return (
    <Container>
      <Logo></Logo>
      <CustomerForm />
    </Container>
  );
};
