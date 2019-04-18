const saveToken = (token) => {
  localStorage.setItem('banka-token', token);
};

const getToken = () => {
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
