import React, { Component } from 'react';
import { Table, Spin, Alert } from 'antd';
import dayjs from 'dayjs';
import connect from '../connect';
import { formatNumber } from '../helpers';


class Invoices extends Component {
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
    title: 'Comment',
    dataIndex: 'comment',
    key: 'comment',
    width: 200,
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
