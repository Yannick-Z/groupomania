const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const querySql = require('../config/querySql');
const unlinkAsync = promisify(fs.unlink);
const db = require('../config/db');
const dbAsync = require('../models/model');



module.exports = {


    createPost: async (req, res) => {

        if (req.body.id != req.token.userId) { //Si l'id different du token alors return false
            console.log('pas bon');
            res.send(false);
        }
        else {
            // await db.query(
            // querySql.getUserInfo, [req.body.id], //Requete BDD
            // (err, results) => {

            //     if (err) throw (err);
            //     console.log(req.body.id, req.token);
            const title = req.body.title; //On rentre un titre  
            const description = req.body.description; //Une description
            const image = req.file.filename; //Une image
            const user_id = req.body.id;



            db.query(
                querySql.createPost, [title, description, image, user_id], //Requete SQL pour la création de posts
                (err, results) => {
                    if (err) throw (err);

                    res.send(results);
                });


            // });
        }







    },



    getPost: async (req, res) => {


        db.query(
            querySql.getPost, (err, results) => { //Requete pour récuperer le post
                if (err) {
                    console.log(err);
                    res.status(500).json(err);
                }
                else {
                    results.forEach(result => {
                        db.query(
                            querySql.getCommentbyPostId, [result.id], (err, comments) => { //Requete SQL pour comementer et récuperer les commentaires
                                if (err) {
                                    res.status(500).json(err);
                                }
                                else {
                                    result.comments = comments;
                                    if (results.indexOf(result) == results.length - 1)
                                        res.status(200).json(results);
                                }
                            });
                    });
                }
            });
    },

    getUser: (req, res) => {
        try {
            const username = req.params.token;
            const user_id = req.body.id;
           


            db.query(
                querySql.login, username, (err, results) => { //Requete SQL (cf query.SQL)
                    if (err) throw (err);

                    console.log(results[0]);
                    if (results[0].id != req.token.userId) return res.status(401).send({ 'msg': 'pas le bpon utilisateur' });

                    
                    db.query(
                        querySql.getUser, [user_id, username], (err, results) => { //On récupère le user
                            if (err) throw (err);

                            res.send(results);

                        });
                }); 
        }
        catch (err) {
            res.status(401) // Retourne une erreur 401
                .send({ 'msg': err });
        }

    },



    //creation de commentaire

    comment: (req, res) => {
        const postId = req.body.postId;
        const userId = req.body.userId;
        const comment = req.body.comment;

        db.query(
            querySql.postComment, [comment, postId, userId], //On insère les commentaires dans la base de donnée
            (err, results) => {
                if (err) {
                    console.log(err);
                    res.status(500).json(err);
                }
                else {
                    res.status(201).json(results);
                }
            }
        );
    },

    //Modifier des likes 


    like: (req, res) => {

        const userLiking = req.body.userLiking;
        const postId = req.body.postId;

        db.query(
            querySql.like, [userLiking, postId], // Requete SQL pour poster des likes
            (err, results) => {
                if (err) {
                    console.log(err);
                }
                db.query(
                    querySql.updateLikes, //Actualaise les likes dans la BDD
                    postId,
                    () => {
                        res.send(results);
                    });
            }
        );

    },


    //Modifier des description et images 
    modifyPost: async (req, res) => {
        const id = req.params.id;
        const title = req.body.title;
        const description = req.body.description;

        try {
            //met à jour le titre
            await dbAsync.query(querySql.modifyPostInfo, [title, description, id]); //Requete sql (cf query.SQL)
            console.log(req.image);
            if (req.file) {
                const image = req.file.filename;
                const fileExist = await dbAsync.query(querySql.multerSelectModify, [id],);

                if (fileExist !== []) {// TODO verifier le contenu de filexist quand il n'y a pas d'image qui existe
                    console.log('>>>', fileExist[0]);
                    let pathname = fileExist[0].image;

                    unlinkAsync(path.join(__dirname, '../images/' + pathname));
                    await dbAsync.query(querySql.multerImageModify, [image, id],);
                }
            }
            res.send({ msg: 'ok' });

        } catch (error) {
            console.log(error);

            res.status(500).send(error); //Retourne erreur 500

        }
    },




    //Supprimer des posts 


    deletePost: (req, res) => {
        const id = req.params.id;
        db.query(querySql.multerSelectModify, [id], (err, results) => { //permet de selectionner les posts dans la base de donnée
            if (err) {
                console.log(err);
            }
            let pathname = results[0].image;
            unlinkAsync(path.join(__dirname, '../images/' + pathname));
            db.query(querySql.deleteUploads, [id], (err, result) => { //Permt de supprimer les posts dans la base de données
                if (err) {
                    console.log(err);

                } else {
                    res.send(result);
                }
            });
        });
    }
};




