const express = require('express');

const router = express.Router();

const ctrlAuth = require('../controllers/authentication');
const ctrlAcc = require('../controllers/accounts');
const ctrlTxn = require('../controllers/transactions');


// signup route

router.post('/v1/users/auth/signin', ctrlAuth.login);

// sign in route
router.post('/v1/users/auth/signup', ctrlAuth.register);

// account routes

router.post('/v1/accounts', ctrlAcc.create);
router.patch('/v1/accounts/:accountNumber', ctrlAcc.activate_deactivate);
router.delete('/v1/accounts/:accountNumber', ctrlAcc.delete);

// transaction routes
router.post('/v1/transactions/:accountNumber/debit', ctrlTxn.debit);
router.post('/v1/transactions/:accountNumber/credit', ctrlTxn.credit);


module.exports = router;
