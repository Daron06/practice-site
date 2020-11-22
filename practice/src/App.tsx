import React from 'react';
import { Redirect, Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { firebase, usersRef, lessonRef } from './firebase';

import SignIn from './pages/SignIn';
import MessagesTask from './components/MessagesTask';
import ResourcesItem from './components/ResourcesItem';
import VideosItem from './components/VideosItem';
import Activities from './pages/Activities';
import Resources from './pages/Resources';
import Videos from './pages/Videos';
import { CircularProgress } from '@material-ui/core';
import { Layout } from './components/Layout';

function App() {
  const history = useHistory();
  const location = useLocation();
  const [user, setUser] = React.useState<firebase.User>();
  const [isPaid, setIsPaid] = React.useState<boolean>(false);
  const [isReady, setIsReady] = React.useState(false);
  const [userId, setUserId] = React.useState<any>();
  const [lessonLength, setLessonLength] = React.useState<number>(0);

  React.useEffect(() => {
    lessonRef.get().then((doc: any) => {
      setLessonLength(doc.docs.length);
    });
  }, []);

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged(function (profile) {
      if (profile) {
        setUser(profile);
        const userInfo = usersRef.doc(profile.providerData[0]?.uid);
        setUserId(profile.providerData[0]?.uid);
        userInfo.get().then((doc) => {
          if (!doc.exists) {
            userInfo.set({
              uid: profile.providerData[0]?.uid,
              displayName: profile.providerData[0]?.displayName,
              photoURL: profile.providerData[0]?.photoURL,
              email: profile.providerData[0]?.email,
              accepted: false,
              learningFlow: 1,
            });
          }
          if (doc.data()?.accepted) {
            setIsPaid(true);
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

  if (!isReady) {
    return (
      <div className="content__center">
        <CircularProgress size={60} thickness={6} />
      </div>
    );
  }

  return (
    <div className="app">
      <div className="content">
        <Route exact path="/">
          <SignIn userId={user?.providerData[0]?.uid} isPaid={isPaid} />
        </Route>

        <Route path="/:nahuy">
          <Layout user={user}>
            <Switch>
              <Route exact path="/activities">
                <Activities userId={userId} lessonLength={lessonLength} />
              </Route>

              <Route exact path="/resources">
                <Resources />
              </Route>

              <Route exact path="/videos">
                <Videos />
              </Route>

              <Route path="/activities/:id">
                <MessagesTask userId={userId} />
              </Route>

              <Route path="/resources/:id">
                <ResourcesItem />
              </Route>

              <Route path="/videos/:id">
                <VideosItem userId={userId} />
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
