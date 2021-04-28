import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Image } from "cloudinary-react";
import "./Profile.css";


function Profile() {

    const [yourUploads, setYourUploads] = useState([]);

    useEffect(() => {
        Axios.get(`http://localhost:3001/upload/byUser/${localStorage.getItem("username")}`, ).then((response) => {
        setYourUploads(response.data); //Récupère les données d'un des utilisateurs
        });
    });

    const deleteYourUploads= (id)=> {
        Axios.delete(`http://localhost:3001/upload/delete/${id}`).then((response) => {
            setYourUploads(
                yourUploads.filter((val) => {
                    return val.id !== id; // Permet de supprimer ses piblications personelles
                })
            )
        });
    };
    return (
        
            <div className="Profile">
            <h1>{localStorage.getItem("username")}</h1>
            {yourUploads.map((val, key) => {
                    return(
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
                <div className="Engagement">{val.likes}
                <button onClick={(key)=> {deleteYourUploads(val.id);
            }}
            >Delete</button>
            </div>
                </div>
                );
            })}
            </div>
            
        
    );
}

export default Profile
