import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
import Api from '../../services/Api';
import styles from './MovieCast.module.css';
const srcBaseUrl = 'https://image.tmdb.org/t/p/w500';

class MovieCast extends Component {
  state = {
    casts: [],
  };

  async componentDidMount() {
    const { movieId } = this.props.match.params;
    console.log(movieId);
    console.log(this.props.match.params);
    console.log(this.props.match);
    Api.fetchMovieCast(movieId).then(cast => {
      console.log(cast);
      this.setState({
        casts: cast,
      });
    });

    console.log(this.state.casts);
  }

  render() {
    const { match } = this.props;
    return (
      <>
        {this.state && (
          <>
            <ul className={styles.list}>
              {this.state.casts.map(({ id, profile_path, name, character }) => (
                <div className={styles.listWrapper}>
                  <li className={styles.listItem} key={id}>
                    <img
                      className={styles.listItemImage}
                      src={
                        profile_path !== null
                          ? `${srcBaseUrl}${profile_path}`
                          : 'https://dummyimage.com/480x600/2a2a2a/ffffff&text=foto'
                      }
                      // src={`${srcBaseUrl}${profile_path}`}
                      alt=""
                    />
                    <h3>{name}</h3>
                    <span className={styles.listItemCont}>
                      Charachter: {character}
                    </span>
                  </li>
                </div>
              ))}
            </ul>
          </>
        )}
      </>
    );
  }
}

export default MovieCast;

// import { useParams } from "react-router-dom";
// import { useState, useEffect } from "react";
// import Api from "../../services/Api";

// export default function Cast() {
//   const { movieId } = useParams();
//   const [cast, setCast] = useState(null);
//   const srcBaseUrl = "https://image.tmdb.org/t/p/w500";

//   useEffect(() => {
//     const renderMovieCast = () => {
//       Api.fetchMovieCast(movieId).then(setCast);
//     };
//     renderMovieCast();
//   }, [movieId]);

//   return (
//     <>
//       {cast && (
//         <>
//           <ul>
//             {cast.map(({ id, profile_path, name, character }) => (
//               <li key={id}>
//                 <img src={`${srcBaseUrl}${profile_path}`} alt="" />
//                 <h3>{name}</h3>
//                 <span>Charachter: {character}</span>
//               </li>
//             ))}
//           </ul>
//         </>
//       )}
//     </>
//   );
// }
