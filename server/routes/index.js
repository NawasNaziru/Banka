import express from 'express';

const router = express.Router();

import * as ctrlAuth from '../controllers/authentication'

import * as ctrlAcc from '../controllers/accounts';

import * as ctrlTxn from '../controllers/transactions.js';

// signup route

router.post('/users/auth/signin', ctrlAuth.login);

// sign in route
router.post('/users/auth/signup', ctrlAuth.register);

// account routes

router.post('/accounts', ctrlAcc.create);
router.patch('/accounts/:accountNumber', ctrlAcc.activate_deactivate);
router.delete('/accounts/:accountNumber', ctrlAcc.delete_account);

// transaction routes
router.post('/transactions/:accountNumber/debit', ctrlTxn.debit);
router.post('/transactions/:accountNumber/credit', ctrlTxn.credit);
export default router;
