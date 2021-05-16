import Axios from 'axios';
import React, { useEffect, useState } from 'react';
 import { Image } from "cloudinary-react";
import "./Profile.css";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';


function Profile() {

    const [yourUploads, setYourUploads] = useState([]);
    const [newDescription, setNewDescription] = useState("");
    const [image, setNewImage] = useState([]);

    useEffect(() => {
        Axios.get(`http://localhost:3001/upload/byUser/${localStorage.getItem("username")}`,).then((response) => {
            setYourUploads(response.data); //Récupère les données d'un des utilisateurs
        });
    },[]);

    const deleteYourUploads = (id) => {
        Axios.delete(`http://localhost:3001/upload/delete/${id}`).then((response) => {
            setYourUploads(
                yourUploads.filter((val) => {
                    return val.id !== id; // Permet de supprimer ses piblications personelles
                })
            )
        });
    };
    
    const updateUploadsImage = (id) => {

        const formData = new FormData()
        formData.append("image", image[0])
        console.log(formData);
        console.log(image);
        Axios.put(`http://localhost:3001/upload/update/${id}`, formData)
            .then((response) => {
                console.log(response);
                window.alert('update');
            })
    }

    const updateUploadsDescription = (id) => {
        Axios.put(`http://localhost:3001/upload/update/${id}`, { description: newDescription, id: id })
            .then((response) => {
                console.log(response);
                window.alert('update');
            })
    }


    return (

        <div className="Profile">
            <h1>{localStorage.getItem("username")}</h1>
            {yourUploads.map((val, key) => {
                return (
                    <div className="Post">
                        <div className="Image">
                        <img src={`http://localhost:3001/images/`+ val.image} />
                            <input type="file" onChange={(e) =>
                                setNewImage(e.target.files)} />
                               
                            <button onClick={() => { updateUploadsImage(val.id) }}>Update</button>
                        </div>
                        <div className="Content">
                            <div className="title">
                                {""}
                                {val.title} / by @{val.author} </div>
                            <div className="description">{val.description}</div>
                        </div>
                        <div className="Engagement">{val.likes}
                            <button onClick={(key) => {
                                deleteYourUploads(val.id);
                            }}
                            >Delete</button>
                            <div>
                                <input type="text" placeholder="your description..."
                                    onChange={(event) => {
                                        setNewDescription(event.target.value);
                                    }}
                                />
                            </div>
                            <button onClick={() => { updateUploadsDescription(val.id) }}>Update</button>
                        </div>
                    </div>
                );
            })}
        </div>


    );
}

export default Profile
