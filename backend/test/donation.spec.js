const dotenv = require("dotenv");
dotenv.config();
process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../index");

chai.should();
chai.use(chaiHttp);

describe("Donations API", () => {

    /**
     * Test the GET route
     */
    describe("GET /api/donations", () => {
        it("Should GET all donations in the database", (done) => {
            chai.request(server)
                .get("/api/donations")
                .end((error, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a("array");
                    response.body.length.should.be.equal(0);
                    done();
                });
        });

        it("Should not GET donations at invalid API", (done) => {
            chai.request(server)
                .get("/api/donation")
                .end((error, response) => {
                    response.should.have.status(404);
                    done();
                });
        });      
    });

    /**
     * Test the POST route
     */
    describe("POST /api/donations", () => {
        it("Should POST new donation", (done) => {
            let donation = {
                name: "Max",
                email: "max@me.com",
                amount: 1999.99,
                comments: "Almost $2000",            
            };
            chai.request(server)
                .post("/api/donations")
                .send(donation)
                .end((error, response) => {
                    response.should.have.status(201);
                    response.body.should.have.property("uuid");
                    this.donation = response.body;
                    done();
                });
        });

        it("Should not POST new donation at invalid API", (done) => {
            let donation = {
                name: "Sam",
                email: "sam@me.com",
                amount: 999.99,
                comments: "Almost $1000",              
            };
            chai.request(server)
                .post("/api/donation")
                .send(donation)
                .end((error, response) => {
                    response.should.have.status(404);
                    done();
                });
        });

        it("Should not POST new donation with invalid fields", (done) => {
            let donation = {
                donatorName: "Max",
                donatorEmail: "max@me.com",
                amount: 200.50,
                comments: "I just wanted a tax break"            
            };
            chai.request(server)
                .post("/api/donations")
                .send(donation)
                .end((error, response) => {
                    response.should.have.status(400);
                    response.body.should.be.a("object");
                    response.body.should.have.property("name");
                    response.body.should.have.property("code");
                    response.body.should.have.property("message");
                    response.body.should.have.property("response");
                    
                    response.body.should.have.property("errorArgs");
                    response.body.errorArgs.should.be.deep.equal([
                        "donatorName",
                        "donatorEmail",
                    ]);
                    done();
                });
        });
    });    

    /**
     * Test the GET (by UUID) route
     */  
    describe("GET /api/donations/:uuid", () => {
        it("Should GET donation by UUID", (done) => {
            const uuid = this.donation.uuid;
            chai.request(server)
                .get("/api/donations/" + uuid)
                .end((error, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a("object");
                    response.body.should.have.property("uuid");
                    response.body.should.have.property("name");
                    response.body.should.have.property("email");
                    done();
                });
        });

        it("Should not GET donation at invalid API", (done) => {
            const uuid = this.donation.uuid;
            chai.request(server)
                .get("/api/donation/" + uuid)
                .end((error, response) => {
                    response.should.have.status(404);
                    done();
                });
        });        

        it("Should not GET donation with an invalid UUID", (done) => {
            const uuid = this.donation.uuid.replace("-", "*");
            chai.request(server)
                .get("/api/donations/" + uuid)
                .end((error, response) => {
                    response.should.have.status(400);
                    response.body.should.be.a("object");
                    response.body.should.have.property("name");
                    response.body.should.have.property("code");
                    response.body.should.have.property("message");
                    response.body.should.have.property("response");
                    
                    response.body.should.have.property("errorArgs");
                    response.body.errorArgs.should.be.deep.equal([
                        {
                            uuid: uuid,
                        }
                    ]);
                    done();
                });            
        });
    });


    /**
     * Test the PATCH route
     */
    describe("PATCH /api/donations/:uuid", () => {
        it("Should PATCH donation information", (done) => {
            const uuid = this.donation.uuid;
            const infoToChange = {
                name: "Vanessa",
                email: "vanessa@me.com"
            };

            chai.request(server)
                .patch("/api/donations/" + uuid)
                .send(infoToChange)
                .end((error, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a("object");

                    response.body.should.have.property("uuid");
                    response.body.should.have.property("name");
                    response.body.should.have.property("email");

                    response.body.name.should.be.equal(infoToChange.name);
                    response.body.email.should.be.equal(infoToChange.email);
                    done();
                });
        });

        it("Should not PATCH donation information at invalid API", (done) => {
            const uuid = this.donation.uuid;
            const infoToChange = {
                name: "Oliver",
                email: "oliver@me.com"
            };

            chai.request(server)
                .patch("/api/donation/" + uuid)
                .send(infoToChange)
                .end((error, response) => {
                    response.should.have.status(404);
                    done();
                });            
        });

        it("Should not add incorrect fields when PATCH'ing donation information", (done) => {
            const uuid = this.donation.uuid;
            const infoToChange = {
                donatorName: "Adam",
                email: "adam.oh@me.com"
            };

            chai.request(server)
                .patch("/api/donations/" + uuid)
                .send(infoToChange)
                .end((error, response) => {
                    response.should.have.status(400);
                    response.body.should.be.a("object");
                    response.body.should.have.property("name");
                    response.body.should.have.property("code");
                    response.body.should.have.property("message");
                    response.body.should.have.property("response");
                    
                    response.body.should.have.property("errorArgs");
                    response.body.errorArgs.should.be.deep.equal([
                        "donatorName",
                    ]);
                    done();
                });  
        });
    });


    /**
     * Test the DELETE route
     */
    describe("DELETE /api/donations/:uuid", () => {
        it("Should DELETE the donation", (done) => {
            const uuid = this.donation.uuid;
            chai.request(server)
                .delete("/api/donations/" + uuid)
                .end((error, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a("object");
                    response.body.should.have.property("message");
                    done();
                });
        });

        it("Should not DELETE the donation at invalid API", (done) => {
            const uuid = this.donation.uuid;
            chai.request(server)
                .delete("/api/donation/" + uuid)
                .end((error, response) => {
                    response.should.have.status(404);
                    done();
                });
        });        

        it("Should not DELETE a donation with an invalid UUID", (done) => {
            const uuid = this.donation.uuid.replace("-", "*");
            chai.request(server)
                .delete("/api/donations/" + uuid)
                .end((error, response) => {
                    response.should.have.status(400);
                    response.body.should.be.a("object");
                    response.body.should.have.property("name");
                    response.body.should.have.property("code");
                    response.body.should.have.property("message");
                    response.body.should.have.property("response");
                    
                    response.body.should.have.property("errorArgs");
                    response.body.errorArgs.should.be.deep.equal([
                        {
                            uuid: uuid,
                        }
                    ]);
                    done();
                });
        });
    });
});