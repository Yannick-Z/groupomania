module.exports= {
    register :  "INSERT INTO Users (username, password, role) VALUES (?, ?, ?);",
    login : "SELECT * FROM Users WHERE username = ?",
   
}