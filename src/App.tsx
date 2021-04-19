import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import useReactRouter from 'use-react-router';
import Button from '@material-ui/core/Button';

import logo from './logo.svg';
import './App.css';

function Hello() {
  const { history, location, match } = useReactRouter();
  return (
    <div>
      <h1>HelloWorld</h1>
      <p>{`pathname: ${location.pathname}`}</p>
      <Button color="primary" variant="contained" onClick={() => history.push('/react')}>Next</Button>
    </div>
  );
}

function HelloReact() {
  const { history, location, match } = useReactRouter();
  return (
    <div>
      <h1>HelloReact</h1>
      <p>{`pathname: ${location.pathname}`}</p>
      <Button color="secondary" variant="contained" onClick={() => history.push('/')}>Next</Button>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Button variant="contained" onClick={() => {console.log('↓'); waiwai(); console.log('↑');}}>xxxx</Button>
        <Router>
          <Switch>
            <Route path="/" component={Hello} exact />
            <Route path="/react" component={HelloReact} exact />
          </Switch>
        </Router>
      </header>
    </div>
  );
}

function waiwai() {
  fetch("http://localhost:8080/greeting", 
  {
    mode: 'cors'
  }).then((res) => res.json()).then(json => {
    console.log(json);
  });
}
export default App;
