import React, { Component } from 'react';
import Api from '../../services/Api';

class MovieReviews extends Component {
  state = {
    reviews: [],
  };

  async componentDidMount() {
    const { movieId } = this.props.match.params;

    Api.fetchMovieReviews(movieId).then(review => {
      console.log(review);
      this.setState({
        reviews: review,
      });
    });
  }

  render() {
    const { reviews } = this.state;
    return (
      <>
        {this.state && (
          <>
            <ul>
              {reviews.map(({ id, author, name, content }) => (
                <li key={id}>
                  <h3>{name}</h3>
                  <span>Aauthor: {author}</span>
                  <p>{content}</p>
                </li>
              ))}
            </ul>
            );
          </>
        )}
      </>
    );
  }
}

export default MovieReviews;
