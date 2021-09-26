const dotenv = require("dotenv");
dotenv.config();

class APIError {

    constructor({
        name, 
        code, 
        status,
        message, 
        response, 
        explanation,
        errorArgs,
        stackTrace,
    }) {
        this.name = name;
        this.code = code;
        this.status = status;
        this.message = message;
        this.response = response;
        this.explanation = explanation;
        this.errorArgs = errorArgs || [];
        this.stackTrace = stackTrace;
    }
    
    /**
     * Creates a new APIError object with the given attributes and a
     * stack trace (no stack trace in production)
     * 
     * @param {string} name - Name for the error (camelCase)
     * @param {number} code -  Error code
     * @param {number} status - HTTP status coee
     * @param {string} message - Error message
     * @param {string} response - Response to the error
     * @param {string} explanation - Explaining what led to the error
     */
    createError({
        name,
        code,
        status,
        message,
        response,
        explanation,
    }) {
        /**
         * Creates a new APIError that is accessed through the root APIError (errors) object
         * Ex. name = "ResourceNotFound"
         * Function Invocation --> errors.ResourceNotFound({
         *  uuid: uuid
         * });
         * 
         * @param {Array} errorArgs -  List of arguments to attach to APIError object
         * @returns {APIError} New APIError object with the given parameters
         */
        this[name] = function(errorArgs) {
            let obj = {};

            if(name != undefined) {
                obj.name = name;
            }
            if(code != undefined) {
                obj.code = code;
            }
            if(status != undefined) {
                obj.status = status;
            }
            if(message != undefined) {
                obj.message = message;
            }
            if(response != undefined) {
                obj.response = response;
            }
            if(explanation != undefined) {
                obj.explanation = explanation;
            }
            if(errorArgs != undefined) {
                if(!Array.isArray(errorArgs)) {
                    errorArgs = [errorArgs];
                }
                obj.errorArgs = errorArgs;
            }


            if(process.env.NODE_ENV != "production") {
                Error.captureStackTrace(this[name], this[name]);
                obj.stackTrace = this[name].stack;
            } 

            return new APIError(obj);
        };
    }

    /**
     * 
     * @param {number} newStatus - New HTTP status code for the generated error
     */
    setStatus(newStatus) {
        this.status = newStatus;
    }

    /**
     * 
     * @param {string} newMessage - New message for the generated error
     */
    setMessage(newMessage) {
        this.message = newMessage;
    }

    /**
     * 
     * @param {string} newResponse - New response for the generated error
     */
    setResponse(newResponse) {
        this.response = newResponse;
    }

    /**
     * 
     * @param {string} newExplanation - New explanation for the generated error
     */
    setExplanation(newExplanation) {
        this.explanation = newExplanation;
    }
}

function errorHandler(error, req, res, next) {
    if(error instanceof APIError) {
        const statusCode = error.status || 500;
        res.status(statusCode).json(error);
    } else {
        res.status(500).json({
            name: "UnknownError",
            message: "An unknown error has occurred.",
            error: error,
        });
    }
}

const errors = new APIError({});

/**
 * 600-level
 * Validation Errors
 */
errors.createError({ name: "InvalidUUIDError",
    code: 600,
    status: 400,
    message: "The given UUID was not a valid UUID.",
    explanation: "Unable to find resource with an invalid UUID.",
    response: "Please supply a valid UUID."
});

/**
 * 700-level
 * Model Attribute Errors
 */
errors.createError({ name: "PetAttributeError",
    code: 700,
    status: 400,
    message: "The given attribute does not exist for the model Pet.",
    explanation: "The model Pet does not contain the given attribute.",
    response: "The model Pet has the following attributes: name, type, ageInDays, breed, sex, weightInKg, birthday, adoptionStatus, dateAdmitted, description"
});

errors.createError({ name: "DonationAttributeError",
    code: 701,
    status: 400,
    message: "The given attribute does not exist for the model Donation.",
    explanation: "The model Donation does not contain the given attribute.",
    response: "The model Donation has the following attributes: name, email, amount, comments"
});

