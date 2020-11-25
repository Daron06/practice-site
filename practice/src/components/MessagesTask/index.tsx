import React from 'react';
import { useParams } from 'react-router-dom';
import format from 'date-fns/format';
import { Avatar, Button, InputBase } from '@material-ui/core';
import TaskItem from '../TaskItem';
import { firebase, tasksRef, messagesRef } from '../../firebase';
import ReactMarkdown from 'react-markdown';
import { useSelector } from 'react-redux';
import { selectTasksById } from '../../redux/activities/selectors';
import { Task } from '../../redux/activities/actions';
import highlight from 'highlight.js';
import 'highlight.js/styles/solarized-light.css';

interface MessagesTaskProps {
  userId: string | undefined;
}
const MessagesTask: React.FC<MessagesTaskProps> = ({ userId }): React.ReactElement => {
  const [messagesTask, setMessagesTask] = React.useState<any[]>([]);
  const { id } = useParams<{ id: string }>();
  const taskData = useSelector(selectTasksById(id));
  const [value, setValue] = React.useState('');
  const [task, setTask] = React.useState<Task | undefined>(taskData);

  React.useEffect(() => {
    if (!taskData) {
      tasksRef
        .doc(id)
        .get()
        .then((doc) => {
          if (doc.exists) {
            setTask({
              createdAt: doc.data()?.createdAt.toDate(),
              responseAt: doc.data()?.responseAt?.toDate(),
              status: doc.data()?.status,
              number: doc.data()?.number,
              taskId: doc.id,
              decision: doc.data()?.decision,
              reference: doc.data()?.reference,
            });
          }
        });
      messagesRef
        .where('taskId', '==', id)
        .orderBy('createdAt', 'asc')
        .onSnapshot((querySnapshot: any) => {
          const items: any[] = [];
          querySnapshot.forEach((doc: any) => {
            items.push({
              createdAt: doc.data().createdAt.toDate(),
              text: doc.data().text,
              name: doc.data().name,
              profilePicUrl: doc.data().profilePicUrl,
              messageId: doc.id,
              newMessage: doc.data().newMessage,
              uid: doc.data().uid,
              taskId: doc.data().taskId,
            });
          });
          setMessagesTask(items);
        });
    }
    messagesRef
      .where('taskId', '==', id)
      .orderBy('createdAt', 'asc')
      .onSnapshot((querySnapshot: any) => {
        const items: any[] = [];
        querySnapshot.forEach((doc: any) => {
          items.push({
            createdAt: doc.data().createdAt.toDate(),
            text: doc.data().text,
            name: doc.data().name,
            profilePicUrl: doc.data().profilePicUrl,
            messageId: doc.id,
            newMessage: doc.data().newMessage,
            uid: doc.data().uid,
            taskId: doc.data().taskId,
          });
        });
        setMessagesTask(items);
      });
  }, [id, taskData]);

  React.useEffect(() => {
    document.querySelectorAll('code').forEach((block) => {
      highlight.highlightBlock(block as any);
    });
  }, [messagesTask]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const onAddMessage = () => {
    if (value.trim()) {
      messagesRef.add({
        name:
          firebase.auth().currentUser?.displayName ||
          firebase.auth().currentUser?.email ||
          firebase.auth().currentUser?.uid,
        text: value,
        profilePicUrl: firebase.auth().currentUser?.photoURL,
        createdAt: new Date(),
        uid: userId,
        newMessage: true,
        taskId: id,
      });
      setValue('');
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (!event.shiftKey && event.key === 'Enter') {
      event.preventDefault();
      onAddMessage();
    }
  };

  return (
    <div className="messages-task">
      <div className="item-wrapper ">
        <div className="messages-task__wrapper">
          {task && (
            <TaskItem
              id={task.taskId}
              number={task.number}
              status={task.status}
              createdAt={task.createdAt}
              responseAt={task.responseAt}
            />
          )}
          <div className="messages-task__description">
            {task && task.reference && (
              <p className="messages-task__description-link">
                <b>Ссылка на pull-реквест:</b> <a href={task.reference} target="_blank">{task.reference}</a>
              </p>
            )}
            <div>
              <p><b>Комментарий автора:</b></p>
              <div className="messages-task__description-text">
                {(task && <span className="">{task.decision}</span>) || (
                  <span>Без комментариев</span>
                )}
              </div>
            </div>
          </div>

          <div className="messages-task__chat">
            <h2>Обсуждение</h2>
            {messagesTask.length === 0 ? (
              <p>Обсуждение ещё не начато</p>
            ) : (
              messagesTask.map((item) => (
                <div key={item.messageId} className="messages-task__item">
                  <div className="header__user">
                    <div>
                      <Avatar alt="avatar user" src={item.profilePicUrl} />
                    </div>
                    <div className="header__user__title">
                      <span className="header__user__name">{item.name}</span>
                      <span className="header__user__info">
                        Отправлено {format(item.createdAt, 'dd.MM.yyyy, в HH.mm.ss')}
                      </span>
                      {/* <Button onClick={}>delete message</Button> */}
                    </div>
                  </div>
                  <div className="messages-task__item-text">
                    <ReactMarkdown source={item.text} />
                  </div>
                </div>
              ))
            )}
            <div className="messages-task__chat-field">
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
                onKeyDown={handleKeyDown}
              />
            </div>

            <div className="button--send messages-task__send-btn">
              <Button disabled={value.length === 0} variant="outlined" onClick={onAddMessage}>
                Отправить
              </Button>
              <span>Отправка Enter</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesTask;
