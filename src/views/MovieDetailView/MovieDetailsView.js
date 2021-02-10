import React, { Component, Suspense, lazy } from 'react';
import { Link, NavLink, Route, withRouter } from 'react-router-dom';
import Api from '../../services/Api';
import routes from '../../routes';
import Loader from '../../components/Loader/Loader';
import 'bootstrap/dist/css/bootstrap.min.css';
import s from '../MovieDetailView/MovieDetailsView.module.css';

const Cast = lazy(
  () =>
    import(
      '../../views/MovieCast/MovieCast'
    ) /* webpackChunkName: "MovieCast" */,
);
const Reviews = lazy(
  () =>
    import(
      '../MovieReviews/MovieReviews'
    ) /* webpackChunkName: "MovieReviews" */,
);

const srcBaseUrl = 'https://image.tmdb.org/t/p/w500';
class MovieDetailsView extends Component {
  state = {
    descr: null,
    genres: [],
    id: null,
    title: null,
    author: null,
    isVisibleCast: false,
    isVisibleWiews: false,
  };

  async componentDidMount() {
    const { movieId } = this.props.match.params;
    console.log(movieId);
    Api.fetchMovieDetails(movieId).then(data => {
      this.setState({
        ...data,
      });
      // this.setState({ movie: [...movie] });
      // console.log(this.state.movie);
    });
  }

  BackButton = () => {
    const { location, history } = this.props;
    history.push(location?.state?.from || routes.Home);
    // if (location.state && location.state.from) {
    //   return history.push(location.state.from);
    // }

    // history.push(routes.Home);
  };

  makeVisibleCast = e => {
    console.log(this.state.isVisibleCast);
    this.setState({ isVisibleCast: !this.state.isVisibleCast });
    console.log(this.state);
  };
  makeVisibleReviews = e => {
    this.setState({ isVisibleWiews: !this.state.isVisibleWiews });
  };

  render() {
    const { match } = this.props;

    // console.log(location.state.from);
    const {
      title,
      author,
      descr,
      poster_path,
      vote_average,
      release_date,
      overview,
      original_title,
      genres,
      id,
    } = this.state;

    return (
      <>
        <div className={s.wrapper} onClick={this.BackButton} class="wrapper">
          <button className={s.but}>
            Go Back
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
        <div className={s.moviePageContainer}>
          {this.state && (
            <div className={s.movieDescription}>
              <h2 className={s.movieTitle}>{title}</h2>
              <h3 className={s.movieTitle}>({release_date})</h3>
              <div className={s.movieDetails}>
                <img
                  src={
                    poster_path !== null
                      ? `${srcBaseUrl}${poster_path}`
                      : 'https://dummyimage.com/480x600/2a2a2a/ffffff&text=foto'
                  }
                  alt={title}
                />

                <div className={s.textContainer}>
                  <p className={s.ratingText}>
                    {' '}
                    Rating:{`${vote_average * 10} %`}
                  </p>

                  <h3>Overview</h3>
                  {overview ? <p>{overview}</p> : 'No overwiev for this film'}
                  <h3>Genres</h3>
                  <ul className={s.listOfGenres}>
                    {genres.map(genre => (
                      <li key={genre.id}>{genre.name}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
          <span>Additional information</span>
          {
            <div>
              <ul>
                <li>
                  <NavLink
                    className={s.but}
                    to={`${match.url}/cast`}
                    onClick={this.makeVisibleCast}
                  >
                    Cast
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    className={s.but}
                    to={`${match.url}/reviews`}
                    onClick={this.makeVisibleReviews}
                  >
                    Reviews
                  </NavLink>
                </li>
              </ul>
              <Suspense fallback={<Loader />}>
                {this.state.isVisibleCast ? (
                  <Route path={`${routes.MovieCast}`} component={Cast} />
                ) : null}

                {this.state.isVisibleWiews ? (
                  <Route path={`${routes.MovieReviews}`} component={Reviews} />
                ) : null}
              </Suspense>
            </div>
          }
        </div>
      </>
    );
  }
}
export default withRouter(MovieDetailsView);
