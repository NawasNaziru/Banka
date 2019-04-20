
function getElemVal(elem) {
  return document.getElementById(elem).value;
}

const submitForm = function (formId) {
  document.getElementById(formId).addEventListener('submit', (event) => {
    event.preventDefault();
    if (!getElemVal('input_button')) {
      document.getElementById('message').innerHTML = '';
      document.getElementById('message').classList.add('invalid');
      document.getElementById('validation_msg').innerHTML = 'All fields are required. Try again.';
      return;
    }

    document.getElementById('message').innerHTML = 'Please wait...';
    document.getElementById('message').innerHTML = 'Successful!';
    document.getElementById('validation_msg').innerHTML = '';
  })
};
// Handler for submitting create_acct form
submitForm('forms');

