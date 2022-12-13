import React from 'react';
import { Logo } from '../components/Logo';
import { Container } from '../components/Container';
import { AuthForm } from '../components/AuthForm';
import { useLocation } from 'react-router-dom';

const Registration = () => {
  const wantSignIn = useLocation().pathname === '/sign-in';

  return (
    <>
      <Container>
        <Logo></Logo>
        <AuthForm wantSignIn={wantSignIn}></AuthForm>
      </Container>
    </>
  );
};

export { Registration };
