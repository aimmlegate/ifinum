import { createAction } from 'redux-actions';
import axios from 'axios';
import uuid from 'uuid/v4';
import { routeInvoicesAll, routeInvoicebyId } from '../routes';

export const getInvoicesRequest = createAction('INVOICES_GET_REQUEST');
export const getInvoicesSuccess = createAction('INVOICES_GET_SUCCESS');
export const getInvoicesFailure = createAction('INVOICES_GET_FAILURE');

export const postInvoicesRequest = createAction('INVOICES_POST_REQUEST');
export const postInvoicesSuccess = createAction('INVOICES_POST_SUCCESS');
export const postInvoicesSuccessOk = createAction('INVOICES_POST_SUCCESS_OK');
export const postInvoicesFailure = createAction('INVOICES_POST_FAILURE');

export const patchInvoiceRequest = createAction('INVOICE_PATCH_REQUEST');
export const patchInvoiceSuccess = createAction('INVOICE_PATCH_SUCCESS');
export const patchInvoiceFailure = createAction('INVOICE_PATCH_FAILURE');

export const delInvoiceRequest = createAction('INVOICES_DEL_REQUEST');
export const delInvoicesSuccess = createAction('INVOICES_DEL_SUCCESS');
export const delInvoicesFailure = createAction('INVOICES_DEL_FAILURE');

export const getInvoices = () => async (dispatch) => {
  dispatch(getInvoicesRequest());
  try {
    const response = await axios.get(
      routeInvoicesAll(),
      { timeout: 5000 },
    );
    dispatch(getInvoicesSuccess(response.data));
  } catch (e) {
    console.error(e);
    dispatch(getInvoicesFailure());
  }
};

export const newInvoices = request => async (dispatch) => {
  dispatch(postInvoicesRequest());
  const requestWithId = { ...request, id: uuid() };
  try {
    const response = await axios.post(
      routeInvoicesAll(),
      requestWithId,
      { timeout: 5000 },
    );
    dispatch(postInvoicesSuccess(response.data));
    dispatch(postInvoicesSuccessOk());
  } catch (e) {
    console.error(e);
    dispatch(postInvoicesFailure());
  }
};

export const editInvoice = (id, request) => async (dispatch) => {
  dispatch(patchInvoiceRequest());
  try {
    const response = await axios.patch(
      routeInvoicebyId(id),
      request,
      { timeout: 5000 },
    );
    dispatch(patchInvoiceSuccess(response.data));
  } catch (e) {
    console.error(e);
    dispatch(patchInvoiceFailure());
  }
};

export const deleteInvoice = id => async (dispatch) => {
  dispatch(delInvoiceRequest());
  try {
    await axios.delete(
      routeInvoicebyId(id),
      { timeout: 5000 },
    );
    dispatch(delInvoicesSuccess(id));
  } catch (e) {
    console.error(e);
    dispatch(delInvoicesFailure());
  }
};
