/* eslint-disable func-names */
/* eslint-disable no-return-assign */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
function getElemVal(elem) {
  return document.getElementById(elem).value;
}

const submitForm = function (formId) {
  document.getElementById(formId).addEventListener('submit', (event) => {
    event.preventDefault();
    if (!getElemVal('firstName') || !getElemVal('lastName') || !getElemVal('email') || !getElemVal('password')) {
      document.getElementById('signup-msg').innerHTML = '';
      document.getElementById('validation_msg').classList.add('invalid');
      document.getElementById('validation_msg').innerHTML = 'Fields marked with asterisks are required. Try again.';
      return;
    }

    document.getElementById('validation_msg').innerHTML = 'Please wait...';
    fetch(event.target.action, {
      method: 'POST',
      body: new URLSearchParams(new FormData(event.target)), // event.target is the form
    }).then(resp => resp.json()).then((json) => {
      saveToken(json.token);
      document.getElementById('signup-msg').innerHTML = 'Wow! You have Successfully registered!';
      document.getElementById('validation_msg').innerHTML = '';
    }).catch(error => document.getElementById('signup-msg').innerHTML = 'Signup first!');
  });
};

// Handler for submitting signup form
submitForm('signupFormId');
