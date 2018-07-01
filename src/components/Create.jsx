import { Layout, Divider } from 'antd';
import React from 'react';
import CreateForm from './CreateForm';

const { Content } = Layout;

const Create = props =>
  <Layout style={{ minHeight: '100vh' }}>
    <Content style={{ padding: '20px' }}>
      <Divider orientation="left">
        <h1>{props.title}</h1>
      </Divider>
      <CreateForm/>
    </Content>
  </Layout>;

export default Create;
