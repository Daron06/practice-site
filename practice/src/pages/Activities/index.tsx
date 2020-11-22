import React from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import TaskItem from '../../components/TaskItem';
import { setTasks, Task } from '../../redux/activities/actions';
import { useDispatch, useSelector } from 'react-redux';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import { tasksRef } from '../../firebase';

import EmptyTasksSvg from '../../assets/img/empty-tasks.svg';
import { selectTasksItems } from '../../redux/activities/selectors';

const Activities = ({ userId, lessonLength }: any) => {
  const dispatch = useDispatch();
  const tasks = useSelector(selectTasksItems);

  React.useEffect(() => {
    if (!tasks.length) {
      tasksRef
        .where('uid', '==', userId)
        .orderBy('createdAt', 'asc')
        .onSnapshot(function (querySnapshot: any) {
          const items: Task[] = [];

          querySnapshot.forEach(function (doc: any) {
            const data = doc.data();
            items.push({
              ...data,
              taskId: doc.id,
              createdAt: data.createdAt.toDate(),
              responseAt: data.responseAt?.toDate(),
            });
          });

          dispatch(setTasks(items));
        });
    }
  }, [dispatch, userId, tasks.length]);

  return (
    <div className="activities">
      <div className="activities__wrapper">
        <div className="item-wrapper">
          <div className="activities__tasks">
            <h2>Задания</h2>
            <div className="activities__list scrollbar">
              {tasks.length > 0 ? (
                tasks.map(({ taskId, number, status, createdAt, responseAt }) => (
                  <Link key={taskId} className="activities__task" to={`/activities/${taskId}`}>
                    <ListItem button>
                      <TaskItem
                        id={taskId}
                        number={number}
                        status={status}
                        createdAt={new Date(createdAt)}
                        responseAt={new Date(responseAt)}
                      />
                    </ListItem>
                    <Badge
                      style={{ marginLeft: -55, marginTop: 28, color: 'grey' }}
                      color="secondary"
                      badgeContent={0}
                      variant="dot"
                    >
                      <MailIcon />
                    </Badge>
                  </Link>
                ))
              ) : (
                <div className="activities__tasks--not">
                  <img src={EmptyTasksSvg} alt="Empty tasks" />
                  <p>
                    Вы ещё не выполнили ни одного задания, чтобы приступить к выполнению, перейдите
                    во вкладку
                    <br />
                    <b>"Видеоуроки"</b>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="item-wrapper">
        <div className="activities__complete">
          <h2>Выполнено заданий</h2>
          {tasks && (
            <span>
              {tasks.filter((el: any) => el.status === 'completed').length}/{lessonLength}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Activities;
