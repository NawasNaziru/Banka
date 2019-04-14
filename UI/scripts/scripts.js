/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
// eslint-disable-next-line func-names

const saveToken = function (token) {
  // eslint-disable-next-line no-undef
  localStorage.setItem('banka-token', token);
};

const getToken = function () {
  // eslint-disable-next-line no-undef
  return localStorage.getItem('banka-token');
};

const isLoggedIn = function () {
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

const currentUser = function () {
  if (isLoggedIn()) {
    const token = getToken();
    const payload = JSON.parse($window.atob(token.split('.')[1]));
    return {
      email: payload.email,
      name: payload.name,
    };
  }
};

const logout = function () {
  localStorage.removeItem('banka-token');
};

function getElemVal (elem){
   return document.getElementById(elem).value;
}

var submitForm = function(formId){

document.getElementById(formId).addEventListener('submit', (event) => {
  event.preventDefault();
  // TODO do something here to show user that form is being submitted
  
  if(!getElemVal('firstName') || !getElemVal('lastName') || !getElemVal('email') || !getElemVal('password')){
    document.getElementById('validation_msg').innerHTML = "Fields marked with asterisks are required. Try again.";
    return;
  }
  else {
  document.getElementById('validation_msg').innerHTML = "Please wait...";
  fetch(event.target.action, {
    method: 'POST',
    body: new URLSearchParams(new FormData(event.target)), // event.target is the form
  }).then(resp => resp.json()).then((json) => {
    saveToken(json.token);
    // console.log(json);
    document.getElementById('signup-msg').innerHTML = 'Wow! You have Successfully registered!';
    document.getElementById('validation_msg').innerHTML = "";
    // alert(json);
  }).catch(error =>
  // TODO handle error
  // console.log(error);
    // eslint-disable-next-line no-alert
    // eslint-disable-next-line implicit-arrow-linebreak
    // eslint-disable-next-line no-alert
    alert('there was a problem'));
  // alert("stopped");
  return;
}
});

 }

// Handlers for submitting all forms in the app

submitForm('signupFormId');
