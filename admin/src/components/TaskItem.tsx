import React from 'react';
import { format } from 'date-fns';
import { tasksRef, messagesRef } from '../firebase';

import MailIcon from '@material-ui/icons/Mail';
import DeleteIcon from '@material-ui/icons/Delete';
import {
  Badge,
  Button,
  FormControl,
  Input,
  InputBase,
  InputLabel,
  Modal,
  Select,
} from '@material-ui/core';

const TaskItem = ({ taskCurrentUser, setUserMessages, setCurrentTaskInfo }: any) => {
  const [valueModal, setValueModal] = React.useState<any>('');
  const [openModal, setOpenModal] = React.useState<any>(false);
  const [statusTask, setStatusTask] = React.useState<any>();

  const onDeleteTask = () => {
    tasksRef.doc(taskCurrentUser.taskId).delete();
    messagesRef
      .where('taskId', '==', taskCurrentUser.taskId)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          doc.ref.delete();
        });
      });
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setValueModal('');
  };

  const handleOpenModal = () => {
    setValueModal('');
    setOpenModal(true);
  };

  const onAddTask = (status: string) => {
    tasksRef.doc(taskCurrentUser.taskId).set({
      status,
      number: taskCurrentUser.number,
      createdAt: taskCurrentUser.createdAt,
      decision: valueModal,
      reference: '',
      newTask: true,
      responseAt: new Date(),
      uid: taskCurrentUser.uid,
    });

    setOpenModal(false);
  };

  const onGetMessages = () => {
    setCurrentTaskInfo(taskCurrentUser);

    messagesRef
      .where('taskId', '==', taskCurrentUser.taskId)
      .orderBy('createdAt', 'asc')
      .onSnapshot(function (querySnapshot: any) {
        const messages: any[] = [];
        querySnapshot.forEach(function (doc: any) {
          messages.push({
            ...doc.data(),
            messageId: doc.id,
          });
        });
        setUserMessages(messages);
      });
  };

  const handleChangeModal = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueModal(event.target.value);
  };

  const handleChangeStatusTask = (event: React.ChangeEvent<{ value: unknown }>) => {
    setStatusTask(String(event.target.value) || '');
  };

  return (
    <div className={`admin__table__content--task admin__${taskCurrentUser.status}`}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <span style={{ fontWeight: 500, fontSize: 24 }}>{taskCurrentUser.status}</span>
          <span
            style={{
              color: 'gray',
              fontWeight: 500,
              fontSize: 19,
              paddingLeft: 10,
            }}
          >
            {format(taskCurrentUser.createdAt.toDate(), 'dd.MM.yyyy - HH:mm')}
          </span>
        </div>
        <span style={{ fontWeight: 600, fontSize: 24 }}>{'Урок №' + taskCurrentUser.number}</span>

        {taskCurrentUser.status === 'pending' && (
          <div>
            <Button onClick={handleOpenModal} variant="outlined" color="secondary">
              решение
            </Button>
          </div>
        )}
      </div>

      <p>{'ссылка на гитхаб: ' + taskCurrentUser.reference}</p>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Button variant="contained" color="primary" onClick={onGetMessages}>
          Сообщения
          <Badge
            style={{ color: 'grey', marginLeft: 5 }}
            color="secondary"
            badgeContent={0}
            variant="dot"
          >
            <MailIcon />
          </Badge>
        </Button>

        <Button color="secondary" onClick={onDeleteTask} startIcon={<DeleteIcon />}>
          DELETE
        </Button>
      </div>

      <Modal
        className="admin_activities__modal"
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className="item-wrapper admin__modal">
          <FormControl className="admin_activities__formControl">
            <InputLabel htmlFor="demo-dialog-native">Решение</InputLabel>
            <Select
              native
              value={statusTask}
              onChange={handleChangeStatusTask}
              input={<Input id="demo-dialog-native" />}
            >
              <option aria-label="None" value="" />
              <option value="completed">Выполнено</option>
              <option value="rejected">Отклонено</option>
            </Select>
          </FormControl>
          <p>Комментарий: </p>
          <div className="admin__modal-field">
            <InputBase
              className="scrollbar"
              rows={8}
              value={valueModal}
              onChange={handleChangeModal}
              fullWidth
              inputProps={{ 'aria-label': 'naked' }}
              multiline
              placeholder="Комментарий"
            />
          </div>
          <div className="admin__modal-button">
            <div className="button--cancel">
              <Button onClick={handleCloseModal} variant="contained">
                Отмена
              </Button>
            </div>
            <div className="button--send">
              <Button
                onClick={() => onAddTask(statusTask)}
                disabled={!statusTask}
                variant="contained"
              >
                Отправить
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TaskItem;
