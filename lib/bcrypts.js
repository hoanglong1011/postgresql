var bcrypt = require('bcrypt');
const saltRounds = 10;
const someOtherPlaintextPassword = 'not_bacon';

function hash(password, callback){
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
            // Store hash in your password DB. 
            callback(err, hash);
        });
    });
}

function compare(password, hash, callback){
    // Load hash from your password DB. 
    bcrypt.compare(password, hash, function(err, success) {
        // success == true 
        callback(err, success);
    });
}

module.exports = {hash, compare};