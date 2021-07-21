import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import OpenInterestTable from './components/OpenInterestTable';
import NavBar from './components/NavBar';

ReactDOM.render(
  <React.StrictMode>
      <div>
          <NavBar />
          <OpenInterestTable />
      </div>
  </React.StrictMode>,
  document.getElementById('root')
);
