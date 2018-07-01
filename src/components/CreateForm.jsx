import React from 'react';
import moment from 'moment';
import { Row, Col, Form, Button, Icon, Input, DatePicker } from 'antd';
import connect from '../connect';
import { unFormatNumber, formatNumber, checkUniqInvoice } from '../helpers';


const { TextArea } = Input;
const FormItem = Form.Item;

class CreateForm extends React.Component {
  componentDidUpdate() {
    if (this.props.formStatus === 'reset') {
      this.props.form.resetFields();
    }
  }

  componentDidMount() {
    this.props.getInvoices();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const {
          number,
          invoiceDate,
          supplyDate,
          comment,
        } = values;
        const request = {
          number: unFormatNumber(number),
          date_supply: moment(supplyDate).format('D MMMM YY'),
          date_created: moment().format('D MMMM YY'),
          date_due: moment(invoiceDate).format('D MMMM YY'),
          comment,
        };
        this.props.postInvoices(request);
      }
    });
  }

  checkUniqInvoiceNumber = (rule, value, callback) => {
    const unformatValue = unFormatNumber(value);
    if (checkUniqInvoice(this.props.invoicesById, unformatValue)) {
      callback('must be uniq');
    } else {
      callback();
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div style={{ padding: '20px', background: '#fff' }}>
        <Form onSubmit={this.handleSubmit} style={{ padding: '20px', border: '1px solid #ebedf0' }}>
          <Row gutter={16}>
            <Col className="gutter-row" span={12}>
              <div style={{ marginBottom: '20px' }}>
                <FormItem label="Number:">
                  {
                    getFieldDecorator('number', {
                      initialValue: formatNumber(this.props.newUniq),
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
                <FormItem label="Invoice Date:">
                  {
                    getFieldDecorator('invoiceDate', { rules: [{ required: true }] })(<DatePicker
                      style={{ width: '100%' }}
                      name='invoiceDate'
                      label='Invoice Date:'
                    />)
                  }
                </FormItem>
              </div>
            </Col>
            <Col className="gutter-row" span={12}>
              <div style={{ marginBottom: '20px' }}>
                <FormItem label="Supply Date:">
                  {
                    getFieldDecorator('supplyDate', { rules: [{ required: true }] })(<DatePicker
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
                    getFieldDecorator('comment', { })(<TextArea
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

export default connect(state =>
  ({
    invoicesById: state.invoices.byId,
    formStatus: state.formStatus,
    newUniq: state.invoices.newUniq,
  }))(Form.create()(CreateForm));

