import React, { useEffect, useState } from 'react';
import "./Home.css";
//  import { Image } from 'cloudinary-react';
import Axios from 'axios';

import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';


function Home() {

    const [uploads, setUploads] = useState([]);
    const [likes, setLikes] = useState(0);
    const [role, setRole] = useState("");
    const [yourUploads, setYourUploads] = useState([]);
    const admin = localStorage.getItem('role');

    
    
    Axios.defaults.withCredentials = true;
    
    
   
    



    useEffect(() => {

        if (!localStorage.getItem("loggedIn")) {
            localStorage.setItem("loggedIn", false);
        }
    }, []);

    
    useEffect(() => {
        Axios.get('http://localhost:3001/user/login').then((response)=>{ //Requête Axios pour le login
            
            if (response.data.loggedIn == true ) {
                setRole(response.data.user[0].role); //Check le rôle de l'utilisateur
                console.log(response.data);
            }
        });
    }, []);

    useEffect(() => {
        Axios.get("http://localhost:3001/upload").then((response) => {//Récupère les uploads des utilisateurs
            setUploads(response.data);
            var tempArr = [];

            response.data.map((val) => {
                tempArr.push(val.likes);
            });

            setLikes(tempArr);

        });
    }, []);

    const likePost = (id) => {
        Axios.post('http://localhost:3001/upload/like', { //Permet de mettre un like aux publications
            userLiking: localStorage.getItem("username"),
            postId: id,
        }).then((response) => {
            console.log("you liked this post");

        });
    };

    const deleteYourUploads= (id)=> {
        Axios.delete(`http://localhost:3001/upload/delete/${id}`).then((response) => {//Permet de supprimer ses publications
            setUploads(
                uploads.filter((val) => {
                    return val.id !== id;
                })
            )
        });
    }; 

    

    return (
        <div className="Home">
            
            <h1>{role}</h1>
            {uploads.map((val, key) => {
                return (
                    <div className="Post" key= {key}>
                        <div className="Image">
                        <img src={`http://localhost:3001/images/`+ val.image} />
                        </div>
                        <div className="Content">
                            <div className="title">
                                {""}
                                {val.title} / by @{val.author} </div> 
                            <div className="description">{val.description}</div>
                        </div>
                        <div className="Engagement">
                            <ThumbUpAltIcon
                                id="likeButton" onClick={() => {
                                    likePost(val.id);
                                    console.log(likes);

                                    setLikes(likes + 1);//Actualise les likes avec +1
                                    console.log(likes);


                                }}


                            />
                            {val.likes}

                    { admin == "admin" ?  <button onClick={(key)=> {deleteYourUploads(val.id);
            }}
            >Delete</button> : null}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}




export default Home;
