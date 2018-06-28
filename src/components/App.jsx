import { Layout } from 'antd';
import React from 'react';
import Invoices from './Invoices';

const { Content } = Layout;

const App = () =>
  <Layout style={{ minHeight: '100vh' }}>
    <Content style={{ padding: '20px' }}>
      <h1>Invoices</h1>
      <Content style={{ padding: '20px', background: '#fff' }}>
        <h3>Invoices</h3>
        <Invoices />
      </Content>
    </Content>
  </Layout>;

export default App;
