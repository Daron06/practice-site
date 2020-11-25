import React from 'react';
import { Route } from 'react-router-dom';
import AdminResources from './pages/Resources';
import AdminLesson from './pages/Lesson';
import AdminActivities from './pages/Activities';
import Nav from './components/Nav';
import TransferUsers from './components/TransferUsers';
import TasksPending from './components/TasksPending';
import NewMessages from './components/NewMessages';

import { useDispatch } from 'react-redux';
import { tasksRef, usersRef } from './firebase';
import { setTasks } from './redux/tasks/actions';
import { ITask } from './redux/tasks/types';
import { setUsers } from './redux/users/actions';
import { IUser } from './redux/users/types';

export const ADMIN_ID: string = '12086860';
export const ADMIN_AVATAR: string = 'https://avatars3.githubusercontent.com/u/12086860?v=4';

export default function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    tasksRef.onSnapshot((querySnapshot) => {
      const items: ITask[] = [];
      querySnapshot.forEach((doc) => {
        items.push({
          number: doc.data().number,
          status: doc.data().status,
          taskId: doc.id,
          createdAt: doc.data().createdAt,
          responseAt: doc.data()?.responseAt,
          newTask: doc.data().newTask,
          description: doc.data()?.description,
          reference: doc.data()?.reference,
        });
      });
      dispatch(setTasks(items));
    });
  }, [dispatch]);

  React.useEffect(() => {
    usersRef.onSnapshot((querySnapshot) => {
      const user: IUser[] = [];

      querySnapshot.forEach((doc) => {
        user.push({
          accepted: doc.data().accepted,
          displayName: doc.data()?.displayName,
          email: doc.data()?.email,
          learningFlow: doc.data().learningFlow,
          photoURL: doc.data()?.photoURL,
          uid: doc.data().uid,
        });
      });
      dispatch(setUsers(user));
    });
  }, [dispatch]);

  return (
    <div className="App">
      <Nav />
      <Route exact path="/lesson">
        <AdminLesson />
      </Route>
      <Route exact path="/resources">
        <AdminResources />
      </Route>
      <Route exact path="/users">
        <AdminActivities />
      </Route>
      <Route exact path="/">
        <TransferUsers />
        <div className="admin__table__content">
          <TasksPending />
          <NewMessages />
        </div>
      </Route>
    </div>
  );
}
