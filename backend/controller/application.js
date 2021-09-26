const isUUID = require("validator/lib/isUUID");

const {Application, ApplicationAddress, Pet} = require("../db/models");
const {errors} = require("../lib/errors");
const keyValidator = require("../lib/keyValidator");

const ApplicationInputAttributes = [
    "address1",
    "address2",
    "address3",
    "city",
    "state",
    "country",
    "postalCode",
    "petId",
    "type",
    "name",
    "dob",
    "email",
    "phone",
    "homeType",
    "haveChildren",
    "homeStatus",
    "homeDescription",
    "homeContact",
    "isFirstPet",
    "haveOtherPets",
    "petsDescription",
    "vetName",
    "vetPhone",
    "haveWorkedWithAnimals",
    "interestText",
    "acknowledgedTerms",
];

async function getAll(req, res, next) {
    try {
        const apps = await Application.findAll({
            include: [
                "applicationAddress",
                "pet"
            ]
        });

        return res.json(apps);
    } catch(error) {
        next(errors.ResourcesDoNotExist(error));
    }
}

async function getByUUID(req, res, next) {
    const uuid = req.params.uuid

    if(!isUUID(uuid)) {
        next(errors.InvalidUUIDError({uuid: uuid}));
    }

    try {
        const app = await Application.findOne({
            where: {
                uuid: uuid
            }, 
            include: [
                "applicationAddress",
                "pet"
            ]
        })

        return res.json(app);
    } catch(error) {
        next(errors.ResourceDoesNotExist(error));
    }
}

async function post(req, res, next) {
    const errorKeys = keyValidator(Object.keys(req.body), ApplicationInputAttributes);
    if(errorKeys.length != 0) {
        next(errors.ApplicationAttributeError(errorKeys));
    }

    const {
        address1,
        address2,
        address3,
        city,
        state,
        country,
        postalCode,
        petId,
        type,
        name,
        dob,
        email,
        phone,
        homeType,
        haveChildren,
        homeStatus,
        homeDescription,
        homeContact,
        isFirstPet,
        haveOtherPets,
        petsDescription,
        vetName,
        vetPhone,
        haveWorkedWithAnimals,
        interestText,
        acknowledgedTerms,
    } = req.body;

    try {
        const address = await ApplicationAddress.create({
            address1: address1,
            address2: address2,
            address3: address3,
            city: city,
            state: state,
            country: country,
            postalCode: postalCode,
        });

        const pet = await Pet.findOne({
            where: {
                uuid: petId,
            }
        })
    
        if(pet == null) {
            next(errors.PetDoesNotExist({
                uuid: petId
            }));
        }       
        
        const application = await Application.create({
            petId: pet.id,
            type: type,
            name: name,
            dob: dob,
            email: email,
            phone: phone,
            homeType: homeType,
            haveChildren: haveChildren,
            homeStatus: homeStatus,
            homeDescription: homeDescription,
            homeContact: homeContact,
            applicationAddressId: address.id,
            isFirstPet: isFirstPet,
            haveOtherPets: haveOtherPets,
            petsDescription: petsDescription,
            vetName: vetName,
            vetPhone: vetPhone,
            haveWorkedWithAnimals: haveWorkedWithAnimals,
            interestText: interestText,
            acknowledgedTerms: acknowledgedTerms,
        });

        return res.status(201).json(application);        

    } catch(error) {
        next(errors.CouldNotCreateResource(error));
    }
}

