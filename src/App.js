import React from 'react';
import { Provider } from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';

import Pages from './pages';
import store from './store'
const App = () => {
  console.log('-----app');
  return (
    <Provider store={store}>
      <Router>
        <Pages />
      </Router>
   </Provider>
  );
};

export default App;
