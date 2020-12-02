import React from 'react';
import { Avatar, Button, Chip } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { usersRef } from '../firebase';

import { useSelector } from 'react-redux';
import { selectUsersItems } from '../redux/users/selectors';
import { IUser } from '../redux/users/types';
import { LEARNING_FLOW } from '../App';
import { format } from 'date-fns';

const TransferUsers = () => {
  const [usersNotPaid, setUsersNotPaid] = React.useState<IUser[]>([]);
  const [usersPaid, setUsersPaid] = React.useState<IUser[]>([]);

  const [currentUser, setCurrentUser] = React.useState<IUser>();

  const users = useSelector(selectUsersItems);
  React.useEffect(() => {
    setUsersNotPaid(users.filter((el) => el.accepted === false));
    setUsersPaid(users.filter((el) => el.accepted === true));
  }, [users]);

  const transferUsers = (item: IUser) => {
    if (item.accepted) {
      usersRef.doc(item.uid).update({
        accepted: false,
        learningFlow: false,
      });
    }
    if (!item.accepted) {
      usersRef.doc(item.uid).update({
        accepted: true,
        learningFlow: LEARNING_FLOW,
      });
    }
  };

  const hendleUserConfig = (id: string) => {
    console.log(id);
    setCurrentUser(users.find((el) => el.uid === id));
  };

  const onClearConfigUser = () => {
    setCurrentUser(undefined);
  };

  if (!users) {
    return <div>Грузим, грузим...</div>;
  }

  return (
    <div className="admin__users">
      <div className="admin__users__auth">
        <h2>Не оплатившие курс ({usersNotPaid.length}):</h2>
        <div className="admin__users__list">
          {!usersNotPaid.length ? (
            <div>Кажись пусто...</div>
          ) : (
            usersNotPaid.map((item) => (
              <div key={item.uid} className="admin__users__list__item">
                <Button onClick={() => hendleUserConfig(item.uid)}>
                  <Chip
                    variant="outlined"
                    label={item.displayName || item.email || item.uid}
                    color="secondary"
                    avatar={<Avatar src={item.photoURL} />}
                  />
                </Button>
                <IconButton onClick={() => transferUsers(item)}>
                  <ArrowForwardIosIcon />
                </IconButton>
              </div>
            ))
          )}
        </div>
      </div>
      <div className="admin__users__accepted">
        <h2> Оплатившие курс ({usersPaid.length}):</h2>
        <div className="admin__users__list__accepted">
          {!usersPaid.length ? (
            <div>Кажись пусто...</div>
          ) : (
            usersPaid.map((item) => (
              <div key={item.uid} className="admin__users__list__item">
                <Button onClick={() => hendleUserConfig(item.uid)}>
                  <Chip
                    variant="outlined"
                    label={item.displayName || item.email}
                    color="secondary"
                    avatar={<Avatar src={item.photoURL} />}
                  />
                </Button>
                <IconButton onClick={() => transferUsers(item)}>
                  <ArrowForwardIosIcon />
                </IconButton>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="users__config">
        <h3>Актуальный поток обучения №{LEARNING_FLOW}</h3>
        <div>
          <Button onClick={onClearConfigUser}>Отмена</Button>
        </div>
        <div>
          {!currentUser ? (
            <h2>Выберите пользователя</h2>
          ) : (
            <div>
              <p>
                <b>ID пользователя: </b> {String(currentUser.uid)}
              </p>
              <p>
                <b>Имя пользователя: </b> {String(currentUser.displayName)}
              </p>
              <p>
                <b>Фото пользователя: </b> {String(currentUser.photoURL)}
              </p>
              <p>
                <b>Регистрация на сайте: </b>{' '}
                {String(format(currentUser.createdAt, 'dd.MM.yyyy, в HH.mm.ss'))}
              </p>
              <p>
                <b>Был ли оплачен курс: </b> {String(currentUser.accepted)}
              </p>
              <p>
                <b>Пользователь является админом: </b> {String(currentUser.admin)}
              </p>
              <p>
                <b>Поток обучения: </b> {String(currentUser.learningFlow)}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransferUsers;
