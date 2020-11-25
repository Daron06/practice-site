import React from 'react';
import { usersRef, tasksRef, messagesRef } from '../../firebase';
import { Avatar, Button, Icon, InputBase } from '@material-ui/core';
import TaskItem from '../../components/TaskItem';
import TaskMessages from '../../components/TaskMessages';
import { ADMIN_AVATAR, ADMIN_ID } from '../../App';
import { selectUsersItems } from '../../redux/users/selectors';
import { useSelector } from 'react-redux';

export interface TaskItemProps {
  status: 'completed' | 'rejected' | 'pending';
  taskId: string;
  number: number;
  createdAt: Date;
  responseAt?: Date;
  newTask: boolean;
  description?: string;
}

const AdminActivities = () => {
  // const [acceptedUsers, setAcceptedUsers] = React.useState<any>([]);
  const [userTasks, setUserTasks] = React.useState<any[]>([]);
  const [userMessages, setUserMessages] = React.useState<any[]>([]);
  const [currentTaskInfo, setCurrentTaskInfo] = React.useState<any>();
  const [value, setValue] = React.useState<any>('');
  const users = useSelector(selectUsersItems);

  // React.useEffect(() => {
    
  //   usersRef.where('accepted', '==', true).onSnapshot(function (querySnapshot: any) {
  //     const user: any[] = [];

  //     querySnapshot.forEach(function (doc: any) {
  //       user.push(doc.data());
  //       console.log(doc.data())
  //     });

  //     console.log(user);
  //     setAcceptedUsers(user);
  //   });
  // }, []);

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
    if (!!value) {
      console.log(currentTaskInfo);
      messagesRef.add({
        name: 'Царевич',
        text: value,
        profilePicUrl: ADMIN_AVATAR,
        createdAt: new Date(),
        newMessage: true,
        uid: ADMIN_ID,
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
          {users.filter(user => user.accepted).map((user: any) => {
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
                <div>Ссылка на гитхаб: {currentTaskInfo.reference || 'Отсутствует'}</div>
                <div>Сообщение пользователя: {currentTaskInfo.decision || 'Отсутствует'}</div>
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

export default AdminActivities;
