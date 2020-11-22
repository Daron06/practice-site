import React from 'react';
import { Avatar, Chip } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { usersRef } from '../firebase';
const TransferUsers = () => {
  const [users, setUsers] = React.useState<any[]>([]);
  const [acceptedUsers, setAcceptedUsers] = React.useState<any[]>([]);

  React.useEffect(() => {
    usersRef.onSnapshot((querySnapshot) => {
      const user: any[] = [];
      const acceptedUser: any[] = [];

      querySnapshot.forEach((doc) => {
        if (doc.data().accepted) {
          acceptedUser.push(doc.data());
        }
        if (!doc.data().accepted) {
          user.push(doc.data());
        }
      });
      setUsers(user);
      setAcceptedUsers(acceptedUser);
    });
  }, []);

  const transferUsers = (item: any) => {
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
        <h2>Не оплатившие курс ({users.length}):</h2>
        <div className="admin__users__list">
          {!users.length ? (
            <div>Кажись пусто...</div>
          ) : (
            users.map((item: any) => (
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
        <h2> Оплатившие курс ({acceptedUsers.length}):</h2>
        <div className="admin__users__list__accepted">
          {!acceptedUsers.length ? (
            <div>Кажись пусто...</div>
          ) : (
            acceptedUsers.map((item: any) => (
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
