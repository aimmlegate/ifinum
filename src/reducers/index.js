import { reducer as formReducer } from 'redux-form';
import { keyBy } from 'lodash';
import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import * as actions from '../actions';


const defaultInvoicesState = {
  byId: {},
  allId: [],
};

const invoices = handleActions(
  {
    [actions.getInvoicesSuccess](state, { payload: payloadedInvoices }) {
      const allId = payloadedInvoices.map(invoice => invoice.id);
      const byId = keyBy(payloadedInvoices, 'id');
      return { ...state, allId, byId };
    },
  },
  defaultInvoicesState,
);

export default combineReducers({
  form: formReducer,
  invoices,
});
