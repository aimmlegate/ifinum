import { uniqueId, split } from 'lodash';

export const uniqInvoiceNumber = (invoices) => {
  const invoicesNumbers = new Set(Object.keys(invoices)
    .map(key => invoices[key].number.toString()));
  const getUniq = (num) => {
    if (invoicesNumbers.has(num.toString())) {
      return getUniq(uniqueId());
    }
    return num;
  };
  return getUniq(uniqueId());
};

export const checkUniqInvoice = (invoices, number) => {
  const invoicesNumbers = new Set(Object.keys(invoices)
    .map(key => invoices[key].number.toString()));
  return invoicesNumbers.has(number.toString());
};

export const formatNumber = invNumber => `INV-${invNumber}`;

export const unFormatNumber = (invNumber) => {
  const pattern = split(invNumber, '-', 2);
  const [, res] = pattern;
  return parseInt(res, 10);
};
