const bcrypt = require('bcrypt');

const hashedPassword = "$2b$10$kzwgpGDi7ER4NnWkyu4v/uZs4qh/MZ7F/7rdXKzWzyuXjfy.4glw.";
const plainTextPassword = "c2PIYNezU?LA"; // The password you want to test

bcrypt.compare(plainTextPassword, hashedPassword, (err, result) => {
    if (err) {
        console.error("Error comparing passwords:", err);
    } else if (result) {
        console.log("Password matches!");
    } else {
        console.log("Password does not match.");
    }
});
