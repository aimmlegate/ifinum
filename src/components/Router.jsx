import { Route, Switch, BrowserRouter } from 'react-router-dom';
import React from 'react';
import Main from './Main';
import Create from './Create';

const Router = () =>
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Main}/>
      <Route path='/new' render={props => <Create {...props} title='New Invoice' isNew={true}/>}/>
      <Route path='/edit' render={props => <Create {...props} title='New Invoice' isNew={false}/>}/>
    </Switch>
  </BrowserRouter>;

export default Router;
