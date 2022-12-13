import React from 'react';
import { Logo } from '../components/Logo';
import { Container } from '../components/Container';
import { CustomerForm } from '../components/CustomerForm';
import { CounterForm } from '../components/CounterForm';

export const AddCounter = () => {
  return (
    <Container>
      <Logo></Logo>
      <CounterForm />
    </Container>
  );
};
