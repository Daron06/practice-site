import React from 'react';
import { Link } from 'react-router-dom';

import { Button } from '@material-ui/core';

const Nav = () => {
  return (
    <div className="admin__nav">
      <Link to="/">
        <Button>Новости</Button>
      </Link>
      <Link to="/users">
        <Button>Пользователи</Button>
      </Link>
      <Link to="/lesson">
        <Button>Видео уроки</Button>
      </Link>
      <Link to="/resources">
        <Button>Ресурсы</Button>
      </Link>
    </div>
  );
};

export default Nav;
