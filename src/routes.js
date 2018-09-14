import React from 'react';
import Home from './components/Home';
import NotFound from './components/NotFound';
import Login from './components/Login';

const routes = [
  {
    path: '/',
    exact: true,
    main : () => <Home />
  },
  {
    path: '/login',
    exact: true,
    main: ({location}) => <Login location={location} />
  },
  {
    path: '',
    exact: true,
    main : () => <NotFound />
  }
]

export default routes;
