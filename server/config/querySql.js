
module.exports = {

    register: 'INSERT INTO Users (username, password, role) VALUES (?, ?, ?);',
    login: 'SELECT * FROM Users WHERE username = ?',
    createPost: 'INSERT INTO uploads (title, description, image, author) VALUES (?, ?, ?, ?);',
    getPost: 'SELECT * FROM uploads',
    getUser: 'SELECT * FROM uploads WHERE author =? ',
    like: 'INSERT INTO likes (userLiking, postId ) VALUES (?, ?) ',
    getCommentbyPostId: 'SELECT comment.*, users.username FROM comment, users WHERE comment.postId = ? and comment.userId = users.id',



    // Requête SQL pour la base de données

};