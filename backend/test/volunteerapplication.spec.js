const dotenv = require("dotenv");
dotenv.config();
process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../index");

chai.should();
chai.use(chaiHttp);

describe("Voluteer Applications API", () => {

    /**
     * Test the GET route
     */
    describe("GET /api/v-applications", () => {
        it("Should GET all volunteer applications in the database", (done) => {
            chai.request(server)
                .get("/api/v-applications")
                .end((error, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a("array");
                    response.body.length.should.be.equal(0);
                    done();
                });
        });

        it("Should not GET volunteer applications at invalid API", (done) => {
            chai.request(server)
                .get("/api/v-app")
                .end((error, response) => {
                    response.should.have.status(404);
                    done();
                });
        });      
    });

    /**
     * Test the POST route
     */
    describe("POST /api/v-applications", () => {
        it("Should POST new volunteer application", (done) => {
            let vApp = {
                name: "Max",
                dob: "1996-02-14",
                email: "max@me.com",
                phone: "(619) 297-3439",
                haveWorkedWithAnimals: true,
                interestText: "I'm just that interested.",
                acknowledgedTerms: true,          
            };
            chai.request(server)
                .post("/api/v-applications")
                .send(vApp)
                .end((error, response) => {
                    response.should.have.status(201);
                    response.body.should.have.property("uuid");
                    this.vApp = response.body;
                    done();
                });
        });

        it("Should not POST new volunteer application at invalid API", (done) => {
            let vApp = {
                name: "Max",
                dob: "1996-02-14",
                email: "max@me.com",
                phone: "(619) 297-3439",
                haveWorkedWithAnimals: true,
                interestText: "I'm just that interested.",
                acknowledgedTerms: true,          
            };
            chai.request(server)
                .post("/api/v-apps")
                .send(vApp)
                .end((error, response) => {
                    response.should.have.status(404);
                    done();
                });
        });

        it("Should not POST new volunteer application with invalid fields", (done) => {
            let vApp = {
                donatorName: "Max",
                dob: "1996-02-14",
                donatorEmail: "max@me.com",
                phone: "(619) 297-3439",
                haveWorkedWithAnimals: true,
                interestText: "I'm just that interested.",
                acknowledgedTerms: true,          
            };
            chai.request(server)
                .post("/api/v-applications")
                .send(vApp)
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
    describe("GET /api/v-applications/:uuid", () => {
        it("Should GET volunteer application by UUID", (done) => {
            this.should.have.property("vApp");
            this.vApp.should.have.property("uuid");

            const uuid = this.vApp.uuid;
            chai.request(server)
                .get("/api/v-applications/" + uuid)
                .end((error, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a("object");
                    response.body.should.have.property("uuid");
                    response.body.should.have.property("name");
                    response.body.should.have.property("email");
                    done();
                });
        });

        it("Should not GET volunteer application at invalid API", (done) => {
            this.should.have.property("vApp");
            const uuid = this.vApp.uuid;
            chai.request(server)
                .get("/api/v-app/" + uuid)
                .end((error, response) => {
                    response.should.have.status(404);
                    done();
                });
        });        

        it("Should not GET volunteer application with an invalid UUID", (done) => {
            const uuid = this.vApp.uuid.replace("-", "*");
            chai.request(server)
                .get("/api/v-applications/" + uuid)
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
    describe("PATCH /api/v-applications/:uuid", () => {
        it("Should PATCH volunteer application information", (done) => {
            this.should.have.property("vApp");
            const uuid = this.vApp.uuid;
            const infoToChange = {
                name: "Vanessa",
                email: "vanessa@me.com"
            };

            chai.request(server)
                .patch("/api/v-applications/" + uuid)
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

        it("Should not PATCH volunteer application information at invalid API", (done) => {
            this.should.have.property("vApp");            
            const uuid = this.vApp.uuid;
            const infoToChange = {
                name: "Oliver",
                email: "oliver@me.com"
            };

            chai.request(server)
                .patch("/api/v-app/" + uuid)
                .send(infoToChange)
                .end((error, response) => {
                    response.should.have.status(404);
                    done();
                });            
        });

        it("Should not add incorrect fields when PATCH'ing volunteer application information", (done) => {
            this.should.have.property("vApp");            
            const uuid = this.vApp.uuid;
            const infoToChange = {
                donatorName: "Adam",
                email: "adam.oh@me.com"
            };

            chai.request(server)
                .patch("/api/v-applications/" + uuid)
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
        it("Should DELETE the volunteer application", (done) => {
            this.should.have.property("vApp");            
            const uuid = this.vApp.uuid;
            chai.request(server)
                .delete("/api/v-applications/" + uuid)
                .end((error, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a("object");
                    response.body.should.have.property("message");
                    done();
                });
        });

        it("Should not DELETE the volunteer application at invalid API", (done) => {
            this.should.have.property("vApp");            
            const uuid = this.vApp.uuid;
            chai.request(server)
                .delete("/api/v-apps/" + uuid)
                .end((error, response) => {
                    response.should.have.status(404);
                    done();
                });
        });        

        it("Should not DELETE a volunteer application with an invalid UUID", (done) => {
            this.should.have.property("vApp");            
            const uuid = this.vApp.uuid.replace("-", "*");
            chai.request(server)
                .delete("/api/v-applications/" + uuid)
                .end((error, response) => {
                    response.should.have.status(400);
                    response.body.should.be.a("object");
                    response.body.should.have.property("name");
                    response.body.should.have.property("code");
                    response.body.should.have.property("message");
                    response.body.should.have.property("response");
                    response.body.should.have.property("stackTrace");
                    
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