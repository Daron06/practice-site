import React from 'react';
import { Auth } from '../../auth';
import logo from '../../assets/img/logo.svg';
import smile from '../../assets/img/smile.png';
import { Button } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';

interface SignInProps {
  userId: string | undefined;
  isPaid: boolean;
}

const SignIn: React.FC<SignInProps> = ({ userId, isPaid }): React.ReactElement => {
  const handleSignInClick = () => {
    Auth.signIn();
  };

  let content;

  React.useEffect(() => {
    if (userId) {
    }
  }, [userId]);

  if (!userId && !isPaid) {
    content = (
      <div className="signin__item">
        <img alt="Archakov blog logotype" src={logo} />
        <h1>Вход в кабинет</h1>
        <Button onClick={handleSignInClick}>
          <GitHubIcon />
          Войти через GitHub
        </Button>
      </div>
    );
  }

  if (userId && !isPaid) {
    content = (
      <div className="signin__item signin__item--success">
        <img alt="Archakov blog logotype" src={smile} />
        <h1>Регистрация успешна!</h1>
        <p>Осталось оплатить курс и ваш аккаунт будет подтверждён.</p>
      </div>
    );
  }

  return (
    <div className="signin">
      <div className="signin__wrapper">{content}</div>
    </div>
  );
};

export default SignIn;
