import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table, Spin, Alert, Divider, Modal, Button } from 'antd';
import moment from 'moment';
import connect from '../connect';
import { formatNumber } from '../helpers';


class Invoices extends Component {
  state = { visible: false }

  showModal = key => () => {
    this.setState({
      visible: true,
      modalId: key,
    });
  }

  handleCancel = () => {
    this.setState({
      visible: false,
      modalId: null,
    });
  }

  handleOk = () => {
    const { modalId } = this.state;
    this.setState({ visible: false, modalId: null });
    this.props.deleteInvoice(modalId);
  }


  columns = () => [{
    title: 'Create',
    dataIndex: 'date_created',
    key: 'date_created',
    width: 100,
  }, {
    title: 'No',
    dataIndex: 'number',
    key: 'number',
    width: 100,
  }, {
    title: 'Supply',
    dataIndex: 'date_supply',
    key: 'date_supply',
    width: 100,
  }, {
    title: 'Due',
    dataIndex: 'date_due',
    key: 'date_due',
    width: 100,
  }, {
    title: 'Comment',
    dataIndex: 'comment',
    key: 'comment',
    width: 200,
  }, {
    title: 'Action',
    key: 'action',
    width: 100,
    render: record => (
      <span>
        <Link to={`/edit/${record.key}`}>Edit</Link>
        <Divider type="vertical" />
        <Button onClick={this.showModal(record.key)}>Delete</Button>
      </span>
    ),
  }];

  dataSource = () => {
    const { invoicesId, invoicesById } = this.props;
    return invoicesId.map((id) => {
      const {
        date_created: dateCreate,
        date_supply: dateSupply,
        date_due: dateDue,
        number,
        comment,
      } = invoicesById[id];
      return {
        date_created: moment(dateCreate, 'D MMMM YYYY', true).format('DD-MM-YYYY'),
        date_supply: moment(dateSupply, 'D MMMM YYYY', true).format('DD-MM-YYYY'),
        date_due: moment(dateDue, 'D MMMM YYYY', true).format('DD-MM-YYYY'),
        number: formatNumber(number),
        comment,
        key: id,
      };
    });
  }


  render() {
    return (
      <div style={{ padding: '20px', background: '#fff' }}>
        <Spin spinning={this.props.status === 'loading'}>
          <h3>Invoices</h3>
          {
            (this.props.status === 'error') ?
              <Alert message="Something went wrong" type="error" /> :
              <Table dataSource={this.dataSource()} columns={this.columns()}/>
          }
        </Spin>
        <Modal
            title="Delete"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
          <p>Do you want to delete these items?</p>
        </Modal>
      </div>
    );
  }
}

export default connect(state =>
  ({
    invoicesId: state.invoices.allId,
    invoicesById: state.invoices.byId,
    status: state.invoices.status,
  }))(Invoices);
