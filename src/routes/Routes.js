import React from 'react';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import App from '../pages/App'

function App() {
  return (
    <BrowserRouter>
    <Switch>
      <Route path="/" component={App} />
    </Switch>
    </BrowserRouter>
  );
}

export default App;