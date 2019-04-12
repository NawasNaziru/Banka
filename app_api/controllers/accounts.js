/* eslint-disable func-names */
/* eslint-disable no-undef */
const sendJSONresponse = function (res, status, content) {
  res.status(status);
  res.json(content);
};

// eslint-disable-next-line no-useless-concat
function timeStamp() {
  return `${(new Date()).getFullYear()}-${(new Date()).getMonth() + 1}-${(new Date()).getDate()}  ${(new Date()).getHours()}:${(new Date()).getMinutes()}:${(new Date()).getSeconds()}`;
}

const hasId = function (arr, id) {
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i] === id) {
      return true;
    }
  }
  return false;
};


module.exports.create = function (req, res) {
  if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.accountType) {
    sendJSONresponse(res, 400, {
      status: 400,
      error: 'First name, last name, email and accountType are required, please!',
    });
  } else {
    if (!Users[req.body.email]) {
      sendJSONresponse(res, 404, {
        status: 404,
        error: 'You have not signed up. Sign up first to create an account!',
      });
    }

    const account = {};

    account.accountNumber = nextAccount;
    nextAccount += 1;
    account.firstName = req.body.firstName;
    account.lastName = req.body.lastName;
    account.email = req.body.email;
    account.type = req.body.accountType;
    account.openingBalance = 0.00;
    account.createdOn = timeStamp();
    account.owner = Users[req.body.email].id;
    account.status = 'active';
    account.balance = 0.00;
    account.id = Object.keys(Accounts).length;


    Accounts[account.accountNumber] = account;


    sendJSONresponse(res, 201, { status: 201, data: account });
  }
};

module.exports.activate_deactivate = function (req, res) {
  if (!req.params.accountNumber) {
    sendJSONresponse(res, 400, {
      status: 400,
      error: 'You have not specified the account number in the params!',
    });
    return;
  }

  if (!req.body.email) {
    sendJSONresponse(res, 400, {
      status: 400,
      error: 'Enter your email!',
    });
    return;
  }


  if (!Accounts[req.params.accountNumber]) {
    sendJSONresponse(res, 404, {
      status: 404,
      error: "Account number doesn't exist in the first place or it was deleted!",
    });
    return;
  }

  if (!Users[req.body.email]) {
    sendJSONresponse(res, 404, {
      status: 404,
      error: 'You have not signed up!',
    });
    return;
  }

  // eslint-disable-next-line no-unused-expressions
  Accounts[req.params.accountNumber].status === 'dormant'
    ? Accounts[req.params.accountNumber].status = 'active'
    : Accounts[req.params.accountNumber].status = 'dormant';
  const account = Accounts[req.params.accountNumber];


  sendJSONresponse(res, 201, { status: 201, data: account });
};
