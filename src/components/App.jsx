import 'antd/dist/antd.css';
import { Button } from 'antd';
import React, { Component } from 'react';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Button type="primary">Primary</Button>
        <Button>Default</Button>
        <Button type="dashed">Dashed</Button>
        <Button type="danger">Danger</Button>
      </div>
    );
  }
}

export default App;
