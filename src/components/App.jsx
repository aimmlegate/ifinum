import React from 'react';
import connect from '../connect';
import Router from './Router';

class App extends React.Component {
  componentDidMount() {
    this.props.getInvoices();
  }
  render = () => <Router/>
}

export default connect()(App);

