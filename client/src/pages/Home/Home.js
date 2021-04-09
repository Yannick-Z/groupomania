import React, { useEffect, useState } from 'react';
import "./Home.css";
import { Image } from 'cloudinary-react';
import Axios from 'axios';
import Admin from '../../components/Admin';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';


function Home() {

    const [uploads, setUploads] = useState([]);
    const [likes, setLikes] = useState(0);
    const [roles, setRoles] = useState("");
    
    Axios.defaults.withCredentials = true;

    useEffect (() => {
        Axios.get('http://localhost:3001/user/login').then((response) => {
            if (response.data.loggedIn == true) {
                setRoles(response.data.user[0].roles);
                console.log(response.data);
            }
        });
    }, []);
    




    useEffect(() => {

        if (!localStorage.getItem("loggedIn")) {
            localStorage.setItem("loggedIn", false);
        }
    }, []);

    useEffect(() => {
        Axios.get("http://localhost:3001/upload").then((response) => {
            setUploads(response.data);
            var tempArr = [];

            response.data.map((val) => {
                tempArr.push(val.likes);
            });

            setLikes(tempArr);

        });
    }, []);

    const likePost = (id) => {
        Axios.post('http://localhost:3001/upload/like', {
            userLiking: localStorage.getItem("username"),
            postId: id,
        }).then((response) => {
            console.log("you liked this post");

        });
    };

    /* const deleteUploads= (id)=> {
        Axios.delete(`http://localhost:3001/upload/delete/${id}`).then((response) => {
            setUploads(
                uploads.filter((val) => {
                    return val.id !== id;
                })
            )
        });
    }; */

    

    return (
        <div className="Home">
            <h1>{roles}</h1>
                
            {uploads.map((val, key) => {
                return (
                    <div className="Post">
                        <div className="Image">
                            <Image
                                cloudName="dbxwrsswh"
                                publicId={val.image}

                            />
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

                                    setLikes(likes + 1);
                                    console.log(likes);


                                }}


                            />
                            {val.likes}

                            {/*  <button onClick={(key)=> {deleteUploads(val.id);
            }}
            >Delete</button> */}

                        </div>
                    </div>
                );
            })}
        </div>
    );
}




export default Home;
