const express = require('express');
const router = express.Router();
const multer = require ('../middleware/multer-config');
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");

const unlinkAsync = promisify(fs.unlink);




const db = require('../config/db');
const dbAsync = require('../models/model');

router.post("/", multer, (req, res) => {
    req.body.data = JSON.parse(req.body.data)
    console.log(req.body);
    const title = req.body.data.title;
    const description = req.body.data.description;
    const image = req.file.filename;
    const author = req.body.data.author;

    
    db.query(
        "INSERT INTO uploads (title, description, image, author) VALUES (?, ?, ?, ?);",
        [title, description, image, author],
        (err, results) => {
            console.log (err);
            res.send(results);
        }
    );
});

router.get("/", (req, res) => {
    db.query("SELECT * FROM uploads", (err, results) => {
        if (err) {
            console.log (err)
        }
        res.send(results)
    });
});

router.get("/byUser/:username", (req, res) => {
    const userName = req.params.username
    db.query("SELECT * FROM uploads WHERE author =? ", userName, (err, results) => {
        if (err) {
            console.log (err)
        }
        res.send(results)
    });
});

//Modifier des likes 


router.post('/like', (req, res) => {

    const userLiking = req.body.userLiking
    const postId = req.body.postId


    db.query("INSERT INTO likes (userLiking, postId ) VALUES (?, ?) " , [userLiking, postId],
    (err, results) => {
        if (err) {
            console.log (err);
        }
        db.query(
            "UPDATE Uploads SET likes = likes + 1 WHERE id = ?",
        postId,
        (err2, results2) => {
            res.send(results);
        })
        }
    );

});


//Modifier des description et images 
router.put('/update/:id', multer, async (req, res) => {
    const id = req.params.id;
    // console.log(req.body);
    const title = req.body.title;
    const description = req.body.description;

    try {
        //met à jour le titre
         await dbAsync.query("UPDATE uploads SET title = ?, description = ? WHERE id = ? ", [ title, description, id]);
            console.log(req.image)
         if(req.file){
             const image = req.file.filename;
             const fileExist = await dbAsync.query("SELECT * FROM uploads WHERE id = ?", [id], );
             
             if (fileExist !==[]){// TODO verifier le contenu de filexist quand il n'y a pas d'image qui existe
                 console.log(">>>",fileExist[0]);
                let pathname = fileExist[0].image;

                unlinkAsync(path.join(__dirname,"../images/"+ pathname));
                 await dbAsync.query("UPDATE uploads SET image = ? WHERE id = ?", [image, id], );
             }
        }
        res.send({msg:"ok"});

    } catch (error) {
            console.log(error);
            
        res.status(500).send(error);
        
    }
 });


 //Supprimer des posts 


router.delete('/delete/:id', (req, res) => {
    const id = req.params.id
    db.query("SELECT * FROM uploads WHERE id = ?", [id] ,(err, results) => {
        if (err) {
        console.log (err)
        }
        let pathname = results[0].image;
        unlinkAsync(path.join(__dirname,"../images/"+ pathname));
    db.query("DELETE FROM uploads WHERE id= ?", [id], (err, result) => {
        if (err) {
            console.log(err) 
            
        } else {
            res.send(result);
        }
    })
})
})



module.exports = router;