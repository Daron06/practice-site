import React from 'react';
import { Route } from 'react-router-dom';
import AdminResources from './pages/Resources';
import AdminLesson from './pages/Lesson';
import AdminActivities from './pages/Activities';
import Nav from './components/Nav';
import TransferUsers from './components/TransferUsers';
import TasksPending from './components/TasksPending';
import NewMessages from './components/NewMessages';

export const ADMIN_ID: string = '12086860';
export const ADMIN_AVATAR: string = 'https://avatars3.githubusercontent.com/u/12086860?v=4';
export default function App() {
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
