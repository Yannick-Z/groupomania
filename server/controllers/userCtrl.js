const modelUser = require("../models/userModel");
async function register(username, password){
        try{
            await modelUser.register(username, password);
            return true;
    }
    catch(e){
        console.log(register)

    }
}


module.exports.register = register;