errors.createError({ name: "VolunteerApplicationAttributeError",
    code: 702,
    status: 400,
    message: "The given attribute does not exist for the model VolunteerApplication.",
    explanation: "The model VolunteerApplication does not contain the given attribute.",
    response: "The model VolunteerApplication has the following attributes: name, dob, email, phone, haveWorkedWithAnimals, interestText, acknowledgedTerms"
});

errors.createError({ name: "ApplicationAttributeError",
    code: 703,
    status: 400,
    message: "The given attribute does not exist for the model Application.",
    explanation: "The model Application does not contain the given attribute.",
    response: "The model Application has the following attributes: address1, address2, address3, city, state, country, postalCode, petId, type, name, dob, email, phone, homeType, haveChildren, homeStatus, homeDescription, homeContact, isFirstPet, haveOtherPets, petsDescription, vetName, vetPhone, haveWorkedWithAnimals, interestText, acknowledgedTerms"
});

/**
 * 720-level Errors
 * Model Access Errors
 */
errors.createError({ name: "PetDoesNotExist",
    code: 720,
    status: 404,
    message: "No Pet with the given attribute exists.",
    explanation: "There is no Pet that has the given attribute.",
    response: "The Pet model does not have a record that matches the given attribute."
});

errors.createError({ name: "DonationDoesNotExist",
    code: 721,
    status: 404,
    message: "No Donation with the given attribute exists.",
    explanation: "There is no Donation that has the given attribute.",
    response: "The Donation model does not have a record that matches the given attribute."
});

errors.createError({ name: "VolunteerApplicationDoesNotExist",
    code: 722,
    status: 404,
    message: "No VolunteerApplication with the given attribute exists.",
    explanation: "There is no VolunteerApplication that has the given attribute.",
    response: "The VolunteerApplication model does not have a record that matches the given attribute."
});

errors.createError({ name: "ApplicationDoesNotExist",
    code: 723,
    status: 404,
    message: "No Application with the given attribute exists.",
    explanation: "There is no Application that has the given attribute.",
    response: "The Application model does not have a record that matches the given attribute."
});

errors.createError({ name: "ApplicationAddressDoesNotExist",
    code: 724,
    status: 404,
    message: "No ApplicationAddress with the given attribute exists.",
    explanation: "There is no ApplicationAddress that has the given attribute.",
    response: "The ApplicationAddress model does not have a record that matches the given attribute."
});


/**
 * 900-level Errors
 * General Errors
 */
errors.createError({ name: "ResourceDoesNotExist",
    code: 900,
    status: 404,
    message: "No resource exists with the given attribute.",
    explanation: "There is no resource that contains the given attribute.",
    response: "The requested model does not have a record that matches the given attribute"
});

errors.createError({ name: "ResourcesDoNotExist",
    code: 902,
    status: 500,
    message: "The requested resources do not exist.",
    explanation: "There are no records for the requested resource to send.",
    response: "The server could not find any records for the requested resource."
});

errors.createError({ name: "CouldNotCreateResource",
    code: 902,
    status: 500,
    message: "The requested resource could not be created with the given attributes.",
    explanation: "There was an error attempting to create the requested resource.",
    response: "The server could not create a resource with given attributes."
});

errors.createError({ name: "CouldNotUpdateResource",
    code: 903,
    status: 500,
    message: "The requested resource could not be updated with the given attributes.",
    explanation: "There was an error attempting to update the requested resource.",
    response: "The server could not update the resource with given attributes."
});

errors.createError({ name: "CouldNotDeleteResource",
    code: 904,
    status: 500,
    message: "The requested resource could not be deleted.",
    explanation: "There was an error attempting to delete the requested resource.",
    response: "The server could not delete the requested resource."
});


module.exports = {
    errors: errors,
    errorHandler: errorHandler
};