var crypto = require('crypto')

var genRandomString = function(length){
    return crypto.randomBytes(Math.ceil(length/2))
            .toString('hex') /** convert to hexadecimal format */
            .slice(0,length);   /** return required number of characters */
};

/*
  Call this function when you want to generate the hashstring with the salt. This can 
  be used to validate or make the password.
*/
var sha512 = function(password, salt){
    var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
    hash.update(password);
    var value = hash.digest('hex');
    return {
        salt:salt,
        passwordHash:value
    };
};

/*
  Call this function when you want to generate a new password with random salt. 
  This is only used when a new password is entered into the system. 
*/
function saltHashPassword(userpassword) {
    var salt = genRandomString(4); /** Gives us salt of length 16 */
    var passwordData = sha512(userpassword, salt);
    return passwordData;
}


module.exports = {saltHashPassword,sha512}