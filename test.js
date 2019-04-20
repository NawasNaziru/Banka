import assert from 'assert';
import chai from 'chai';
const should = chai.should();
const { expect } = chai;
import chaiHttp from 'chai-http';
import {app as server} from '../server/app.js';

const accountNumber = 2000000000;

chai.use(chaiHttp);
describe('Banka API endpoints', () => {
  describe('User Operations', () => {
    it('Should sign up a user', (done) => {
      chai.request(app).keepOpen()
        .post('/v1/users/auth/signup')
        .send({
          firstName: 'Ausat',
          lastName: 'Adam',
          email: 'ausatnaziru@gmail.com',
          password: '123456a',
          id: 6,
        })
        .end((err, res) => {
          expect(err).to.be.null;
          res.should.have.status(200);
          res.body.should.be.a('object');
        });

      done();
    });

    it('Should login a user', (done) => {
      chai.request(app).keepOpen()
        .post('/v1/users/auth/signin')
        .send({
          email: 'nawasnaziru@gmail.com',
          password: '123456',
        })
        .end((err, res) => {
          expect(err).to.be.null;
          res.should.have.status(200);
          res.body.should.be.a('object');
        });

      done();
    });

    it('Should create bank account for user', (done) => {
      chai.request(app).keepOpen()
        .post('/api/v1/accounts')
        .send({
          firstName: 'nawas',
          lastName: 'adam',
          email: 'nawasnaziru@gmail.com',
          accountType: 'savings',
        })
        .end((err, res) => {
          expect(err).to.be.null;
          res.should.have.status(201);
          expect(res).to.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('data');
          res.body.should.have.property('status');
          res.body.data.should.be.a('object');
          res.body.data.should.have.property('accountNumber');
          res.body.data.should.have.property('id');
          res.body.data.should.have.property('firstName');
          res.body.data.should.have.property('lastName');
          res.body.data.should.have.property('status');
          res.body.data.should.have.property('type');
          res.body.data.should.have.property('owner');
          res.body.data.id.should.be.a('number');
          res.body.data.firstName.should.equal('nawas');
          res.body.data.lastName.should.equal('adam');
        });

      done();
    });
  });

  describe('Staff only operations', () => {
    it('Should credit a bank account', (done) => {
      chai.request(app).keepOpen()
        .post('/api/v1/transactions/2000000000/credit')
        .send({
          amount: '5400',
          email: 'linustorvalds@linux.com',
        })
        .end((err, res) => {
          res.should.have.status(201);
          expect(res).to.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('data');
          res.body.should.have.property('status');
          res.body.data.should.be.a('object');
          res.body.data.should.have.property('accountNumber');
          res.body.data.should.have.property('amount');
          res.body.data.should.have.property('newBalance');
          res.body.data.should.have.property('oldBalance');
          res.body.data.should.have.property('cashier');
          res.body.data.should.have.property('transactionType');
          res.body.data.transactionType.should.be.a('string');
          res.body.data.amount.should.equal(5400);
        });

      done();
    });

    it('Should debit a bank account', (done) => {
      chai.request(app).keepOpen()
        .post('/api/v1/transactions/2000000000/debit')
        .send({
          amount: '5400',
          email: 'linustorvalds@linux.com',
        })
        .end((err, res) => {
          res.should.have.status(201);
          expect(res).to.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('data');
          res.body.should.have.property('status');
          res.body.data.should.be.a('object');
          res.body.data.should.have.property('accountNumber');
          res.body.data.should.have.property('amount');
          res.body.data.should.have.property('newBalance');
          res.body.data.should.have.property('oldBalance');
          res.body.data.should.have.property('cashier');
          res.body.data.should.have.property('transactionType');
          res.body.data.transactionType.should.be.a('string');
          res.body.data.amount.should.equal(5400);
        });

      done();
    });
  });

  describe('Admin and staff Operations', () => {
    it('Should toggle account status', (done) => {
      chai.request(app).keepOpen()
        .patch(`/api/v1/accounts/${accountNumber}`)
        .send({
          email: 'linustorvalds@linux.com',
        })
        .end((err, res) => {
          res.should.have.status(201);
          expect(res).to.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('data');
          res.body.should.have.property('status');
          res.body.data.should.be.a('object');
          res.body.data.should.have.property('accountNumber');
          res.body.data.should.have.property('status');
        });

      done();
    });

    it('Should delete a bank account', (done) => {
      chai.request(app).keepOpen()
        .delete(`/api/v1/accounts/${accountNumber}`)
        .send({
          email: 'linustorvalds@linux.com',
        })
        .end((err, res) => {
          expect(err).to.be.null;
          res.should.have.status(200);
          res.body.should.have.property('message');
          res.body.message.should.be.a('string');
        });

      done();
    });
  });
});
