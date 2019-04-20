
function getElemVal(elem) {
  return document.getElementById(elem).value;
}

const submitForm = function (formId) {
  document.getElementById(formId).addEventListener('submit', (event) => {
    event.preventDefault();
    if (!getElemVal('firstName') || !getElemVal('lastName') || !getElemVal('email') || !getElemVal('phone')) {
      document.getElementById('create_acct_msg').innerHTML = '';
      document.getElementById('create_acct_val_msg').classList.add('invalid');
      document.getElementById('create_acct_val_msg').innerHTML = 'All fields are required. Try again.';
      return;
    }

    document.getElementById('create_acct_val_msg').innerHTML = 'Please wait...';
    document.getElementById('create_acct_msg').innerHTML = 'Wow! You have Successfully registered!';
    document.getElementById('create_acct_val_msg').innerHTML = '';
  })
};
// Handler for submitting create_acct form
submitForm('createAcctFormId');
