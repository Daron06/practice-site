import React from 'react';
import { Route } from 'react-router-dom';
import AdminResources from './pages/Resources';
import AdminLesson from './pages/Lesson';
import News from './pages/News';
import AdminActivities from './pages/Activities';
import Nav from './components/Nav';

import { useDispatch } from 'react-redux';
import { tasksRef, usersRef, firebase } from './firebase';
import { setTasks } from './redux/tasks/actions';
import { ITask } from './redux/tasks/types';
import { setUsers } from './redux/users/actions';
import { IUser } from './redux/users/types';
import { Auth } from './auth';

export const ADMIN_ID: string = '12086860';
export const ADMIN_NAME: string = 'Арчаков Дэннис';
export const ADMIN_AVATAR: string = 'https://avatars3.githubusercontent.com/u/12086860?v=4';

export default function App() {
  const [admin, setAdmin] = React.useState(false);
  const dispatch = useDispatch();

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged(function (profile) {
      if (profile) {
        usersRef
          .doc(profile.uid)
          .get()
          .then((doc) => {
            if (doc.exists) {
              setAdmin(doc.data()?.admin || false);
            }
          });
      }
    });

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
          uid: doc.data().uid,
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

  const handleSignInClick = () => {
    Auth.signIn();
  };

  // if (!admin) {
    // return (
      
    // );
  // }

  return (
    <div className="App">
      <div className="signin__item">
        <h1>Вход в кабинет</h1>
        <button onClick={handleSignInClick}>Войти через GitHub</button>
      </div>
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
        <News />
      </Route>
    </div>
  );
}
