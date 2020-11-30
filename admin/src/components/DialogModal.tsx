import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { messagesRef, tasksRef } from '../firebase';
import TaskMessages from './TaskMessages';
import { Avatar, Icon, InputBase } from '@material-ui/core';
import { ADMIN_ID, ADMIN_AVATAR, ADMIN_NAME } from '../App';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';

export default function DialogModal({ taskId, open, setOpen }: any) {
  const [value, setValue] = React.useState('');
  const [messagesTask, setMessagesTask] = React.useState([]);
  const [currentTask, setCurrentTask] = React.useState<any>([]);
  React.useEffect(() => {
    if (open) {
      messagesRef
        .where('taskId', '==', taskId)
        .orderBy('createdAt', 'asc')
        .onSnapshot(function (querySnapshot: any) {
          const message: any = [];
          querySnapshot.forEach(function (doc: any) {
            message.push({
              ...doc.data(),
              messageId: doc.id,
            });
          });
          setMessagesTask(message);
        });

      tasksRef
        .doc(taskId)
        .get()
        .then((doc) => {
          if (doc.exists) {
            setCurrentTask(doc.data());
          }
        });
    }
  }, [open, taskId]);

  const handleClose = () => {
    setOpen(false);
    messagesRef
      .where('taskId', '==', taskId)
      .where('uid', '!=', ADMIN_ID)
      .where('newMessage', '==', true)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          messagesRef.doc(doc.id).update({
            newMessage: false,
          });
        });
      });
  };

  const onAddMessage = () => {
    if (!!value) {
      messagesRef.add({
        name: ADMIN_NAME,
        text: value,
        profilePicUrl: ADMIN_AVATAR,
        createdAt: new Date(),
        newMessage: true,
        uid: ADMIN_ID,
        taskId: taskId,
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
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="lg"
        scroll="body"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogContent>
          <div className={`admin__table__content--task admin__${currentTask.status}`}>
            <h2>Задание №{currentTask.number}</h2>
            <div className="admin__table__content--messages--info">
              <p className="admin__decision-link">
                <b>Ссылка на pull-реквест: </b>
                <a href={currentTask.reference} rel="noopener noreferrer" target="_blank">
                  {currentTask.reference}
                </a>
              </p>
              <div className="admin__decision">
                <b>Закреплённые комментарии:</b>
                {!!currentTask.decision &&
                  currentTask.decision.map((item: any) => {
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
                  })}
              </div>
            </div>
          </div>
          {!!messagesTask.length &&
            messagesTask.map((message: any) => (
              <TaskMessages key={message.messageId} message={message} newMessages={false} />
            ))}

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
                disabled={value.length === 0}
                variant="contained"
                onClick={onAddMessage}
                endIcon={<Icon>send</Icon>}
              >
                Отправить
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
