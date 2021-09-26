const isUUID = require("validator/lib/isUUID");

const {Pet} = require("../db/models");
const {errors} = require("../lib/errors");
const keyValidator = require("../lib/keyValidator");

const PetInputAttributes = [
    "name",
    "type",
    "ageInDays",
    "breed",
    "sex",
    "weightInKg",
    "birthday",
    "adoptionStatus",
    "dateAdmitted",
    "description"
];

async function getAll(req, res, next) {
    try {
        const pets = await Pet.findAll({
            include: [
                "applications"
            ]
        });

        return res.json(pets);
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
        const pet = await Pet.findOne({
            where: {
                uuid: uuid
            },
            include: [
                "applications"
            ]
        });

        return res.json(pet);
    } catch(error) {
        next(errors.ResourceDoesNotExist(error));
    }
}

async function post(req, res, next) {
    const errorKeys = keyValidator(Object.keys(req.body), PetInputAttributes);
    if(errorKeys.length != 0) {
        next(errors.PetAttributeError(errorKeys));
    }

    const {
        name,
        type,
        ageInDays,
        breed,
        sex,
        weightInKg,
        birthday,
        adoptionStatus,
        dateAdmitted,
        description
    } = req.body;

    try {
        const pet = await Pet.create({
            name,
            type,
            ageInDays,
            breed,
            sex,
            weightInKg,
            birthday,
            adoptionStatus,
            dateAdmitted,
            description
        });

        return res.status(201).json(pet);
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

    const errorKeys = keyValidator(Object.keys(req.body), PetInputAttributes);
    if(errorKeys.length != 0) {
        next(errors.PetAttributeError(errorKeys));
    }

    const {
        name,
        type,
        ageInDays,
        breed,
        sex,
        weightInKg,
        birthday,
        adoptionStatus,
        dateAdmitted,
        description
    } = req.body;

    try {
        const pet = await Pet.findOne({
            where: {
                uuid: uuid
            },
            include: [
                "applications"
            ]
        });

        if(pet == null) {
            next(errors.PetDoesNotExist({
                uuid: uuid,
            }));
        }        

        if(name != undefined) {
            pet.name = name;
        }
        if(type != undefined) {
            pet.type = type;
        }
        if(ageInDays != undefined) {
            pet.ageInDays = ageInDays;
        }
        if(breed != undefined) {
            pet.breed = breed;
        }
        if(sex != undefined) {
            pet.sex = sex;
        }
        if(weightInKg != undefined) {
            pet.weightInKg = weightInKg;
        }
        if(birthday != undefined) {
            pet.birthday = birthday;
        }
        if(adoptionStatus != undefined) {
            pet.adoptionStatus = adoptionStatus;
        }
        if(dateAdmitted != undefined) {
            pet.dateAdmitted = dateAdmitted;
        }
        if(description != undefined) {
            pet.description = description;
        }

        await pet.save();

        return res.json(pet);
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
        const pet = await Pet.findOne({
            where: {
                uuid: uuid
            }
        });

        if(pet == null) {
            next(errors.PetDoesNotExist({
                uuid: uuid,
            }));
        }          

        await pet.destroy();

        return res.json({
            message: "Pet has been deleted!"
        });
    } catch(error) {
        next(errors.CouldNotDeleteResource(error));
    }
}

const PetAPI = {
    getByUUID: getByUUID,
    getAll: getAll,
    post: post,    
    patch: patch,
    delete: destroy,
}

module.exports = PetAPI;