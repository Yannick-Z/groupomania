const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config');
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const querySql = require('../config/querySql');

const unlinkAsync = promisify(fs.unlink);

const db = require('../config/db');
const dbAsync = require('../models/model');
const { query } = require('../config/db');

module.exports = {


    createPost: (req, res) => {
        req.body.data = JSON.parse(req.body.data)
        console.log(req.body);
        const title = req.body.data.title;
        const description = req.body.data.description;
        const image = req.file.filename;
        const author = req.body.data.author;

        db.query(
            querySql.createPost, [title, description, image, author],
            (err, results) => {
                console.log(err);
                res.send(results);
            }
        );
    },



    getPost: async (req, res) => {
        db.query(
            querySql.getPost, (err, results) => {
                if (err) {
                    console.log(err)
                    res.status(500).json(err);
                }
                else {
                    results.forEach(result => {
                        db.query(
                            querySql.getCommentbyPostId, [result.id], (err, comments) => {

                                if (err) {
                                    res.status(500).json(err);
                                }
                                else {

                                    result.comments = comments;
                                    if (results.indexOf(result) == results.length - 1)
                                        res.status(200).json(results);
                                }
                            })



                    });

                }
            });
    },

    getUser: (req, res) => {
        const userName = req.params.username
        db.query(
            querySql.getUser, userName, (err, results) => {
                if (err) {
                    console.log(err)
                }
                res.send(results)
            });
    },



    //creation de commentaire

    comment: (req, res) => {
        const postId = req.body.postId
        const userId = req.body.userId
        const comment = req.body.comment

        db.query(
            "INSERT INTO comment (commentaire, postId, userId) VALUES (?,?,?);", [comment ,postId, userId],
            (err, results) => {
                if (err) {
                    console.log(err);
                    res.status(500).json(err)
                }
                else {
                    res.status(201).json(results)
                }



            }
        )
    },

    //Modifier des likes 


    like: (req, res) => {

        const userLiking = req.body.userLiking
        const postId = req.body.postId

        db.query(
            querySql.like, [userLiking, postId],
            (err, results) => {
                if (err) {
                    console.log(err);
                }
                db.query(
                    "UPDATE Uploads SET likes = likes + 1 WHERE id = ?",
                    postId,
                    (err2, results2) => {
                        res.send(results);
                    })
            }
        );

    },


    //Modifier des description et images 
    modifyPost: async (req, res) => {
        const id = req.params.id;
        // console.log(req.body);
        const title = req.body.title;
        const description = req.body.description;

        try {
            //met à jour le titre
            await dbAsync.query("UPDATE uploads SET title = ?, description = ? WHERE id = ? ", [title, description, id]);
            console.log(req.image)
            if (req.file) {
                const image = req.file.filename;
                const fileExist = await dbAsync.query("SELECT * FROM uploads WHERE id = ?", [id],);

                if (fileExist !== []) {// TODO verifier le contenu de filexist quand il n'y a pas d'image qui existe
                    console.log(">>>", fileExist[0]);
                    let pathname = fileExist[0].image;

                    unlinkAsync(path.join(__dirname, "../images/" + pathname));
                    await dbAsync.query("UPDATE uploads SET image = ? WHERE id = ?", [image, id],);
                }
            }
            res.send({ msg: "ok" });

        } catch (error) {
            console.log(error);

            res.status(500).send(error);

        }
    },


    //Supprimer des posts 


    deletePost: (req, res) => {
        const id = req.params.id
        db.query("SELECT * FROM uploads WHERE id = ?", [id], (err, results) => {
            if (err) {
                console.log(err)
            }
            let pathname = results[0].image;
            unlinkAsync(path.join(__dirname, "../images/" + pathname));
            db.query("DELETE FROM uploads WHERE id= ?", [id], (err, result) => {
                if (err) {
                    console.log(err)

                } else {
                    res.send(result);
                }
            })
        })
    }
}
