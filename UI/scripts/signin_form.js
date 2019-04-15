/* eslint-disable func-names */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-return-assign */
function getElemVal(elem) {
  return document.getElementById(elem).value;
}

const submitForm = function (formId) {
  document.getElementById(formId).addEventListener('submit', (event) => {
    event.preventDefault();

    // form fields validation
    if (!getElemVal('email') || !getElemVal('password')) {
      document.getElementById('signin-msg').innerHTML = '';
      document.getElementById('signin_validMsg').classList.add('invalid');
      document.getElementById('signin_validMsg').innerHTML = 'Fields marked with asterisks are required. Try again.';
      return;
    }
    // if ok, proceed

    document.getElementById('signin_validMsg').innerHTML = 'Please wait...';
    fetch(event.target.action, {
      method: 'POST',
      body: new URLSearchParams(new FormData(event.target)), // event.target is the form
    }).then(resp => resp.json()).then((json) => {
      saveToken(json.token);
      document.getElementById('signin-msg').innerHTML = 'Wow! You have Successfully registered!';
      document.getElementById('signin_validMsg').innerHTML = '';
    }).catch(error => document.getElementById('signin-msg').innerHTML = 'Signup first!');
  });
};

// Handler for submitting signin form
submitForm('signinFormId');
