import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { messagesRef, tasksRef } from '../firebase';
import TaskMessages from './TaskMessages';
import { Icon, InputBase } from '@material-ui/core';
import { ADMIN_ID, ADMIN_AVATAR } from '../App';

export default function DialogModal({ taskId }: any) {
  const [value, setValue] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [messagesTask, setMessagesTask] = React.useState([]);
  const [currentTask, setCurrentTask] = React.useState<any>([]);
  const descriptionElementRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const handleClickOpen = () => {
    setOpen(true);

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
  };

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
        name: 'Царевич',
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
      <Button color="secondary" onClick={handleClickOpen}>
        Открыть диалог
      </Button>
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
            <p>Ссылка на гитхаб: {currentTask.reference || 'отсутствует'}</p>
            <p>Описание к заданию: {currentTask.decision || 'отсутствует'}</p>
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
