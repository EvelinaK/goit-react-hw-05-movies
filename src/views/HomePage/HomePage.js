import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Api from '../../services/Api';
import s from '../HomePage/HomePage.module.css';
import Loader from '../../components/Loader/Loader';
const srcBaseUrl = 'https://image.tmdb.org/t/p/w500';

class HomePage extends Component {
  state = {
    movies: [],
    showLoader: false,
  };

  async componentDidMount() {
    Api.fetchTrendingMovies()
      .then(movies => {
        this.setState(prevState => ({
          movies: [...prevState.movies, ...movies],
          showLoader: true,
        }));
      })
      .finally(() => this.setState({ showLoader: false }));
  }

  render() {
    console.log(this.props.location);
    const { location } = this.props;
    const { movies, showLoader } = this.state;
    return (
      <>
        <ul className={s.ItemList}>
          {movies.map(({ poster_path, title, id, vote_average }) => (
            <li className={s.ImageGalleryItem} key={id}>
              <Link
                className={s.link}
                // to={`${this.props.match.path}movies/${id}`}
                to={{
                  pathname: `${this.props.match.path}movies/${id}`,
                  state: { from: location },
                }}
              >
                <img
                  className={s.ImageGalleryItemImage}
                  src={`${srcBaseUrl}${poster_path}`}
                  alt=""
                />
                <p className={s.rating}>{vote_average}</p>
                <h4 className={s.text}>{title}</h4>
              </Link>
              {showLoader && <Loader />}
            </li>
          ))}
        </ul>
      </>
    );
  }
}

export default withRouter(HomePage);
