import React from 'react';
import { NavLink } from 'react-router-dom';
import routes from '../../routes';
import s from '../Navigation/Navigation.module.css';

const Navigation = () => {
  return (
    <>
      <nav>
        <NavLink
          exact
          to={routes.Home}
          className={s.NavLink}
          activeClassName={s.activeLink}
        >
          HomePage
        </NavLink>

        <NavLink
          to={routes.Movies}
          className={s.NavLink}
          activeClassName={s.activeLink}
        >
          Movies Page
        </NavLink>
      </nav>
    </>
  );
};
export default Navigation;
