import React from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import s from '../FilmList/FilmList.module.css';

const FilmList = ({ movies, match, location }) => {
  return (
    <div className={s.moviesContainer}>
      <ul className={s.list}>
        {movies.map(({ title, id }) => (
          <Link
            className={s.link}
            to={{
              pathname: `${match.url}/${id}`,
              state: { from: location },
            }}
          >
            <li key={id}>{title}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default withRouter(FilmList);
