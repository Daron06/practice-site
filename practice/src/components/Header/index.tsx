import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { IconButton } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Avatar from '@material-ui/core/Avatar';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { Auth } from '../../auth';
import firebase from 'firebase';
import { useSelector } from 'react-redux';
import { lessonRef } from '../../firebase';
import { selectTasksItems } from '../../redux/activities/selectors';

const locationTitle = {
  activities: 'Активность',
  resources: 'Материалы',
  videos: 'Видео',
};

type Pathname = 'activities' | 'resources' | 'videos';

interface HeaderProps {
  userInfo: firebase.UserInfo | null | undefined;
}

const Header: React.FC<HeaderProps> = ({ userInfo }) => {
  const [lessonLength, setLessonLength] = React.useState<number>(0);

  const obj = useLocation();
  const path = obj.pathname.split('/')[1] as Pathname;
  const title = locationTitle[path];
  const tasks = useSelector(selectTasksItems);

  const calcInterest = Math.round(
    (tasks.filter((el: any) => el.status === 'completed').length / lessonLength) * 100
  );

  let history = useHistory();

  React.useEffect(() => {
    lessonRef.get().then((doc) => {
      return setLessonLength(doc.docs.length);
    });
  }, []);

  if (!userInfo) {
    return null;
  }

  const onSignOut = () => {
    Auth.signOut();
  };

  return (
    <header className="header">
      <div className="header__title">
        {obj.pathname.split('/').length > 2 && (
          <div className="header__title-button">
            <IconButton onClick={() => history.goBack()}>
              <ArrowBackIosIcon />
            </IconButton>
          </div>
        )}
        <p className="header__title-item">{title}</p>
      </div>
      <div className="header__user">
        <div className="header__avatar">
          <div className="circle">
            <CircularProgress
              size={52}
              className="circle--primal"
              variant="static"
              value={calcInterest}
              style={{ color: '#0BB89A' }}
            />
            <CircularProgress
              size={52}
              className="circle--secondary"
              variant="static"
              value={100}
            />
          </div>
          <Avatar src={userInfo.photoURL || undefined} />
        </div>

        <div className="header__user__title">
          <span className="header__user__name">
            {userInfo.displayName || userInfo.email || userInfo.uid}
          </span>
          <span className="header__user__info">Поток №1, старт обучения 24 ноября 2020 г.</span>
        </div>
        <div className="header__exit">
          <IconButton onClick={onSignOut}>
            <ExitToAppIcon className="header__exit-icon" />
          </IconButton>
        </div>
      </div>
    </header>
  );
};

export default Header;
