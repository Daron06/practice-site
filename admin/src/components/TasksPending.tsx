import React from 'react';
import { tasksRef } from '../firebase';
import TaskItem from './TaskItem';

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
          taskId: doc.id,
        });
      });
      setTasksPending(tasks);
    });
  }, []);

  return (
    <div className="admin__table__content--tasks scrollbar">
      <h2 style={{ position: 'sticky', top: 0, backgroundColor: '#fff', zIndex: 500 }}>
        Количество тасков в ожидании: {tasksPending.length}
      </h2>

      {!!tasksPending.length &&
        tasksPending.map((task: any) => {
          return <TaskItem key={task.taskId} taskCurrentUser={task} />;
        })}
    </div>
  );
};

export default TasksPending;
