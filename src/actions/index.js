import { createAction } from 'redux-actions';
import axios from 'axios';

export const getInvoicesRequest = createAction('INVOICES_GET_REQUEST');
export const getInvoicesSuccess = createAction('INVOICES_GET_SUCCESS');
export const getInvoicesFailure = createAction('INVOICES_GET_FAILURE');

export const getInvoices = () => async (dispatch) => {
  dispatch(getInvoicesRequest());
  try {
    const response = await axios.get(
      '/invoices',
      { timeout: 5000 },
    );
    dispatch(getInvoicesSuccess(response.data));
  } catch (e) {
    dispatch(getInvoicesFailure(e.message));
  }
};
