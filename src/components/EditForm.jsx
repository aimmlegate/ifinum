import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Row, Col, Form, Button, Icon, Input, DatePicker, Spin, Alert } from 'antd';
import connect from '../store/connect';
import { unFormatNumber, formatNumber, checkUniqInvoice } from '../helpers';


const { TextArea } = Input;
const FormItem = Form.Item;

class EditForm extends React.Component {
  checkUniqInvoiceNumber = (rule, value, callback) => {
    const { number } = this.props.invoicesById[this.props.id];
    const unformatValue = unFormatNumber(value);
    if (number === unformatValue) {
      callback();
    }
    if (checkUniqInvoice(this.props.invoicesById, unformatValue)) {
      callback('must be uniq');
    } else {
      callback();
    }
  }

  componentDidMount() {
    if (this.props.invoicesAllId.lenght === 0) {
      this.props.getInvoices();
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const {
          number,
          dueDate,
          supplyDate,
          comment,
        } = values;
        const request = {
          number: unFormatNumber(number),
          date_supply: moment(supplyDate).format('D MMMM YYYY'),
          date_due: moment(dueDate).format('D MMMM YYYY'),
          comment,
        };
        const { id } = this.props;
        this.props.editInvoice(id, request);
      }
    });
  }

  render() {
    if (this.props.status === 'loading') {
      return <div style={{ textAlign: 'center' }}><Spin/></div>;
    }
    if (this.props.status === 'error') {
      return <Alert message="Something went wrong" type="error" />;
    }
    const { getFieldDecorator } = this.props.form;
    const {
      number,
      date_due: dateDue,
      date_supply: dateSupply,
      comment,
    } = this.props.invoicesById[this.props.id];
    return (
      <div style={{ padding: '20px', background: '#fff' }}>
        <Form onSubmit={this.handleSubmit} style={{ padding: '20px', border: '1px solid #ebedf0' }}>
          <Row gutter={16}>
            <Col className="gutter-row" span={12}>
              <div style={{ marginBottom: '20px' }}>
                <FormItem label="Number:">
                  {
                    getFieldDecorator('number', {
                      initialValue: formatNumber(number),
                      rules: [
                        { required: true },
                        { validator: this.checkUniqInvoiceNumber },
                      ],
                    })(<Input
                      addonAfter={<Icon type="setting" />}
                    />)
                  }
                </FormItem>
              </div>
            </Col>
            <Col className="gutter-row" span={12}>
              <div style={{ marginBottom: '20px' }}>
                <FormItem label="Date due:">
                  {
                    getFieldDecorator('dueDate', {
                      initialValue: moment(dateDue, 'D MMMM YYYY'),
                      rules: [{ required: true }],
                    })(<DatePicker
                        style={{ width: '100%' }}
                        name='dueDate'
                        label='Date due:'
                    />)
                  }
                </FormItem>
              </div>
            </Col>
            <Col className="gutter-row" span={12}>
              <div style={{ marginBottom: '20px' }}>
                <FormItem label="Supply Date:">
                  {
                    getFieldDecorator('supplyDate', {
                      initialValue: moment(dateSupply, 'D MMMM YYYY'),
                      rules: [{ required: true }],
                    })(<DatePicker
                        name='supplyDate'
                        style={{ width: '100%' }}
                        label='Supply Date:'
                    />)
                  }
                </FormItem>
              </div>
            </Col>
            <Col className="gutter-row" span={24}>
              <div style={{ marginBottom: '20px' }}>
                <FormItem label="Comment:">
                  {
                    getFieldDecorator('comment', { initialValue: comment })(<TextArea
                      name='comment'
                      placeholder="Text comment here"
                      autosize={{ minRows: 2, maxRows: 6 }}
                      label='Comment:'
                      />)
                  }
                </FormItem>
              </div>
            </Col>
          </Row>
          <Button type="primary" htmlType="submit" loading={this.props.formStatus === 'loading'}>
            Save
          </Button>
        </Form>
      </div>
    );
  }
}

EditForm.propTypes = {
  status: PropTypes.string,
  formStatus: PropTypes.string,
  invoicesById: PropTypes.object,
  invoicesAllId: PropTypes.array,
  newUniq: PropTypes.string,
  editInvoice: PropTypes.func,
};

export default connect(state =>
  ({
    invoicesById: state.invoices.byId,
    invoicesAllId: state.invoices.allId,
    formStatus: state.formStatus,
    status: state.invoices.status,
  }))(Form.create()(EditForm));

