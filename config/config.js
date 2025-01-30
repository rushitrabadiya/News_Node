const dotenv = require("dotenv");
dotenv.config("");

exports.JWT_SECRET = process.env.JWT_SECRET;
exports.JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
exports.DB = process.env.LOCAL_DATABASE;
exports.PORT = process.env.PORT;
exports.SALT_ROUNDS = +process.env.SALT_ROUNDS;
exports.SALT_SECRET = process.env.SALT_SECRET;
