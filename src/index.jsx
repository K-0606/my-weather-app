import React from 'react';
// import ReactDOM from 'react-dom';
import ReactDOM from 'react-dom/client';
import WeatherApp from './WeatherApp';

import './styles.css';

function App() {
  return <WeatherApp />;
}

const rootElement = document.getElementById('root');
// ReactDOM.render(<App />, rootElement);
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
