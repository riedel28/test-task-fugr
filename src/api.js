export const getUrl = (amount) => {
  let url = '';
  if (process.env.NODE_ENV === 'development') {
    url = 'http://www.filltext.com';
  } else {
    url = 'https://www.filltext.com';
  }

  const baseUrl = `${url}/?rows=${amount}&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D`;

  return baseUrl;
};
