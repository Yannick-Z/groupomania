db = require("./model");

async function register(username, password){
    try{
        const result = await db.query(
            "INSERT INTO Users (username, password) VALUES (?, ?);",
            [username, password]
        );
        return result;
    
    }
    catch(e){
        
    } 
}