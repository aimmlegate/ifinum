import { Route, Switch, BrowserRouter } from 'react-router-dom';
import React from 'react';
import Main from './Main';
import Form from './Form';

const Router = () =>
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Main}/>
      <Route path='/new' render={props => <Form {...props} title='New Invoice' isNew={true}/>}/>
      <Route path='/edit/:id' render={props => <Form {...props} title='Edit Invoice' isNew={false}/>}/>
    </Switch>
  </BrowserRouter>;

export default Router;
