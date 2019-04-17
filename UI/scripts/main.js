/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
// eslint-disable-next-line func-names

const saveToken = (token) => {
  // eslint-disable-next-line no-undef
  localStorage.setItem('banka-token', token);
};

const getToken = () => {
  // eslint-disable-next-line no-undef
  return localStorage.getItem('banka-token');
};

const isLoggedIn = () => {
  const token = getToken();

  if (token) {
    const payload = JSON.parse($window.atob(token.split('.')[1]));
    return payload.exp > Date.now() / 1000;
  }
  return false;
};

// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line func-names
// eslint-disable-next-line consistent-return

// eslint-disable-next-line consistent-return
const currentUser = () => {
  if (isLoggedIn()) {
    const token = getToken();
    const payload = JSON.parse($window.atob(token.split('.')[1]));
    return {
      email: payload.email,
      name: payload.name,
    };
  }
};

const logout = () => {
  localStorage.removeItem('banka-token');
};
