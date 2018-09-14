import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Menu from './components/Menu'
import routes from './routes';

class App extends Component {
  showContentMenus = (routes) => {
    var result = null;
    if(routes.length > 0){
      result = routes.map((route, index) => {
        return <Route key={index} path={route.path} component={route.main} exact={route.exact} />
      })
    }
    return result;
  }
  render() {
    return (
      <div>
        <Menu />
        <Switch>
          {this.showContentMenus(routes)}
        </Switch>
      </div>
    );
  }
}

export default App;
