const dotenv = require("dotenv");
dotenv.config("");

exports.JWT_SECRET = process.env.JWT_SECRET;
exports.JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
exports.DB = process.env.LOCAL_DATABASE;
exports.PORT = process.env.PORT;
exports.SALT_ROUNDS = +process.env.SALT_ROUNDS;
exports.SALT_SECRET = process.env.SALT_SECRET;

exports.AUTH_USER = process.env.AUTH_USER;
exports.AUTH_PASS = process.env.AUTH_PASS;
exports.FRONTEND_URL = process.env.FRONTEND_URL;
exports.LINK_TOKEN_JWT_EXPIRES_IN = process.env.LINK_TOKEN_JWT_EXPIRES_IN;
