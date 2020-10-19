export const isObjEmpty = (obj) => Object.keys(obj).length === 0;

export const isEmailValid = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const getPlural = (n, titles) => {
  return titles[
    n % 10 === 1 && n % 100 !== 11
      ? 0
      : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)
      ? 1
      : 2
  ];
};

export const displayUsersFoundMessage = (count) => {
  return `${count === 1 ? 'Найден' : 'Найдено'} ${count} ${getPlural(count, [
    'пользователь',
    'пользователя',
    'пользователей',
  ])}`;
};
