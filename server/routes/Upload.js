const express = require('express');
const router = express.Router();

const db = require('../config/db');

router.post("/", (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const image = req.body.image;
    const author = req.body.author;

    
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

router.put('/update/:id', (req, res) => {
    const id = req.params.id;
    const image = req.body.image;
    const description = req.body.description;
  
    if(image){
      db.query("UPDATE uploads SET image = ? WHERE id = ?", [image, id], (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      });
    }
    else{
      db.query("UPDATE uploads SET description = ? WHERE id = ?", [ description, id], (err, result) => {
           if (err) {
              console.log(err);
           } else {
              res.send(result);
                   }
      });
    }
  });
  


 /* router.put('/update/:id', (req, res) => {
    const id = req.params.id;
    const image = req.body.image;
   
    db.query("UPDATE uploads SET image = ? WHERE id = ?", [image, id], (err, result) => {
        if (err) {
            console.log(err);
       } else {
           res.send(result);
        }
    });

 }); 

 /* router.put('/update/:id', (req, res) => {
    const id = req.params.id;
    const description = req.body.description;
    
   
    db.query("UPDATE uploads SET description = ? WHERE id = ?", [ description, id], (err, result) => {
         if (err) {
            console.log(err);
         } else {
            res.send(result);
                 }
    });
 }); */ 

router.delete('/delete/:id', (req, res) => {
    const id = req.params.id
    db.query("DELETE FROM uploads WHERE id= ?", [id], (err, result) => {
        if (err) {
            console.log(err) 
            
        } else {
            res.send(result);
        }
    })
})



module.exports = router;