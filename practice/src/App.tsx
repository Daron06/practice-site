import React from 'react';
import { Redirect, Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { firebase, usersRef, lessonsRef } from './firebase';

import SignIn from './pages/SignIn';
import MessagesTask from './components/MessagesTask';
import ResourcesItem from './components/ResourcesItem';
import VideosItem from './components/VideosItem';
import Activities from './pages/Activities';
import Resources from './pages/Resources';
import Videos from './pages/Videos';
import { CircularProgress } from '@material-ui/core';
import { Layout } from './components/Layout';
import { Auth } from './auth';

function App() {
  const history = useHistory();
  const location = useLocation();
  const [user, setUser] = React.useState<any>();
  const [isPaid, setIsPaid] = React.useState<boolean>(false);
  const [isReady, setIsReady] = React.useState(false);
  const [lessonsLength, setLessonsLength] = React.useState<number>(0);

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged(function (profile) {
      if (profile) {
        const userInfo = usersRef.doc(profile.uid);

        userInfo.get().then((doc) => {
          // Если юзера нет, то добавляем его в активированные
          if (!doc.exists) {
            userInfo.set({
              uid: profile.uid,
              displayName: profile.providerData[0]?.displayName,
              photoURL: profile.providerData[0]?.photoURL,
              email: profile.providerData[0]?.email,
              createdAt: new Date(),
              accepted: false,
              learningFlow: false,
              admin: false,
            });
          }
          setUser(doc.data());
          // Если юзер оплачен, то перекидываем его в /activities
          if (doc.data()?.accepted) {
            setIsPaid(true);
            setUser(doc.data());
            lessonsRef
              .where('learningFlow', '==', doc?.data()?.learningFlow)
              .get()
              .then((doc: any) => {
                setLessonsLength(doc.docs.length);
              });
            if (location.pathname === '/') {
              history.push('/activities');
            }
          }

          setIsReady(true);
        });
      } else {
        setUser(undefined);
        setIsPaid(false);
        setIsReady(true);
        history.push('/');
      }
    });
  }, [history, location.pathname]);

  React.useEffect(() => {
    if (isReady) {
      if (location.pathname !== '/' && !isPaid) {
        Auth.signOut();
        history.push('/');
      }
    }
  }, [isReady, location.pathname, isPaid, history]);

  if (!isReady) {
    return (
      <div className="content__center">
        <CircularProgress variant="indeterminate" size={60} thickness={6} />
      </div>
    );
  }

  return (
    <div className="app">
      <div className="content">
        <Route exact path="/">
          <SignIn userId={user?.uid} isPaid={isPaid} />
        </Route>

        <Route path="/:nahuy">
          <Layout user={user}>
            <Switch>
              <Route exact path="/activities">
                {user && <Activities userId={user?.uid} lessonsLength={lessonsLength} />}
              </Route>

              <Route exact path="/resources">
                <Resources />
              </Route>

              <Route exact path="/videos">
                <Videos userLearningFlow={user?.learningFlow} />
              </Route>

              <Route path="/activities/:id">
                <MessagesTask userId={user?.uid} />
              </Route>

              <Route path="/resources/:id">
                <ResourcesItem />
              </Route>

              <Route path="/videos/:id">
                <VideosItem user={user} />
              </Route>

              <Route>
                <Redirect to="/activities" />
              </Route>
            </Switch>
          </Layout>
        </Route>
      </div>
    </div>
  );
}

export default App;
