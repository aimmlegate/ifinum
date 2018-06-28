import React, { Component } from 'react';
import { Table, Spin, Alert } from 'antd';
import dayjs from 'dayjs';
import connect from '../connect';


class Invoices extends Component {
  componentDidMount() {
    this.props.getInvoices();
  }

  columns = () => [{
    title: 'Create',
    dataIndex: 'date_created',
    key: 'date_created',
  }, {
    title: 'No',
    dataIndex: 'number',
    key: 'number',
  }, {
    title: 'Supply',
    dataIndex: 'date_supply',
    key: 'date_supply',
  }, {
    title: 'Comment',
    dataIndex: 'comment',
    key: 'comment',
  }];

  dataSource = () => {
    const { invoicesId, invoicesById } = this.props;
    return invoicesId.map((id) => {
      const {
        date_created: dateCreate,
        date_supply: dateSupply,
        number,
        comment,
      } = invoicesById[id];
      return {
        date_created: dayjs(dateCreate).format('DD-MM-YYYY'),
        date_supply: dayjs(dateSupply).format('DD-MM-YYYY'),
        number: `INV-${number}`,
        comment,
        key: id,
      };
    });
  }


  render() {
    return (
      <Spin spinning={this.props.status === 'loading'}>
        {
          (this.props.status === 'error') ?
            <Alert message="Something went wrong" type="error" /> :
            <Table dataSource={this.dataSource()} columns={this.columns()}/>
        }
      </Spin>
    );
  }
}

export default connect(state =>
  ({
    invoicesId: state.invoices.allId,
    invoicesById: state.invoices.byId,
    status: state.invoices.status,
  }))(Invoices);
