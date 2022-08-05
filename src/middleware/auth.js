var jwt = require("jsonwebtoken");

const jwtKey = "my_secret_key";
let token;

//basic authentication done not using bcrypt as said in assignment

async function authenticate(req, res, next) {
  try {
    token = jwt.sign("jwttoken", jwtKey);
    if (token) {
      console.log(token);
      
    }
      var decoded = jwt.verify(token, "my_secret_key");
      console.log(decoded, " new");
      next();
  } catch (error) {
    console.log(error);
  }
}



module.exports = { authenticate};
