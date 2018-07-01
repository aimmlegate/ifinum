import { createAction } from 'redux-actions';
import axios from 'axios';
import uuid from 'uuid/v4';

export const getInvoicesRequest = createAction('INVOICES_GET_REQUEST');
export const getInvoicesSuccess = createAction('INVOICES_GET_SUCCESS');
export const getInvoicesFailure = createAction('INVOICES_GET_FAILURE');
export const postInvoicesRequest = createAction('INVOICES_POST_REQUEST');
export const postInvoicesSuccess = createAction('INVOICES_POST_SUCCESS');
export const postInvoicesSuccessOk = createAction('INVOICES_POST_SUCCESS_OK');
export const postInvoicesFailure = createAction('INVOICES_POST_FAILURE');

export const getInvoices = () => async (dispatch) => {
  dispatch(getInvoicesRequest());
  try {
    const response = await axios.get(
      '/invoices',
      { timeout: 5000 },
    );
    dispatch(getInvoicesSuccess(response.data));
  } catch (e) {
    console.error(e);
    dispatch(getInvoicesFailure());
  }
};

export const postInvoices = request => async (dispatch) => {
  dispatch(postInvoicesRequest());
  const requestWithId = { ...request, id: uuid() };
  try {
    const response = await axios.post(
      '/invoices',
      requestWithId,
      { timeout: 5000 },
    );
    console.log(response);
    dispatch(postInvoicesSuccess(response.data));
    dispatch(postInvoicesSuccessOk());
  } catch (e) {
    console.error(e);
    dispatch(postInvoicesFailure());
  }
};
