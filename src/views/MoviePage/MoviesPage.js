import React, { Component } from 'react';
import Api from '../../services/Api';
import FilmList from '../../components/FilmList/FilmList';
import styles from './MoviesPage.module.css';
import Loader from '../../components/Loader/Loader';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class MoviesPage extends Component {
  state = {
    movies: [],
    query: '',
    showLoader: false,
  };

  handleChange = event => {
    this.setState({ query: event.currentTarget.value.toLowerCase() });
  };
  handleSubmit = event => {
    event.preventDefault();
    console.log(this.state);
    if (this.state.query.trim() === '') {
      toast.info('Enter your request');
      return;
    }

    const { query } = this.state;
    Api.fetchMoviesByQuery(query)
      .then(data => {
        console.log(data);
        this.setState({
          movies: data,
          showLoader: true,
          query: query,
        });
        console.log(this.state);
      })
      .finally(() => this.setState({ query: '', showLoader: false }));
  };

  render() {
    // console.log(this.props);
    // console.log(this.props.location);
    const { location } = this.props;
    const { showLoader } = this.state;
    console.log(location);
    return (
      <>
        <>
          <header className={styles.Searchbar}>
            <div id="all">
              <form onSubmit={this.handleSubmit}>
                <input
                  type="text"
                  autoComplete="off"
                  autoFocus
                  placeholder="Search movies here"
                  value={this.state.query}
                  onChange={this.handleChange}
                />
                <div className={styles.line}></div>
              </form>
            </div>
          </header>
          {showLoader && <Loader />}
          <FilmList {...this.props} movies={this.state.movies} />
        </>
      </>
    );
  }
}

export default MoviesPage;
