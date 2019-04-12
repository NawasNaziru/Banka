/* eslint-disable func-names */
/* eslint-disable no-undef */
/* eslint-disable no-useless-concat */


const sendJSONresponse = function (res, status, content) {
  res.status(status);
  res.json(content);
};

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

// eslint-disable-next-line func-names
module.exports.debit = function (req, res) {
  if (!req.params.accountNumber) {
    sendJSONresponse(res, 400, {
      status: 400,
      error: 'You have not specified the account number in the params!',
    });
    return;
  }

  if (!req.body.amount) {
    sendJSONresponse(res, 400, {
      status: 400,
      error: 'You have not specified the amount!',
    });
    return;
  }

  if (!req.body.email) {
    sendJSONresponse(res, 400, {
      status: 400,
      error: 'You have not specified your email!',
    });
    return;
  }


  // eslint-disable-next-line no-undef
  if (!Accounts[req.params.accountNumber]) {
    sendJSONresponse(res, 404, {
      status: 404,
      error: "Account number doesn't exist in the first place!",
    });
    return;
  }

  // eslint-disable-next-line no-undef
  if (!Users[req.body.email]) {
    sendJSONresponse(res, 404, {
      status: 404,
      error: 'You have not signed up!',
    });
    return;
  }

  // eslint-disable-next-line no-undef
  if (!(hasId(staffIds, parseInt(Users[req.body.email].id, 10)))) {
    sendJSONresponse(res, 404, {
      status: 404,
      error: 'Register as Staff first, using your privately assigned Id!',
    });
    return;
  }

  const transaction = {};

  // eslint-disable-next-line no-undef
  transaction.transactionId = Object.keys(Transactions).length;
  transaction.accountNumber = parseInt(req.params.accountNumber, 10);
  transaction.amount = parseFloat(req.body.amount, 10);
  // eslint-disable-next-line no-undef
  transaction.cashier = parseInt(Users[req.body.email].id, 10);
  transaction.createdOn = timeStamp();
  transaction.transactionType = 'debit';
  transaction.accountBalance = Accounts[transaction.accountNumber].balance
   - parseFloat(req.body.amount);
  transaction.oldBalance = Accounts[transaction.accountNumber].balance;
  transaction.newBalance = transaction.accountBalance;

  // update the account record accordingly with the credit action
  Accounts[transaction.accountNumber].balance = transaction.newBalance;

  // Store or record transaction
  Transactions[transaction.transactionId] = transaction;


  sendJSONresponse(res, 201, { status: 201, data: transaction });
};
