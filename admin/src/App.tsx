import React from 'react';
import { Route } from 'react-router-dom';
// import { firebase } from './firebase';
import AdminResources from './pages/Resources';
import AdminLesson from './pages/Lesson';
import AdminActivities from './pages/Activities';
import Nav from './components/Nav';
import TransferUsers from './components/TransferUsers';
import TasksPending from './components/TasksPending';

export default function App() {
  // React.useEffect(() => {
  //   firebase.auth().onAuthStateChanged(function (profile) {
  //     if(profile) {
  //       console.log(profile)
  //     }
  //   })
  // },[])

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
        <TasksPending />
      </Route>
    </div>
  );
}
