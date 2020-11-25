import { IconButton } from '@material-ui/core'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import React from 'react'
import { useHistory, useLocation } from 'react-router-dom';

const locationTitle = {
  activities: 'Активность',
  resources: 'Материалы',
  videos: 'Видео',
};

type Pathname = 'activities' | 'resources' | 'videos';

export const Title = () => {
  const location = useLocation();
  const path = location.pathname.split('/')[1] as Pathname;
  const title = locationTitle[path];
  let history = useHistory();
  
  return (
    <div className="header__title">
      {location.pathname.split('/').length > 2 && (
        <div className="header__title-button">
          <IconButton onClick={() => history.goBack()}>
            <ArrowBackIosIcon />
          </IconButton>
        </div>
      )}
      <p className="header__title-item">{title}</p>
    </div>
  )
}
