import { Layout, Button } from 'antd';
import { Link } from 'react-router-dom';
import React from 'react';
import Invoices from './Invoices';

const { Content } = Layout;

const Main = () =>
  <Layout style={{ minHeight: '100vh' }}>
    <Content style={{ padding: '20px' }}>
      <h1>Invoices</h1>
      <div style={{ padding: '20px', background: '#fff', marginBottom: '20px' }}>
        <h3>Actions</h3>
        <Link to='/new'>
          <Button type="primary" size={'large'}>Add new</Button>
        </Link>
      </div>
      <Invoices />
    </Content>
  </Layout>;

export default Main;
