import { reducer as formReducer } from 'redux-form';
import { keyBy, uniqueId, omit } from 'lodash';
import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import * as actions from '../actions';
import { uniqInvoiceNumber } from './../../helpers';

const defaultInvoicesState = {
  byId: {},
  allId: [],
  status: 'loading',
  newUniq: uniqueId(),
};

const defaultFormState = 'ok';

const invoices = handleActions(
  {
    [actions.getInvoicesRequest](state) {
      return { ...state, status: 'loading' };
    },
    [actions.patchInvoiceRequest](state) {
      return { ...state, status: 'loading' };
    },
    [actions.delInvoiceRequest](state) {
      return { ...state, status: 'loading' };
    },
    [actions.getInvoicesFailure](state) {
      return { ...state, status: 'error' };
    },
    [actions.patchInvoiceFailure](state) {
      return { ...state, status: 'error' };
    },
    [actions.delInvoicesFailure](state) {
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
    [actions.patchInvoiceSuccess](state, { payload: payloadedInvoice }) {
      const { id } = payloadedInvoice;
      const { byId } = state;
      return {
        ...state,
        byId: { ...byId, [id]: payloadedInvoice },
        status: 'ok',
        newUniq: uniqInvoiceNumber(byId),
      };
    },
    [actions.delInvoicesSuccess](state, { payload: deletedId }) {
      const { byId, allId } = state;
      const removedInvoices = omit(byId, deletedId);
      const removedInvoicesIds = allId.filter(id => (id !== deletedId.toString()));
      return {
        ...state,
        status: 'ok',
        allId: removedInvoicesIds,
        byId: removedInvoices,
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
