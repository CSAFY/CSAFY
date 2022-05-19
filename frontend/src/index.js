import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// RECOIL
import { RecoilRoot } from 'recoil';

ReactDOM.render(
  <>
    {/* <React.StrictMode> */}
    <RecoilRoot>
      <React.Suspense fallback={<div>Loading...</div>}>
        <App />
      </React.Suspense>
    </RecoilRoot>
    {/* </React.StrictMode>, */}
  </>,
  document.getElementById('root'),
);
