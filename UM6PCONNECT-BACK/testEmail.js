const bcrypt = require('bcrypt');

const hashedPassword = "$2b$10$EAhI.AVPAr7Bz1pgkUhkmuwf6fFYYqhmEH6xX0wNdbFF/bhlyipc.";
const plainTextPassword = "k!AX_1aA?RZF"; // The password you want to test

bcrypt.compare(plainTextPassword, hashedPassword, (err, result) => {
    if (err) {
        console.error("Error comparing passwords:", err);
    } else if (result) {
        console.log("Password matches!");
    } else {
        console.log("Password does not match.");
    }
});
