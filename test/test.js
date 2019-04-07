var assert = require("assert");
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../app");
let should = chai.should();




chai.use(chaiHttp);
describe("Banka", function () {
    describe("User Operations", function () {

        var user = { 
        “id” ​ : "201",
        “email” ​ : "abid1@gmail.com",
        “firstName” ​ : "Abid",
        “lastName” ​ : "Awwab",
        “password” ​ : "111aaa",
        “type” ​ : "client",
        “isAdmin” ​: "false"
        };

        ​var account = {
            “id” ​ :​ ​ "1",  
            “accountNumber” ​ :​ ​ "3030101090"​ ,
            ​“createdOn” ​ :​ ​ "24-10-2018"​ ,
            “owner” ​ :​ ​ "1"​,     // user id   
            ​“type” ​ :​ ​ "current"​,     // savings, current 
            ​“status” ​ :​ ​"active" ,   // draft, active, or dormant  
            “balance” ​ :​ ​ "1956854.68"
        }

            it("Should sign up a user", (done) => {
                    chai.request(server)
                        .post("/api/v1/auth/signup")
                        .send(user)
                        .end((err, res) => {
                            res.should.have.status(200);
                            result.body.data.length.should.greaterThan(0);
                            console.log("Response Body:", res.body);

                        })
                
                done()
            })

        it("Should login a user", (done) => {
            chai.request(server)
                .post("/api/v1/auth/signin")
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    result.body.data.length.should.greaterThan(0);
                            console.log("Response Body:", res.body);
                          })
                
                done()
            })

            it("Should create bank account for user", (done) => {
                chai.request(server)
                    .post("/api/v1/accounts")
                    .send(user)
                    .end((err, res) => {
                        res.should.have.status(200);
                        console.log("Response Body:", res.body);

                    })
            
            done()
        })

    })

    describe("staff Operations", function () {

        var staff= { 
        “id” ​ : "1",
        “email” ​ : "faraday1@gmail.com",
        “firstName” ​ : "Faraday",
        “lastName” ​ : "Einstein",
        “password” ​ : "z_zx12_g",
        “type” ​ : "staff",
        “isAdmin” ​: "true"
        };

        ​var account = {
            “id” ​ :​ ​ "1",  
            “accountNumber” ​ :​ ​ "3030101090"​ ,
            ​“createdOn” ​ :​ ​ "24-10-2018"​ ,
            “owner” ​ :​ ​ "1"​,     // user id   
            ​“type” ​ :​ ​ "current"​,     // savings, current 
            ​“status” ​ :​ ​"active" ,   // draft, active, or dormant  
            “balance” ​ :​ ​ "1956854.68"
        }

            it("Should activate an account", (done) => {
                    chai.request(server)
                        .patch("/api/v1/accounts/" + account.accountNumber + "/activate")
                        .send(staff)
                        .end((err, res) => {
                            res.should.have.status(200);
                            console.log("Response Body:", res.body);

                        })
                
                done()
            })

            it("Should deactivate an account", (done) => {
                chai.request(server)
                    .patch("/api/v1/accounts/" + account.accountNumber + "/deactivate")
                    .send(staff)
                    .end((err, res) => {
                        res.should.have.status(200);
                        console.log("Response Body:", res.body);

                    })
            
            done()
        })

        it("Should credit a bank account", (done) => {
            chai.request(server)
                .post("/api/v1/transactions/" + account.accountNumber + "/credit")
                .query({'amount': '20000'})
                .send(staff)
                .end((err, res) => {
                    res.should.have.status(200);
                            console.log("Response Body:", res.body);
                          })
                
                done()
            })

            it("Should debit a bank account", (done) => {
                chai.request(server)
                    .post("/api/v1/transactions/" + account.accountNumber + "/debit")
                    .query({'amount': '-20000'})
                    .send(staff)
                    .end((err, res) => {
                        res.should.have.status(200);
                                console.log("Response Body:", res.body);
                              })
                    
                    done()
                })

                it("Should delete a bank account", (done) => {
                    chai.request(server)
                        .delete("/api/v1/accounts/" + account.accountNumber)
                        .end((err, result) => {
                            res.should.have.status(200);
                            console.log("Deleted Particlar account using /GET/accounts/:accountID ::::", result.body)
                                  })
                        
                        done()
                    })

    })

    describe("Admin Operations", function () {

        var admin= { 
        “id” ​ : "1",
        “email” ​ : "faraday1@gmail.com",
        “firstName” ​ : "Faraday",
        “lastName” ​ : "Einstein",
        “password” ​ : "z_zx12_g",
        “type” ​ : "staff",
        “isAdmin” ​: "true"
        };

        ​var account = {
            “id” ​ :​ ​ "1",  
            “accountNumber” ​ :​ ​ "3030101090"​ ,
            ​“createdOn” ​ :​ ​ "24-10-2018"​ ,
            “owner” ​ :​ ​ "1"​,     // user id   
            ​“type” ​ :​ ​ "current"​,     // savings, current 
            ​“status” ​ :​ ​"active" ,   // draft, active, or dormant  
            “balance” ​ :​ ​ "1956854.68"
        }

            it("Should activate an account", (done) => {
                    chai.request(server)
                        .patch("/api/v1/accounts/" + account.accountNumber + "/activate")
                        .send(admin)
                        .end((err, res) => {
                            res.should.have.status(200);
                            console.log("Response Body:", res.body);

                        })
                
                done()
            })

            it("Should deactivate an account", (done) => {
                chai.request(server)
                    .patch("/api/v1/accounts/" + account.accountNumber + "/deactivate")
                    .send(admin)
                    .end((err, res) => {
                        res.should.have.status(200);
                        console.log("Response Body:", res.body);

                    })
            
            done()
        })

        it("Should delete a bank account", (done) => {
            chai.request(server)
                .delete("/api/v1/accounts/" + account.accountNumber)
                .end((err, result) => {
                    res.should.have.status(200);
                    console.log("Deleted Particlar account using /GET/accounts/:accountID ::::", result.body)
                          })
                
                done()
      
            })
    })

});