import React from 'react';
import { Avatar, Button } from '@material-ui/core';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import DeleteIcon from '@material-ui/icons/Delete';
import { messagesRef } from '../firebase';
const TaskMessages = ({ message, setOpen, setTaskId, newMessage }: any) => {
  const onDeleteMessage = (id: any) => {
    messagesRef.doc(id).delete();
  };

  const openModal = () => {
    setTaskId(message.taskId);
    setOpen(true);
  };

  return (
    <div className="admin__message__item">
      <div className="admin__message__user">
        <div className="admin__message__user--info">
          <Avatar
            className="admin__message__avatar"
            alt="user avatar"
            src={message.profilePicUrl || undefined}
          />
          <div className="admin__message__title">
            <span className="admin__message__name">{message.name}</span>
            <span className="admin__message__info">
              Отправлено {format(message.createdAt.toDate(), 'dd.MM.yyyy, в HH.mm.ss')}
            </span>
          </div>
        </div>
        <div>
          {newMessage ? (
            <Button onClick={openModal}>Перейти в диалог</Button>
          ) : (
            <Button
              color="secondary"
              onClick={() => onDeleteMessage(message.messageId)}
              startIcon={<DeleteIcon />}
            >
              DELETE
            </Button>
          )}
        </div>
      </div>
      <div className="admin__message__item-text">
        <ReactMarkdown source={message.text} />
      </div>
    </div>
  );
};

export default TaskMessages;
