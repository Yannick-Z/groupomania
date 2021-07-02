
module.exports = {

    register: 'INSERT INTO Users (username, password, role) VALUES (?, ?, ?);', //On insère un user
    login: 'SELECT * FROM Users WHERE username  = ? ', //On select un user avec le username
    getUserInfo: 'SELECT * FROM Users WHERE id  = ? ', //On select un user avec l'id
    createPost: 'INSERT INTO uploads (title, description, image, user_id) VALUES (?, ?, ?, ?);', //On insère les posts
    getPost: 'SELECT uploads.id, uploads.description,  uploads.title, uploads.image, uploads.likes, users.username AS author FROM uploads, users WHERE user_id = users.id',//On select les posts',
    getUser: 'SELECT  * FROM uploads WHERE user_id = ?' , //Onselect les posts via l'auteur
    modifyPostInfo: 'UPDATE uploads SET title = ?, description = ? WHERE id = ? ', // On modifie titre et description
    multerSelectModify: 'SELECT * FROM uploads WHERE id = ?', 
    multerImageModify: 'UPDATE uploads SET image = ? WHERE id = ?', //On modifie l'image 
    deleteUploads: 'DELETE FROM uploads WHERE id= ? ', //On supprime les posts
    like: 'INSERT INTO likes (userLiking, postId ) VALUES (?, ?) ', //Post les likes
    updateLikes: 'UPDATE Uploads SET likes = likes + 1 WHERE id = ?', //On modifie les likes avec +1
    postComment: 'INSERT INTO comment (commentaire, post_id, user_id) VALUES (?,?,?);', //Insere un commentaire
    getCommentbyPostId: 'SELECT comment.*, users.username FROM comment, users WHERE comment.post_id = ? and comment.user_id = users.id',
    deleteComment: 'DELETE FROM comment WHERE user_id = ?', 
    deleteAccount: 'DELETE FROM users WHERE id = ? ', //Supprime un user   
  
 
    // Requête SQL pour la base de données       

};       