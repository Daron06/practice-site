import React from 'react';
import logo from '../../assets/img/logo.svg';
import { ButtonBase } from '@material-ui/core';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import ListAltIcon from '@material-ui/icons/ListAlt';
import YouTubeIcon from '@material-ui/icons/YouTube';
import Tooltip from '@material-ui/core/Tooltip';
import { NavLink } from 'react-router-dom';
const Nav = () => {
  return (
    <div className="nav">
      <ul>
        <li>
          <ButtonBase className="nav__item">
            <span className="nav__backdrop" />
            <span className="nav__button">
              <img alt="Archakov blog logotype" src={logo} />
            </span>
          </ButtonBase>
        </li>
        <li>
          <NavLink to="/activities" activeClassName="nav__selected">
            <Tooltip title="Ваша деятельность" arrow placement="right">
              <ButtonBase className="nav__item">
                <span className="nav__backdrop" />
                <span className="nav__button">
                  <EqualizerIcon
                    fontSize="large"
                    className="nav__button__item"
                  />
                </span>
              </ButtonBase>
            </Tooltip>
          </NavLink>
        </li>
        <li>
          <NavLink to="/resources" activeClassName="nav__selected">
            <Tooltip title="Дополнительные ресурсы" arrow placement="right">
              <ButtonBase className="nav__item">
                <span className="nav__backdrop" />
                <span className="nav__button">
                  <ListAltIcon fontSize="large" className="nav__button__item" />
                </span>
              </ButtonBase>
            </Tooltip>
          </NavLink>
        </li>
        <li>
          <NavLink to="/videos" activeClassName="nav__selected">
            <Tooltip title="Видео уроки" arrow placement="right">
              <ButtonBase className="nav__item">
                <span className="nav__backdrop" />
                <span className="nav__button">
                  <YouTubeIcon fontSize="large" className="nav__button__item" />
                </span>
              </ButtonBase>
            </Tooltip>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Nav;
