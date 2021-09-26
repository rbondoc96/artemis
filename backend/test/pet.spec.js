const dotenv = require("dotenv");
dotenv.config();
process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../index");

chai.should();
chai.use(chaiHttp);

describe("Pets API", () => {

    /**
     * Test the GET route
     */
    describe("GET /api/pets", () => {
        it("Should GET all pets in the database", (done) => {
            chai.request(server)
                .get("/api/pets")
                .end((error, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a("array");
                    response.body.length.should.be.at.least(0);
                    done();
                });
        });

        it("Should not GET pets at invalid API", (done) => {
            chai.request(server)
                .get("/api/pet")
                .end((error, response) => {
                    response.should.have.status(404);
                    done();
                });
        });      
    });

    
    /**
     * Test the POST route
     */
    describe("POST /api/pets", () => {
        it("Should POST new pet", (done) => {
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
                    done();
                });
        });

        it("Should not POST new pet at invalid API", (done) => {
            let pet = {
                name: "Sam",
                type: "Cat",
                ageInDays: 365,
                breed: "Siberian",   
                sex: "Female",
                weightInKg: 1.35,
                description: "Me is kitty"                
            };
            chai.request(server)
                .post("/api/pet")
                .send(pet)
                .end((error, response) => {
                    response.should.have.status(404);
                    done();
                });
        });

        it("Should not POST new pet with invalid fields", (done) => {
            let pet = {
                petName: "Max",
                petType: "Dog",
                age: 365,
                breed: "German Shepherd",   
                sex: "Male",
                weightInKg: 5,
                biography: "Hi I'm Max"                
            };
            chai.request(server)
                .post("/api/pets")
                .send(pet)
                .end((error, response) => {
                    response.should.have.status(400);
                    response.body.should.be.a("object");
                    response.body.should.have.property("name");
                    response.body.should.have.property("code");
                    response.body.should.have.property("message");
                    response.body.should.have.property("response");

                    response.body.should.have.property("errorArgs");
                    response.body.errorArgs.should.be.deep.equal([
                        "petName",
                        "petType",
                        "age",
                        "biography",
                    ]);
                    done();
                });
        });

        it("Should not POST pet with invalid <type> attribute", (done) => {
            let pet = {
                name: "Max",
                type: "Chinchilla",
                ageInDays: 365,
                breed: "Chinchilla",   
                sex: "Male",
                weightInKg: 5,
                description: "Hi I'm Max"                
            };
            chai.request(server)
                .post("/api/pets")
                .send(pet)
                .end((error, response) => {
                    console.log(response);
                    response.should.have.status(400);
                    response.body.should.have.property("errorArgs");
                    response.body.errorArgs.should.be.a("array");
                    response.body.errorArgs.length.should.be.equal(1);
                    response.body.errorArgs[0].name.should.be.equal("SequelizeValidationError");
                    done();
                });
        });
        
        it("Should not POST pet with invalid <ageinDays> attribute", (done) => {
            let pet = {
                name: "Max",
                type: "Dog",
                ageInDays: -1,
                breed: "Pembroke Welsh Corgi",   
                sex: "Male",
                weightInKg: 5,
                description: "Hi I'm Max"                
            };
            chai.request(server)
                .post("/api/pets")
                .send(pet)
                .end((error, response) => {
                    response.should.have.status(400);
                    response.body.should.have.property("errorArgs");
                    response.body.errorArgs.should.be.a("array");
                    response.body.errorArgs.length.should.be.equal(1);
                    response.body.errorArgs[0].name.should.be.equal("SequelizeValidationError");
                    done();
                });
        });
        
        it("Should not POST pet with invalid <weightInKg> attribute", (done) => {
            let pet = {
                name: "Max",
                type: "Dog",
                ageInDays: 1,
                breed: "Pembroke Welsh Corgi",   
                sex: "Male",
                weightInKg: -5.2,
                description: "Hi I'm Max"                
            };
            chai.request(server)
                .post("/api/pets")
                .send(pet)
                .end((error, response) => {
                    response.should.have.status(400);
                    response.body.should.have.property("errorArgs");
                    response.body.errorArgs.should.be.a("array");
                    response.body.errorArgs.length.should.be.equal(1);
                    response.body.errorArgs[0].name.should.be.equal("SequelizeValidationError");
                    done();
                });
        });
        
        it("Should not POST pet with missing attributes", (done) => {
            let pet = {
                breed: "Pembroke Welsh Corgi",   
            };
            chai.request(server)
                .post("/api/pets")
                .send(pet)
                .end((error, response) => {
                    response.should.have.status(400);
                    response.body.should.have.property("errorArgs");
                    response.body.errorArgs.should.be.a("array");
                    response.body.errorArgs.length.should.be.equal(1);
                    response.body.errorArgs[0].name.should.be.equal("SequelizeValidationError");
                    done();
                });
        });          
    });    


    /**
     * Test the GET (by UUID) route
     */  
    describe("GET /api/pets/:uuid", () => {
        it("Should GET pet by UUID", (done) => {
            const uuid = this.pet.uuid;
            chai.request(server)
                .get("/api/pets/" + uuid)
                .end((error, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a("object");
                    response.body.should.have.property("uuid");
                    response.body.should.have.property("name");
                    response.body.should.have.property("breed");
                    done();
                });
        });

        it("Should not GET pet at invalid API", (done) => {
            const uuid = this.pet.uuid;
            chai.request(server)
                .get("/api/pet/" + uuid)
                .end((error, response) => {
                    response.should.have.status(404);
                    done();
                });
        });        

        it("Should not GET pet with an invalid UUID", (done) => {
            const uuid = this.pet.uuid.replace("-", "*");
            chai.request(server)
                .get("/api/pets/" + uuid)
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
    describe("PATCH /api/pets/:uuid", () => {
        it("Should PATCH pet information", (done) => {
            const uuid = this.pet.uuid;
            const infoToChange = {
                name: "Oliver",
                description: "My name is actually Oliver"
            };

            chai.request(server)
                .patch("/api/pets/" + uuid)
                .send(infoToChange)
                .end((error, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a("object");

                    response.body.should.have.property("uuid");
                    response.body.should.have.property("name");
                    response.body.should.have.property("description");

                    response.body.name.should.be.equal(infoToChange.name);
                    response.body.description.should.be.equal(infoToChange.description);

                    done();
                });
        });

        it("Should not PATCH pet information at invalid API", (done) => {
            const uuid = this.pet.uuid;
            const infoToChange = {
                name: "Oliver",
                description: "My name is actually Oliver"
            };

            chai.request(server)
                .patch("/api/pet/" + uuid)
                .send(infoToChange)
                .end((error, response) => {
                    response.should.have.status(404);
                    done();
                });            
        });

        it("Should not add incorrect fields when PATCH'ing pet information", (done) => {
            const uuid = this.pet.uuid;
            const infoToChange = {
                petName: "Adam",
                biography: "Not this doggy",
                description: "I don't know those guys above me..."
            };

            chai.request(server)
                .patch("/api/pets/" + uuid)
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
                        "petName",
                        "biography",
                    ]);
                    done();
                });  
        });
    });


    /**
     * Test the DELETE route
     */
    describe("DELETE /api/pets/:uuid", () => {
        it("Should DELETE the pet", (done) => {
            const uuid = this.pet.uuid;
            chai.request(server)
                .delete("/api/pets/" + uuid)
                .end((error, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a("object");
                    response.body.should.have.property("message");
                    done();
                });
        });

        it("Should not DELETE the pet at invalid API", (done) => {
            const uuid = this.pet.uuid;
            chai.request(server)
                .delete("/api/pet/" + uuid)
                .end((error, response) => {
                    response.should.have.status(404);
                    done();
                });
        });        

        it("Should not DELETE a resource with an invalid UUID", (done) => {
            const uuid = this.pet.uuid.replace("-", "*");
            chai.request(server)
                .delete("/api/pets/" + uuid)
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