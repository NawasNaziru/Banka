/* eslint-disable func-names */
/* eslint-disable no-return-assign */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
getElemVal = (elem) => {
  return document.getElementById(elem).value;
}

const submitForm = (formId) => {
  document.getElementById(formId).addEventListener('submit', (event) => {
    event.preventDefault();
    if (!getElemVal('firstName') || !getElemVal('lastName') || !getElemVal('email') || !getElemVal('accountType') || !getElemVal('phone')) {
      document.getElementById('create_acct_msg').innerHTML = '';
      document.getElementById('create_acct_val_msg').classList.add('invalid');
      document.getElementById('create_acct_val_msg').innerHTML = 'Fields marked with asterisks are required. Try again.';
      return;
    }

    document.getElementById('create_acct_val_msg').innerHTML = 'Please wait...';
    fetch(event.target.action, {
      method: 'POST',
      body: new URLSearchParams(new FormData(event.target)), // event.target is the form
    }).then(resp => resp.json()).then((json) => {
      saveToken(json.token);
      document.getElementById('create_acct_msg').innerHTML = 'Wow! You have Successfully registered!';
      document.getElementById('create_acct_val_msg').innerHTML = '';
    }).catch(error => document.getElementById('create_acct_msg').innerHTML = 'Signup first!');
  });
};

// Handler for submitting create_acct form
submitForm('createAcctFormId');
