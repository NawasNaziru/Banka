import dotenv from 'dotenv';
dotenv.load();
import express from 'express';
import path from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import Debug from 'debug';
const debug = Debug('Express4');

import  {routesApi} from './routes/index';

const app = express();

/* Below are Non-persistent data structures of choice.
Some of them are prefilled with some data for mocha and chai http test.
This is because chai always restart the node server for each request.
Hence, the need for some test data, independent of previous request. */

global.Users = {
  'nawasnaziru@gmail.com': {
    token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOjAsImVtYWlsIjoibmF3YXNuYXppcnVAZ21haWwuY29tIiwibmFtZSI6Im5hd2FzIiwiZXhwIjoxNTU1NDE1MjQ1LCJpYXQiOjE1NTQ4MTA0NDV9.2QscsXy8fuPXnO59OIml78T7O6rBhuXmk2H-yBmLzW8',
    id: 0,
    firstName: 'nawas',
    lastName: 'adam',
    email: 'nawasnaziru@gmail.com',
    type: 'client',
    isAdmin: false,
    password: '123456a',
  },
  'linustorvalds@linux.com': {
    token: 'fyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOjAsImVtYWlsIjoibmF3YXNuYXppcnVAZ21haWwuY29tIiwibmFtZSI6Im5hd2FzIiwiZXhwIjoxNTU1NDE1MjQ1LCJpYXQiOjE1NTQ4MTA0NDV9.2QscsXy8fuPXnO59OIml78T7O6rBhuXmk2H-yBmLzW8',
    id: 316,
    firstName: 'linus',
    lastName: 'torvalds',
    email: 'linustorvalds@linux.com',
    type: 'staff',
    isAdmin: true,
    password: '123456b',
  },
};

// global.Users = {};

global.Accounts = {
  accountNumber: {
    accountNumber: 2000000000,
    firstName: 'nawas',
    lastName: 'adam',
    email: 'nawasnaziru@gmail.com',
    type: 'savings',
    openingBalance: 0,
    createdOn: '2019-04-11T09:10:33.000Z',
    owner: 0,
    status: 'active',
    balance: 0,
    id: 0,
  },
};

global.nextAccount = 2000000000;
global.Transactions = {};

global.staffIds = [104, 189, 316, 427, 518];
global.adminIds = [411, 581, 611, 723, 851];

// uncomment after placing your favicon in /public
// app.use(favicon(__dirname + '/UI/favicon.ico'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'UI')));

app.use('/api/v1', routesApi);

app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'UI', 'index.html'));
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// Catch unauthorised errors
app.use((err, req, res) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({ message: `${err.name}: ${err.message}` });
  }
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
  });
});

// start server

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
 console.log('Express server listening on localhost:3000');
});

export {app};