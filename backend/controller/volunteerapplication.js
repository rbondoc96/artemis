const isUUID = require("validator/lib/isUUID");

const {VolunteerApplication} = require("../db/models");
const {errors} = require("../lib/errors");
const keyValidator = require("../lib/keyValidator");


const VolunteerApplicationInputAttributes = [
    "name",
    "dob",
    "email",
    "phone",
    "haveWorkedWithAnimals",
    "interestText",
    "acknowledgedTerms",    
];

async function getAll(req, res, next) {
    try {
        const vApps = await VolunteerApplication.findAll();

        return res.json(vApps);
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
        const vApp = await VolunteerApplication.findOne({
            where: {
                uuid: uuid
            }
        });

        return res.json(vApp);
    } catch(error) {
        next(errors.ResourceDoesNotExist(error));
    }
}

async function post(req, res, next) {
    const errorKeys = keyValidator(Object.keys(req.body), VolunteerApplicationInputAttributes);
    if(errorKeys.length != 0) {
        next(errors.VolunteerApplicationAttributeError(errorKeys));
    }    

    const {
        name,
        dob,
        email,
        phone,
        haveWorkedWithAnimals,
        interestText,
        acknowledgedTerms,
    } = req.body;

    try {
        const vApplication = await VolunteerApplication.create({
            name: name,
            dob: dob,
            email: email,
            phone: phone,
            haveWorkedWithAnimals: haveWorkedWithAnimals,
            interestText: interestText,
            acknowledgedTerms: acknowledgedTerms,
        });

        return res.status(201).json(vApplication);
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

    const errorKeys = keyValidator(Object.keys(req.body), VolunteerApplicationInputAttributes);
    if(errorKeys.length != 0) {
        next(errors.VolunteerApplicationAttributeError(errorKeys));
    }    

    const {
        name,
        dob,
        email,
        phone,
        haveWorkedWithAnimals,
        interestText,
        acknowledgedTerms,
    } = req.body;

    try {
        const vApp = await VolunteerApplication.findOne({
            where: {
                uuid: uuid
            }
        });

        if(vApp == null) {
            next(errors.VolunteerApplicationDoesNotExist({
                uuid: uuid,
            }));
        }            

        if(name != undefined) {
            vApp.name = name;
        }
        if(dob != undefined) {
            vApp.dob = dob;
        }
        if(email != undefined) {
            vApp.email = email;
        }
        if(phone != undefined) {
            vApp.phone = phone;
        }
        if(haveWorkedWithAnimals != undefined) {
            vApp.haveWorkedWithAnimals = haveWorkedWithAnimals;
        }
        if(interestText != undefined) {
            vApp.interestText = interestText;
        }
        if(acknowledgedTerms != undefined) {
            vApp.acknowledgedTerms = acknowledgedTerms;
        }

        await vApp.save();

        return res.json(vApp);
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
        const vApp = await VolunteerApplication.findOne({
            where: {
                uuid: uuid
            }
        });

        if(vApp == null) {
            next(errors.PetDoesNotExist({
                uuid: uuid,
            }));
        }          

        await vApp.destroy();

        return res.json({
            message: "Volunteer application has been deleted"
        });
    } catch(error) {
        next(errors.CouldNotDeleteResource(error));
    }
}

const VApplicationAPI = {
    getByUUID: getByUUID,
    getAll: getAll,
    post: post,
    patch: patch,
    delete: destroy
}

module.exports = VApplicationAPI;