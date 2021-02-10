import React from 'react';
import LoaderComponent from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import styles from './Loader.module.css';

const Load = () => {
  return (
    <div className={styles.loader}>
      <LoaderComponent
        type="Hearts"
        color="#f52b7f"
        height={100}
        width={100}
        timeout={1000}
      />
    </div>
  );
};

export default Load;
