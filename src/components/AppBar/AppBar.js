import Navigation from '../Navigation/Navigation';
import s from '../AppBar/AppBar.module.css';
import React from 'react';

export default function AppBar() {
  return (
    <header className={s.header}>
      <Navigation />
    </header>
  );
}
