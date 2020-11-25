import React from 'react';
import { Avatar, Chip } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { usersRef } from '../firebase';

import { useSelector } from 'react-redux';
import { selectUsersItems } from '../redux/users/selectors';
import { IUser } from '../redux/users/types';

const TransferUsers = () => {
  const [usersNotPaid, setUsersNotPaid] = React.useState<IUser[]>([]);
  const [usersPaid, setUsersPaid] = React.useState<IUser[]>([]);

  const users = useSelector(selectUsersItems);
  React.useEffect(() => {
    setUsersNotPaid(users.filter((el) => el.accepted === false));
    setUsersPaid(users.filter((el) => el.accepted === true));
    // usersRef.onSnapshot((querySnapshot) => {
    //   const user: any[] = [];
    //   const acceptedUser: any[] = [];

    //   querySnapshot.forEach((doc) => {
    //     if (doc.data().accepted) {
    //       acceptedUser.push(doc.data());
    //     }
    //     if (!doc.data().accepted) {
    //       user.push(doc.data());
    //     }
    //   });
    //   setUsers(user);
    //   setAcceptedUsers(acceptedUser);
    // });
  }, [users]);

  const transferUsers = (item) => {
    if (item.accepted) {
      usersRef.doc(item.uid).update({
        accepted: false,
      });
    }
    if (!item.accepted) {
      usersRef.doc(item.uid).update({
        accepted: true,
      });
    }
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
                <Chip
                  variant="outlined"
                  label={item.displayName || item.email || item.uid}
                  color="secondary"
                  avatar={<Avatar src={item.photoURL} />}
                />
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
                <Chip
                  variant="outlined"
                  label={item.displayName || item.email}
                  color="secondary"
                  avatar={<Avatar src={item.photoURL} />}
                />
                <IconButton onClick={() => transferUsers(item)}>
                  <ArrowForwardIosIcon />
                </IconButton>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TransferUsers;
