import { reducer as formReducer } from 'redux-form';
import { keyBy, uniqueId } from 'lodash';
import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import * as actions from '../actions';
import { uniqInvoiceNumber } from '../helpers';

const defaultInvoicesState = {
  byId: {},
  allId: [],
  status: '',
  newUniq: uniqueId(),
};

const defaultFormState = {
  formStatus: 'ok',
};

const invoices = handleActions(
  {
    [actions.getInvoicesRequest](state) {
      return { ...state, status: 'loading' };
    },
    [actions.getInvoicesFailure](state) {
      return { ...state, status: 'error' };
    },
    [actions.getInvoicesSuccess](state, { payload: payloadedInvoices }) {
      const allId = payloadedInvoices.map(invoice => invoice.id);
      const byId = keyBy(payloadedInvoices, 'id');
      return {
        ...state,
        allId,
        byId,
        status: 'ok',
        newUniq: uniqInvoiceNumber(byId),
      };
    },
    [actions.postInvoicesSuccess](state, { payload: payloadedInvoice }) {
      const { id } = payloadedInvoice;
      const { allId, byId } = state;
      return {
        ...state,
        allId: [...allId, id],
        byId: { ...byId, [id]: payloadedInvoice },
        status: 'ok',
        newUniq: uniqInvoiceNumber(byId),
      };
    },
  },
  defaultInvoicesState,
);

const formStatus = handleActions(
  {
    [actions.postInvoicesRequest]() {
      return 'loading';
    },
    [actions.postInvoicesSuccess]() {
      return 'reset';
    },
    [actions.postInvoicesSuccessOk]() {
      return 'ok';
    },
    [actions.postInvoicesFailure]() {
      return 'error';
    },
  },
  defaultFormState,
);

export default combineReducers({
  form: formReducer,
  invoices,
  formStatus,
});
