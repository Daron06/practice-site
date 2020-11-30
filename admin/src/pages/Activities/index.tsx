import React from 'react';
import { tasksRef, messagesRef } from '../../firebase';
import { Avatar, Button, Icon, InputBase } from '@material-ui/core';
import TaskItem from '../../components/TaskItem';
import TaskMessages from '../../components/TaskMessages';
import { ADMIN_AVATAR, ADMIN_ID, ADMIN_NAME } from '../../App';
import { selectUsersItems } from '../../redux/users/selectors';
import { useSelector } from 'react-redux';
import { ITask } from '../../redux/tasks/types';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';

const Activities = () => {
  const [userTasks, setUserTasks] = React.useState<ITask[]>([]);
  const [userMessages, setUserMessages] = React.useState<any[]>([]);
  const [currentTaskInfo, setCurrentTaskInfo] = React.useState<any>();
  const [value, setValue] = React.useState<string>('');
  const users = useSelector(selectUsersItems);

  const onGetUserTasks = (id: any) => {
    setUserMessages([]);
    setCurrentTaskInfo(undefined);

    tasksRef
      .where('uid', '==', id)
      .orderBy('createdAt', 'asc')
      .onSnapshot(function (querySnapshot) {
        const items: ITask[] = [];
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
    if (!!value) {
      console.log(currentTaskInfo);
      messagesRef.add({
        name: ADMIN_NAME,
        profilePicUrl: ADMIN_AVATAR,
        uid: ADMIN_ID,
        text: value,
        createdAt: new Date(),
        newMessage: true,
        taskId: currentTaskInfo.taskId,
      });
    }
    setValue('');
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (!event.shiftKey && event.key === 'Enter') {
      onAddMessage();
    }
  };

  return (
    <div>
      <div className="admin__table">
        <div className="admin__table__header">
          {users
            .filter((user) => user.accepted)
            .map((user) => {
              return (
                <div className="admin__table__header--item" key={user.uid}>
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
            {!!userTasks.length &&
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
                <p className="admin__decision-link">
                  <b>Ссылка на pull-реквест: </b>
                  <a href={currentTaskInfo.reference} rel="noopener noreferrer" target="_blank">
                    {currentTaskInfo.reference}
                  </a>
                </p>
                <div className="admin__decision">
                  <b>Закреплённые комментарии:</b>
                  {currentTaskInfo.decision.map((item: any) => {
                    return (
                      <div>
                        <div className="admin__message__user">
                          <div className="admin__message__user--info">
                            <Avatar
                              className="admin__message__avatar"
                              alt="user avatar"
                              src={item.avatar || undefined}
                            />
                            <div className="admin__message__title">
                              <span className="admin__message__name">{item.name}</span>
                              <span className="admin__message__info">
                                Отправлено{' '}
                                {format(item.createdAt.toDate(), 'dd.MM.yyyy, в HH.mm.ss')}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="admin__message__item-text">
                          <ReactMarkdown source={item.text} />
                        </div>
                      </div>
                    );
                  }) || 'Отсутствует'}
                </div>
              </div>
            )}

            {!!userMessages.length &&
              userMessages.map((message) => {
                return (
                  <TaskMessages key={message.messageId} newMessage={false} message={message} />
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
                    onKeyUp={handleKeyUp}
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

export default Activities;
