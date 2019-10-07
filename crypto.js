const bcrypt = require("bcryptjs");

async function encrypt(string) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(string, salt);
        return hash;
    } catch (error) {
        console.log("Error");
    }
}

module.exports = (encrypt);