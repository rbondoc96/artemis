/**
 * @param {Array} requestKeys - The model attributes sent through an HTTP request
 * @param {Array} modelAttributes - The model's actual attributes
 * @returns {Array} errorKeys - Any keys in the HTTP request that are not in the model's attributes
 */
function keyValidator(requestKeys, modelAttributes) {
    let errorKeys = [];

    for(let idx in requestKeys) {
        let key = requestKeys[idx];
        if(!modelAttributes.includes(key)) {
            errorKeys.push(key);
        }
    }
    
    return errorKeys;
}

module.exports = keyValidator;