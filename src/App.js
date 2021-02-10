import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';

// import HomePage from './views/HomePage/HomePage';
// import MoviesPage from './views/MoviePage/MoviesPage';
// import MovieDetailsView from './views/MovieDetailView/MovieDetailsView';
// import MovieCast from './views/MovieCast/MovieCast';
// import MovieReviews from './views/MovieReviews/MovieReviews';
import AppBar from './components/AppBar/AppBar';
import Loader from './components/Loader/Loader';
import routes from './routes';

const HomePage = lazy(() =>
  import('./views/HomePage/HomePage' /* webpackChunkName: "HomePage" */),
);
const MovieDetailsView = lazy(() =>
  import(
    './views/MovieDetailView/MovieDetailsView' /* webpackChunkName: "MovieDetailsView" */
  ),
);
const MoviesPage = lazy(() =>
  import('./views/MoviePage/MoviesPage' /* webpackChunkName: "MoviesPage" */),
);
// const MovieCast = lazy(() =>
//   import('./views/MovieCast/MovieCast' /* webpackChunkName: "MovieCast" */),
// );
// const MovieReviews = lazy(() =>
//   import(
//     './views/MovieReviews/MovieReviews' /* webpackChunkName: "MovieReviews" */
//   ),
// );
const App = () => (
  <>
    <AppBar />
    <Suspense fallback={<Loader />}>
      <Switch>
        <Route exact path={routes.Home} component={HomePage} />
        <Route path={routes.MovieDetails} component={MovieDetailsView} />
        <Route path={routes.Movies} component={MoviesPage} />
        {/* <Route path={routes.MovieCast} component={MovieCast} />
        <Route path={routes.MovieReviews} component={MovieReviews} /> */}
      </Switch>
    </Suspense>
  </>
);

export default App;
