import { Badge, Button } from '@material-ui/core';
import { format } from 'date-fns';
import React from 'react';
import MailIcon from '@material-ui/icons/Mail';
import DeleteIcon from '@material-ui/icons/Delete';
import { tasksRef } from '../firebase';

export interface TaskItemProps {
  status: 'completed' | 'rejected' | 'pending';
  id: string;
  number: number;
  createdAt: Date;
  responseAt?: Date;
  newTask: boolean;
  description?: string;
}

const TasksPending = () => {
  const [tasksPending, setTasksPending] = React.useState<any[]>([]);

  React.useEffect(() => {
    tasksRef.where('status', '==', 'pending').onSnapshot(function (querySnapshot: any) {
      const tasks: TaskItemProps[] = [];
      querySnapshot.forEach(function (doc: any) {
        tasks.push({
          ...doc.data(),
          id: doc.id,
        });
      });
      setTasksPending(tasks);
    });
  }, []);

  const onDeleteTask = (id: string) => {
    console.log(id);
  };

  const onGetMessages = (id: string) => {
    console.log(id);
  };
  // console.log(tasksPending);
  return (
    <div className="admin__table__content--tasks scrollbar">
      {!!tasksPending.length &&
        tasksPending.map((task: any) => {
          return (
            <div
              className={`admin__table__content--task admin__${task.status}`}
              key={task.createdAt}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <span style={{ fontWeight: 500, fontSize: 24 }}>{task.status}</span>
                  <span
                    style={{
                      color: 'gray',
                      fontWeight: 500,
                      fontSize: 19,
                      paddingLeft: 10,
                    }}
                  >
                    {format(task.createdAt.toDate(), 'dd.MM.yyyy - HH:mm')}
                  </span>
                </div>
                <span style={{ fontWeight: 600, fontSize: 24 }}>{'Урок №' + task.number}</span>
              </div>

              <p>{'ссылка на гитхаб: ' + task.reference}</p>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <Button variant="contained" color="primary" onClick={() => onGetMessages(task)}>
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

                <Button
                  color="secondary"
                  onClick={() => onDeleteTask(task.id)}
                  startIcon={<DeleteIcon />}
                >
                  DELETE
                </Button>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default TasksPending;
