export const getUrl = (amount) => {
  const baseURL = `http://www.filltext.com`;

  const params = {
    rows: amount,
    id: '{number|1000}',
    firstName: '{firstName}',
    lastName: '{lastName}',
    email: '{email}',
    phone: '{phone|(xxx)xxx-xx-xx}',
    address: '{addressObject}',
    description: '{lorem|32}',
  };

  const url = new URL('', baseURL);
  const searchParams = new URLSearchParams(params);
  url.search = searchParams;

  return url.href;
};
