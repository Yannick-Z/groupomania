
module.exports = {

    register: 'INSERT INTO Users (username, password, role) VALUES (?, ?, ?);', //On insère un user
    login: 'SELECT * FROM Users WHERE username  = ? ', //On select un user avec le username
    getUserInfo: 'SELECT * FROM Users WHERE id  = ? ', //On select un user avec l'id
    createPost: 'INSERT INTO uploads (title, description, image, author) VALUES (?, ?, ?, ?);', //On insère les posts
    getPost: 'SELECT * FROM uploads', //On select les posts
    getUser: 'SELECT * FROM uploads WHERE author =? ', //Onselect les posts via l'auteur
    modifyPostInfo: 'UPDATE uploads SET title = ?, description = ? WHERE id = ? ', // On modifie titre et description
    multerSelectModify: 'SELECT * FROM uploads WHERE id = ?',
    multerImageModify: 'UPDATE uploads SET image = ? WHERE id = ?', //On modifie l'image
    deleteUploads: 'DELETE FROM uploads WHERE id= ? ', //On supprime les posts
    like: 'INSERT INTO likes (userLiking, postId ) VALUES (?, ?) ', //Post les likes
    updateLikes: 'UPDATE Uploads SET likes = likes + 1 WHERE id = ?', //On modifie les likes avec +1
    postComment: 'INSERT INTO comment (commentaire, postId, userId) VALUES (?,?,?);', //Insere un commentaire
    getCommentbyPostId: 'SELECT comment.*, users.username FROM comment, users WHERE comment.postId = ? and comment.userId = users.id',
    deleteAccount: 'DELETE FROM users WHERE id= ? ', //Supprime un user


    // Requête SQL pour la base de données 

};