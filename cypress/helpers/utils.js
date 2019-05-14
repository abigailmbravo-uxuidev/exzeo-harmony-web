export const toCurrency = value =>
  `$ ${String(value).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`;
