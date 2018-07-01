import { Layout } from 'antd';
import React from 'react';
import CreateForm from './CreateForm';
import EditForm from './EditForm';

const { Content } = Layout;

const Form = props =>
  <Layout style={{ minHeight: '100vh' }}>
    <Content style={{ padding: '20px' }}>
      <h1>{props.title}</h1>
      {(props.isNew) ? <CreateForm/> : <EditForm id={props.match.params.id}/> }
    </Content>
  </Layout>;

export default Form;
