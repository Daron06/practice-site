import React from 'react';
import { useSelector } from 'react-redux';
import { selectTasksItems } from '../redux/tasks/selectors';
import { ITask } from '../redux/tasks/types';
import TaskItem from './TaskItem';

const TasksPending = ({ setOpen, setTaskId }: any) => {
  const [tasksPending, setTasksPending] = React.useState<ITask[]>([]);
  const tasks = useSelector(selectTasksItems);

  React.useEffect(() => {
    setTasksPending(tasks.filter((el) => el.status === 'pending'));
  }, [tasks]);

  return (
    <div className="admin__table__content--tasks scrollbar">
      <h2 style={{ position: 'sticky', top: 0, backgroundColor: '#fff', zIndex: 500 }}>
        Количество тасков в ожидании: {tasksPending.length}
      </h2>

      {!!tasksPending.length &&
        tasksPending.map((task: any) => {
          return (
            <TaskItem
              key={task.taskId}
              tasksPending={true}
              setTaskId={setTaskId}
              setOpen={setOpen}
              taskCurrentUser={task}
            />
          );
        })}
    </div>
  );
};

export default TasksPending;
