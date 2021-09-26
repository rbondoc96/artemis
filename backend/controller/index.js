const express = require("express");

const {
    postTestUser,
    getTestUsers,
    getByUUID,
} = require("./testuser");

const ApiRouter = express.Router();

const PetAPI = require("./pet");
const ApplicationAPI = require("./application");
const VApplicationAPI = require("./volunteerapplication");
const DonationAPI = require("./donation");


/* TestUsers API */
ApiRouter.get("/test-users", getTestUsers);
ApiRouter.get("/test-users/:uuid", getByUUID);
ApiRouter.post("/test-users", postTestUser);

/* Pets API */
ApiRouter.get("/pets", PetAPI.getAll);
ApiRouter.get("/pets/:uuid", PetAPI.getByUUID);
ApiRouter.post("/pets", PetAPI.post);
ApiRouter.patch("/pets/:uuid", PetAPI.patch);
ApiRouter.delete("/pets/:uuid", PetAPI.delete);

/* Applications API */
ApiRouter.get("/applications", ApplicationAPI.getAll);
ApiRouter.get("/applications/:uuid", ApplicationAPI.getByUUID)
ApiRouter.post("/applications", ApplicationAPI.post);
ApiRouter.patch("/applications/:uuid", ApplicationAPI.patch);
ApiRouter.delete("/applications/:uuid", ApplicationAPI.delete);

/* Volunteer Applications API */
ApiRouter.get("/v-applications", VApplicationAPI.getAll);
ApiRouter.get("/v-applications/:uuid", VApplicationAPI.getByUUID);
ApiRouter.post("/v-applications", VApplicationAPI.post);
ApiRouter.patch("/v-applications/:uuid", VApplicationAPI.patch);
ApiRouter.delete("/v-applications/:uuid", VApplicationAPI.delete);

/* Donations API */
ApiRouter.get("/donations", DonationAPI.getAll);
ApiRouter.get("/donations/:uuid", DonationAPI.getByUUID);
ApiRouter.post("/donations", DonationAPI.post);
ApiRouter.patch("/donations/:uuid", DonationAPI.patch);
ApiRouter.delete("/donations/:uuid", DonationAPI.delete);

module.exports = ApiRouter;
