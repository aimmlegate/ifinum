import React from 'react';
import PropTypes from 'prop-types';
import connect from '../store/connect';
import Router from './Router';

class App extends React.Component {
  componentDidMount() {
    this.props.getInvoices();
  }
  render = () => <Router/>
}

App.propTypes = {
  getInvoices: PropTypes.func,
};

export default connect()(App);

