import React from 'react';
import { usersRef, tasksRef, messagesRef } from '../../firebase';

import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import DeleteIcon from '@material-ui/icons/Delete';
import { Avatar, Button, Icon, InputBase } from '@material-ui/core';
import TaskItem from '../../components/TaskItem';

export interface TaskItemProps {
  status: 'completed' | 'rejected' | 'pending';
  id: string;
  number: number;
  createdAt: Date;
  responseAt?: Date;
  newTask: boolean;
  description?: string;
}
const AdminActivities = () => {
  const [acceptedUsers, setAcceptedUsers] = React.useState<any>([]);
  const [userTasks, setUserTasks] = React.useState<any[]>([]);
  const [userMessages, setUserMessages] = React.useState<any[]>([]);
  const [currentTaskInfo, setCurrentTaskInfo] = React.useState<any>();
  const [value, setValue] = React.useState<any>('');

  React.useEffect(() => {
    usersRef.where('accepted', '==', true).onSnapshot(function (querySnapshot: any) {
      const user: any[] = [];

      querySnapshot.forEach(function (doc: any) {
        user.push(doc.data());
      });
      setAcceptedUsers(user);
    });
  }, []);
  const onGetUserTasks = (id: any) => {
    setUserMessages([]);
    setCurrentTaskInfo(undefined);

    tasksRef
      .where('uid', '==', id)
      .orderBy('createdAt', 'asc')
      .onSnapshot(function (querySnapshot: any) {
        const items: TaskItemProps[] = [];
        querySnapshot.forEach(function (doc: any) {
          items.push({
            ...doc.data(),
            taskId: doc.id,
          });
        });
        setUserTasks(items);
      });
  };
  const onAddMessage = () => {
    console.log(currentTaskInfo);
    messagesRef.add({
      name: 'Царевич',
      text: value,
      profilePicUrl: 'https://avatars3.githubusercontent.com/u/12086860?v=4',
      createdAt: new Date(),
      newMessage: true,
      uid: '12086860',
      taskId: currentTaskInfo.taskId,
    });
    setValue('');
  };

  const onDeleteMessage = (id: any) => {
    messagesRef.doc(id).delete();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <div className="admin__table">
        <div className="admin__table__header">
          {acceptedUsers.map((user: any) => {
            return (
              <div className="admin__table__header--item" key={user.uid || 0}>
                <Button
                  startIcon={<Avatar src={user.photoURL || undefined} />}
                  variant="contained"
                  color="primary"
                  onClick={() => onGetUserTasks(user.uid)}
                >
                  {user.displayName || user.email || user.uid}
                </Button>
              </div>
            );
          })}
        </div>
        <div className="admin__table__content">
          <div className="admin__table__content--tasks scrollbar">
            {userTasks.length &&
              userTasks.map((task: any) => {
                return (
                  <TaskItem
                    key={task.taskId}
                    taskCurrentUser={task}
                    setUserMessages={setUserMessages}
                    setCurrentTaskInfo={setCurrentTaskInfo}
                  />
                );
              })}
          </div>

          <div className="admin__table__content--messages scrollbar">
            {currentTaskInfo && (
              <div className="admin__table__content--messages--info">
                <div>Ссылка на гитхаб: {currentTaskInfo.reference || 'Отсутствует'}</div>
                <div>Сообщение пользователя: {currentTaskInfo.decision || 'Отсутствует'}</div>
              </div>
            )}

            {userMessages.length &&
              userMessages.map((message) => {
                return (
                  <div key={message.messageId} className="admin__message__item">
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
                            Отправлено{' '}
                            {format(message.createdAt.toDate(), 'dd.MM.yyyy, в HH.mm.ss')}
                          </span>
                        </div>
                      </div>
                      <div>
                        <Button
                          color="secondary"
                          onClick={() => onDeleteMessage(message.messageId)}
                          startIcon={<DeleteIcon />}
                        >
                          DELETE
                        </Button>
                      </div>
                    </div>
                    <div className="admin__message__item-text">
                      <ReactMarkdown source={message.text} />
                    </div>
                  </div>
                );
              })}

            {currentTaskInfo && (
              <div className="admin__message__chat">
                <div className="admin__message__chat-field">
                  <InputBase
                    className="scrollbar"
                    rows={4}
                    rowsMax={10}
                    value={value}
                    onChange={handleChange}
                    fullWidth
                    inputProps={{ 'aria-label': 'naked' }}
                    multiline
                    placeholder="Комментарий"
                  />
                </div>

                <div className="admin__message__button">
                  <Button
                    color="primary"
                    disabled={value.length === 0 || !currentTaskInfo}
                    variant="contained"
                    onClick={onAddMessage}
                    endIcon={<Icon>send</Icon>}
                  >
                    Отправить
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminActivities;
