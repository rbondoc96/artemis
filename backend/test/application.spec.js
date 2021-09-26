const dotenv = require("dotenv");
dotenv.config();
process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../index");

chai.should();
chai.use(chaiHttp);

describe("Applications API", () => {

    /**
     * Delete all Pets created during testing
     */
    after(() => {
        chai.request(server)
            .get("/api/pets/")
            .end((error, response) => {
                response.should.have.status(200);
                response.body.should.be.a("array");

                for(let idx in response.body) {
                    let pet = response.body[idx];

                    chai.request(server)
                        .delete("/api/pets/" + pet.uuid)
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a("object");
                            res.body.should.have.property("message");
                            console.log(res.body.message);
                        })
                }
            });        
    });    

    /**
     * Test the GET route
     */
    describe("GET /api/applications", () => {
        it("Should GET all applications in the database", (done) => {
            chai.request(server)
                .get("/api/applications")
                .end((error, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a("array");
                    response.body.length.should.be.equal(0);
                    done();
                });
        });

        it("Should not GET applications at invalid API", (done) => {
            chai.request(server)
                .get("/api/apps")
                .end((error, response) => {
                    response.should.have.status(404);
                    done();
                });
        });      
    });

    
    /**
     * Test the POST route
     */
    describe("POST /api/applications", () => {
        it("Should POST new application", (done) => {
            let pet = {
                name: "Max",
                type: "Dog",
                ageInDays: 365,
                breed: "German Shepherd",   
                sex: "Male",
                weightInKg: 5,
                description: "Hi I'm Max"                
            };

            chai.request(server)
                .post("/api/pets")
                .send(pet)
                .end((error, response) => {
                    response.should.have.status(201);
                    response.body.should.have.property("uuid");
                    this.pet = response.body;

                    let application = {
                        address1: "1223 Some Address St.",
                        address2: "",
                        address3: "",
                        city: "Houston",
                        state: "TX",
                        country: "US",
                        postalCode: "77008",
                        petId: this.pet.uuid,
                        type: "Foster",
                        name: "Adam",
                        dob: "1996-08-28T00:00:00.000Z",
                        email: "adam@me.com",
                        phone: "858-123-4567",
                        homeType: "House",
                        haveChildren: true,
                        homeStatus: "Own",
                        homeDescription: "I have no pets",
                        homeContact: "Shitty Landlord",
                        isFirstPet: false,
                        haveOtherPets: false,
                        petsDescription: "I have no pets",
                        vetName: "My Vet Name",
                        vetPhone: "123-456-7890",
                        haveWorkedWithAnimals: true,
                        interestText: "I'm just interested too",
                        acknowledgedTerms: false               
                    };

                    chai.request(server)
                        .post("/api/applications")
                        .send(application)
                        .end((error, response) => {
                            response.should.have.status(201);
                            response.body.should.have.property("uuid");
                            this.application = response.body;
                            done();
                        });
                });
        });

        it("Should not POST new application at invalid API", (done) => {
            let pet = {
                name: "Max",
                type: "Dog",
                ageInDays: 365,
                breed: "German Shepherd",   
                sex: "Male",
                weightInKg: 5,
                description: "Hi I'm Max"                
            };

            chai.request(server)
                .post("/api/pets")
                .send(pet)
                .end((error, response) => {
                    response.should.have.status(201);
                    response.body.should.have.property("uuid");
                    this.pet = response.body;

                    let application = {
                        address1: "1223 Some Address St.",
                        address2: "",
                        address3: "",
                        city: "Houston",
                        state: "TX",
                        country: "US",
                        postalCode: "77008",
                        petId: this.pet.uuid,
                        type: "Foster",
                        name: "Adam",
                        dob: "1996-08-28T00:00:00.000Z",
                        email: "adam@me.com",
                        phone: "858-123-4567",
                        homeType: "House",
                        haveChildren: true,
                        homeStatus: "Own",
                        homeDescription: "I have no pets",
                        homeContact: "Shitty Landlord",
                        isFirstPet: false,
                        haveOtherPets: false,
                        petsDescription: "I have no pets",
                        vetName: "My Vet Name",
                        vetPhone: "123-456-7890",
                        haveWorkedWithAnimals: true,
                        interestText: "I'm just interested too",
                        acknowledgedTerms: false               
                    };

                    chai.request(server)
                        .post("/api/apps")
                        .send(application)
                        .end((error, response) => {
                            response.should.have.status(404);
                            done();
                        });
                });                
        });

        it("Should not POST new application with invalid fields", (done) => {
            let pet = {
                name: "Max",
                type: "Dog",
                ageInDays: 365,
                breed: "German Shepherd",   
                sex: "Male",
                weightInKg: 5,
                description: "Hi I'm Max"                
            };

            chai.request(server)
                .post("/api/pets")
                .send(pet)
                .end((error, response) => {
                    response.should.have.status(201);
                    response.body.should.have.property("uuid");
                    this.pet = response.body;

                    let application = {
                        addr1: "1223 Some Address St.",
                        addr2: "",
                        addr3: "",
                        city: "Houston",
                        state: "TX",
                        country: "US",
                        zipcode: "77008",
                        petId: this.pet.uuid,
                        type: "Foster",
                        name: "Adam",
                        dob: "1996-08-28T00:00:00.000Z",
                        email: "adam@me.com",
                        phone: "858-123-4567",
                        homeType: "House",
                        haveChildren: true,
                        homeStatus: "Own",
                        homeDescription: "I have no pets",
                        homeContact: "Shitty Landlord",
                        isFirstPet: false,
                        haveOtherPets: false,
                        petsDescription: "I have no pets",
                        vetName: "My Vet Name",
                        vetPhone: "123-456-7890",
                        haveWorkedWithAnimals: true,
                        interestText: "I'm just interested too",
                        acknowledgedTerms: false               
                    };

                    chai.request(server)
                        .post("/api/applications")
                        .send(application)
                        .end((error, response) => {
                            response.should.have.status(400);
                            response.body.should.be.a("object");
                            response.body.should.have.property("name");
                            response.body.should.have.property("code");
                            response.body.should.have.property("message");
                            response.body.should.have.property("response");
        
                            response.body.should.have.property("errorArgs");
                            response.body.errorArgs.should.be.deep.equal([
                                "addr1",
                                "addr2",
                                "addr3",
                                "zipcode",
                            ]);
                            done();
                        });
                });                 
        });
    });    


    /**
     * Test the GET (by UUID) route
     */  
    describe("GET /api/applications/:uuid", () => {
        it("Should GET application by UUID", (done) => {
            const uuid = this.application.uuid;
            chai.request(server)
                .get("/api/applications/" + uuid)
                .end((error, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a("object");
                    response.body.should.have.property("uuid");
                    response.body.should.have.property("name");
                    done();
                });
        });

        it("Should not GET application at invalid API", (done) => {
            const uuid = this.application.uuid;
            chai.request(server)
                .get("/api/app/" + uuid)
                .end((error, response) => {
                    response.should.have.status(404);
                    done();
                });
        });        

        it("Should not GET application with an invalid UUID", (done) => {
            const uuid = this.application.uuid.replace("-", "*");
            chai.request(server)
                .get("/api/applications/" + uuid)
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
    describe("PATCH /api/applications/:uuid", () => {
        it("Should PATCH application information", (done) => {
            const uuid = this.application.uuid;
            const infoToChange = {
                name: "Oliver",
            };

            chai.request(server)
                .patch("/api/applications/" + uuid)
                .send(infoToChange)
                .end((error, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a("object");

                    response.body.should.have.property("uuid");
                    response.body.should.have.property("name");

                    response.body.name.should.be.equal(infoToChange.name);
                    done();
                });
        });

        it("Should not PATCH application information at invalid API", (done) => {
            const uuid = this.application.uuid;
            const infoToChange = {
                name: "Oliver",
            };

            chai.request(server)
                .patch("/api/apps/" + uuid)
                .send(infoToChange)
                .end((error, response) => {
                    response.should.have.status(404);
                    done();
                });            
        });

        it("Should not add incorrect fields when PATCH'ing pet information", (done) => {
            const uuid = this.application.uuid;
            const infoToChange = {
                applicationName: "Adam",
                petUUID: "123-123-1234",
            };

            chai.request(server)
                .patch("/api/applications/" + uuid)
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
                        "applicationName",
                        "petUUID",
                    ]);
                    done();
                });  
        });
    });


    /**
     * Test the DELETE route
     */
    describe("DELETE /api/applications/:uuid", () => {
        it("Should DELETE the application", (done) => {
            const uuid = this.application.uuid;
            chai.request(server)
                .delete("/api/applications/" + uuid)
                .end((error, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a("object");
                    response.body.should.have.property("message");
                    done();
                });
        });

        it("Should not DELETE the application at invalid API", (done) => {
            const uuid = this.application.uuid;
            chai.request(server)
                .delete("/api/apps/" + uuid)
                .end((error, response) => {
                    response.should.have.status(404);
                    done();
                });
        });        

        it("Should not DELETE an application with an invalid UUID", (done) => {
            const uuid = this.application.uuid.replace("-", "*");
            chai.request(server)
                .delete("/api/applications/" + uuid)
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