async function patch(req, res, next) {
    const uuid = req.params.uuid;
    if(!isUUID(uuid)) {
        next(errors.InvalidUUIDError({uuid: uuid}));
    }

    const errorKeys = keyValidator(Object.keys(req.body), ApplicationInputAttributes);
    if(errorKeys.length != 0) {
        next(errors.ApplicationAttributeError(errorKeys));
    }    

    const {
        address1,
        address2,
        address3,
        city,
        state,
        country,
        postalCode,
        petId,
        type,
        name,
        dob,
        email,
        phone,
        homeType,
        haveChildren,
        homeStatus,
        homeDescription,
        homeContact,
        isFirstPet,
        haveOtherPets,
        petsDescription,
        vetName,
        vetPhone,
        haveWorkedWithAnimals,
        interestText,
        acknowledgedTerms,
    } = req.body;

    try {
        const app = await Application.findOne({
            where: {
                uuid: uuid
            },
            include: [
                "applicationAddress",
                "pet"
            ]
        });

        if(app == null) {
            next(errors.ApplicationDoesNotExist({
                uuid: uuid,
            }));
        }

        if(address1 != undefined ||
            address2 != undefined ||
            address3 != undefined ||
            city != undefined || 
            state != undefined ||
            country != undefined ||
            postalCode != undefined
            ) {
    
                const address = await ApplicationAddress.findOne({
                    where: {
                        id: app.applicationAddressId
                    }  
                });

                if(address == null) {
                    next(errors.ApplicationAddressDoesNotExist({
                        id: app.applicationAddressId
                    }));
                }                  

                if(address1 != undefined) {
                    address.address1 = address1;
                }
                if(address2 != undefined) {
                    address.address2 = address2;
                }
                if(address3 != undefined) {
                    address.address3 = address3;
                }
                if(city != undefined) {
                    address.city = city;
                }
                if(state != undefined) {
                    address.state = state;
                }
                if(country != undefined) {
                    address.country = country;
                }
                if(postalCode != undefined) {
                    address.postalCode = postalCode;
                }
    
                await address.save();
        }

        if(petId != undefined) {
            let pet = await Pet.findOne({
                where: {
                    uuid: petId
                }
            });

            if(pet == null) {
                next(errors.PetDoesNotExist({
                    uuid: petId
                }));
            }            
            
            app.petId = pet.id;
        }
        if(type != undefined) {
            app.type = type;
        }
        if(name != undefined) {
            app.name = name;
        }
        if(dob != undefined) {
            app.dob = dob;
        }
        if(email != undefined) {
            app.email = email;
        }
        if(phone != undefined) {
            app.phone = phone;
        }
        if(homeType != undefined) {
            app.homeType = homeType;
        }
        if(haveChildren != undefined) {
            app.haveChildren = haveChildren;
        }
        if(homeStatus != undefined) {
            app.homeStatus = homeStatus;
        }
        if(homeDescription != undefined) {
            app.homeDescription = homeDescription;
        }
        if(homeContact != undefined) {
            app.homeContact = homeContact;
        }
        if(isFirstPet != undefined) {
            app.isFirstPet = isFirstPet;
        }
        if(haveOtherPets != undefined) {
            app.haveOtherPets = haveOtherPets;
        }
        if(petsDescription != undefined) {
            app.petsDescription = petsDescription;
        }
        if(vetName != undefined) {
            app.vetName = vetName;
        }
        if(vetPhone != undefined) {
            app.vetPhone = vetPhone;
        }
        if(haveWorkedWithAnimals != undefined) {
            app.haveWorkedWithAnimals = haveWorkedWithAnimals;
        }
        if(interestText != undefined) {
            app.interestText = interestText;
        }
        if(acknowledgedTerms != undefined) {
            app.acknowledgedTerms = acknowledgedTerms;
        }

        await app.save();

        /**
         * Send the updated record instead of the old one
         * 
         * Without this, the old record (before updates) would be sent instead
         * of the record with the updates
         */
        const newApp = await Application.findOne({
            where: {
                id: app.id
            },
            include: [
                "applicationAddress",
                "pet"
            ]
        });

        /**
         * Should not occur unless there is a server error
         */
        if(newApp == null) {
            next(errors.ApplicationDoesNotExist({
                id: app.id
            }).setStatus(500));
        }        

        return res.json(newApp);

    } catch(error) {
        next(errors.CouldNotUpdateResource(error));
    }
}

async function destroy(req, res, next) {
    const uuid = req.params.uuid;
    if(!isUUID(uuid)) {
        next(errors.InvalidUUIDError({uuid: uuid}));
    }

    try {
        const app = await Application.findOne({
            where: {
                uuid: uuid
            }
        });

        if(app == null) {
            next(errors.ApplicationDoesNotExist({
                uuid: uuid,
            }));
        }        

        const addressId = app.applicationAddressId;

        const address = await ApplicationAddress.findOne({
            where: {
                id: addressId,
            }
        })

        if(address == null) {
            next(errors.ApplicationAddressDoesNotExist({
                id: addressId,
            }));
        }        

        await address.destroy();
        await app.destroy();

        return res.json({
            message: "Application and address have been deleted!"
        });
    } catch(error) {
        next(errors.CouldNotDeleteResource(error));
    }
}

const ApplicationAPI = {
    getAll: getAll,
    getByUUID: getByUUID,
    post: post,
    patch: patch,
    delete: destroy,
}

module.exports = ApplicationAPI;