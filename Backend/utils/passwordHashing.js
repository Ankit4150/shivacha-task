const bcrypt = require('bcrypt')

const salt = 10;

const hashPassword = async (password) => {
    return await bcrypt.hash(password, salt)
}
const comparePassword = async (password, hashedpassword) => {
    return await bcrypt.compare(password, hashedpassword)
}

module.exports = {
    hashPassword,
    comparePassword
}