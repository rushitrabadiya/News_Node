const CryptoJS = require("crypto-js");
const { SALT_SECRET } = require("./../config/config"); 

exports.hashPassword = async (password) => {
  try {
    const saltedPassword = `${SALT_SECRET}${password}`;
    const hashedPassword = CryptoJS.SHA256(saltedPassword).toString();
    return hashedPassword;
  } catch (error) {
    console.log(error);
    throw new Error("Error hashing password");
  }
};

exports.comparePassword = async (password, hashedPassword) => {
  try {
    const saltedPassword = `${SALT_SECRET}${password}`;
    const hashedInputPassword = CryptoJS.SHA256(saltedPassword).toString();
    return hashedInputPassword === hashedPassword;
  } catch (error) {
    throw new Error("Error comparing passwords");
  }
};
