const isUUID = require("validator/lib/isUUID");

const {Donation} = require("../db/models");
const {errors} = require("../lib/errors");
const keyValidator = require("../lib/keyValidator");

const DonationInputAttributes = [
    "name",
    "email",
    "amount",
    "comments",
];

async function getAll(req, res, next) {
    try {
        const donations = await Donation.findAll()

        return res.json(donations);
    } catch(error) {
        next(errors.ResourcesDoNotExist(error));
    }
}

async function getByUUID(req, res, next) {
    const uuid = req.params.uuid;

    if(!isUUID(uuid)) {
        next(errors.InvalidUUIDError({uuid: uuid}));
    }

    try {
        const donation = await Donation.findOne({
            where: {
                uuid: uuid
            }
        });

        return res.json(donation);
    } catch(error) {
        next(errors.ResourceDoesNotExist(error));
    }
}

async function post(req, res, next) {
    const errorKeys = keyValidator(Object.keys(req.body), DonationInputAttributes);
    if(errorKeys.length != 0) {
        next(errors.DonationAttributeError(errorKeys));
    }    

    const {
        name,
        email,
        amount,
        comments,
    } = req.body;

    try {
        const donation = await Donation.create({
            name: name,
            email: email,
            amount: amount,
            comments: comments,
        });

        return res.status(201).json(donation);
    } catch(error) {
        let mappedErrors = error.errors.map(err => {
            return({
                message: err.message,
                fieldInError: err.path,
                valueInError: err.value,
            })
        });

        let errorArg = {
            name: error.name,
            errors: mappedErrors,
        };

        let apiError = errors.CouldNotCreateResource(errorArg);
        if(error.name == "SequelizeValidationError") {
            apiError.setStatus(400);
        }
        next(apiError);        
    }
}

async function patch(req, res, next) {
    const uuid = req.params.uuid;

    if(!isUUID(uuid)) {
        next(errors.InvalidUUIDError({uuid: uuid}));
    }

    const errorKeys = keyValidator(Object.keys(req.body), DonationInputAttributes);
    if(errorKeys.length != 0) {
        next(errors.DonationAttributeError(errorKeys));
    }

    const {
        name,
        email,
        amount,
        comments,
    } = req.body;

    try {
        const donation = await Donation.findOne({
            where: {
                uuid: uuid
            },
        });

        if(donation == null) {
            next(errors.DonationDoesNotExist({
                uuid: uuid,
            }));
        }         

        if(name != undefined) {
            donation.name = name;
        }
        if(email != undefined) {
            donation.email = email;
        }
        if(amount != undefined) {
            donation.amount = amount;
        }
        if(comments != undefined) {
            donation.comments = comments;
        }

        await donation.save();

        return res.json(donation);
    } catch(error) {
        let mappedErrors = error.errors.map(err => {
            return({
                message: err.message,
                fieldInError: err.path,
                valueInError: err.value,
            })
        });

        let errorArg = {
            name: error.name,
            errors: mappedErrors,
        };

        let apiError = errors.CouldNotUpdateResource(errorArg);
        if(error.name == "SequelizeValidationError") {
            apiError.setStatus(400);
        }
        next(apiError);       
    }
}

async function destroy(req, res, next) {
    const uuid = req.params.uuid;

    if(!isUUID(uuid)) {
        next(errors.InvalidUUIDError({uuid: uuid}));
    }

    try {
        const donation = await Donation.findOne({
            where: {
                uuid: uuid
            }
        });

        if(donation == null) {
            next(errors.PetDoesNotExist({
                uuid: uuid,
            }));
        }          

        await donation.destroy();

        return res.json({
            message: "Donation has been deleted"
        });
    } catch(error) {
        next(errors.CouldNotDeleteResource(error));
    }
}

const DonationAPI = {
    getByUUID: getByUUID,
    getAll: getAll,
    post: post,
    patch: patch,
    delete: destroy,
}

module.exports = DonationAPI;