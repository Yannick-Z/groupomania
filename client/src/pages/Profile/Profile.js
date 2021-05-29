import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import "./Profile.css";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import UpdateIcon from '@material-ui/icons/Update';
import FavoriteIcon from '@material-ui/icons/Favorite';


function Profile() {

    const [yourUploads, setYourUploads] = useState([]);
    const [newDescription, setNewDescription] = useState("");
    const [image, setNewImage] = useState([]);
    const [newTitle, setNewTitle] = useState("");


    useEffect(() => {
        Axios.get(`http://localhost:3001/upload/byUser/${localStorage.getItem("username")}`,).then((response) => {
            setYourUploads(response.data); //Récupère les données d'un des utilisateurs
        });
    }, []);

    const deleteYourUploads = (id) => {
        Axios.delete(`http://localhost:3001/upload/delete/${id}`).then((response) => {
            setYourUploads(
                yourUploads.filter((val) => {
                    return val.id !== id; // Permet de supprimer ses publications personelles
                })
            )
        });
    };

    const updateUploadsImage = (id) => { // Permet de modifier ses images 

        const formData = new FormData()
        formData.append("image", image[0])
        console.log(formData);
        console.log(image);
        Axios.put(`http://localhost:3001/upload/update/${id}`, formData) //Envoie la nouvelle image
            .then((response) => {
                console.log(response);
                window.alert('update'); //Alerte indiquant que l'image à été modifiée
            })
    }

    const updateUploadsDescription = (id) => {  // Permets de mofier la description
        Axios.put(`http://localhost:3001/upload/update/${id}`, { description: newDescription, id: id })
            .then((response) => {
                console.log(response);
                window.alert('update'); //Alerte nouvelle description
            })
    }

    const updateUploadsTitle = (id) => { //Permets de modifier le titre
        Axios.put(`http://localhost:3001/upload/update/${id}`, { title: newTitle, id: id })
            .then((response) => {
                console.log(response);
                window.alert('update');//Alerte nouveau titre
            })
    }

    return (
        <div className="Profile">
            <h1>{localStorage.getItem("username")}</h1>
            {yourUploads.map((val, key) => {
                return (
                    <div className="Post">
                        <div className="Image">
                            <img src={`http://localhost:3001/images/` + val.image} alt="image de votre profil" /> 
                            <label for="fichier">Vos fichiers</label>
                            <input type="file" id="fichier" onChange={(e) =>
                                setNewImage(e.target.files)} /> {/* Update l'image */} 
                            <UpdateIcon id="updateIcon" onClick={() => { updateUploadsImage(val.id) }} />

                        </div>
                        <div className="Content">
                            <div className="title">
                                <UpdateIcon id="updateIconTitle" onClick={() => { updateUploadsTitle(val.id) }} />
                                    <label for="titre">Titre</label>
                                    <input type="text" placeholder="Update your title" id="titre"
                                    onChange={(event) => { /* Update le titre */
                                        setNewTitle(event.target.value);
                                    }}
                                />
                            </div>
                            <div id="value">{val.title} / by @{val.author} </div> {/* Récupère titre et auteur */}
                            <div className="description">{val.description}</div>
                        </div>
                        <div className="Engagement">
                            <FavoriteIcon />
                            {val.likes}
                            <div>
                                <label for="description">description</label>
                                <input type="text" placeholder="Update your description" id="description"
                                    onChange={(event) => {
                                        setNewDescription(event.target.value); /* Update description */
                                    }}
                                />
                                <UpdateIcon id="updateIcon" onClick={() => { updateUploadsDescription(val.id) }} />
                            </div>
                            <DeleteForeverIcon id="deleteIcon" onClick={(key) => {
                                deleteYourUploads(val.id); /* Bouton permettant de supprimer */
                            }}
                            />

                        </div>
                    </div>

                );

            })}

        </div>


    );
}

export default Profile
