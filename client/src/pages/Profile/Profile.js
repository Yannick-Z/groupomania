import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Profile.css';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import UpdateIcon from '@material-ui/icons/Update';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useHistory } from 'react-router-dom';


function Profile() {

    const [yourUploads, setYourUploads] = useState([]);
    const [newDescription, setNewDescription] = useState('');
    const [image, setNewImage] = useState([]);
    const [newTitle, setNewTitle] = useState('');




    useEffect(() => {
        if (!localStorage.getItem('loggedIn')) {
            localStorage.setItem('loggedIn', true);
        }
    }, []);

    let history = useHistory();




    useEffect(() => {
        Axios.post(`http://localhost:3001/upload/byUser/${localStorage.getItem('username')}`, //On récupère les post via le username
            {
                id: localStorage.getItem('id')//On récupère l'id
            },
            {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}` //On récupère le token
                }
            },
        ).then((response) => {
            setYourUploads(response.data); //Récupère les données d'un des utilisateurs
        });
    }, []);

    //Supprimer ses posts
    const deleteYourUploads = (id) => {
        Axios.delete(`http://localhost:3001/upload/delete/${id}`, //Permet de supprimer ses posts
            {


                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}` //On récupère le token
                }
            },
        ).then(() => {
            setYourUploads(
                yourUploads.filter((val) => {
                    return val.id !== id; // Permet de supprimer ses publications personelles
                })
            );
        });
    };

    //Modifier ses posts
    const updateUploadsImage = (id) => { // Permet de modifier ses images 
        const formData = new FormData();
        formData.append('image', image[0]);
        Axios.put(`http://localhost:3001/upload/update/${id}`, formData,

        ).then((response) => {
            console.log(response);
            window.alert('update'); //Alerte indiquant que l'image à été modifiée
        });
    };

    const updateUploadsDescription = (id) => {  // Permets de mofier la description
        Axios.put(`http://localhost:3001/upload/update/${id}`,
            {
                description: newDescription,
                id: id
            },
            {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}` //Onrécupère le token
                }
            },
        ).then((response) => {
            console.log(response);
            window.alert('update'); //Alerte nouvelle description
        });
    };

    const updateUploadsTitle = (id) => { //Permets de modifier le titre
        Axios.put(`http://localhost:3001/upload/update/${id}`,
            {
                title: newTitle,
                id: id
            },
            {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            },
        ).then((response) => {
            console.log(response);
            window.alert('update');//Alerte nouveau titre
        });
    };

    const deleteUser = () => {
        Axios.delete('http://localhost:3001/user/deleteUser/', { //Permet de supprimer un user

            'data': {
                'id': localStorage.getItem('id'), //On récupère l'id
                'userToDelete': localStorage.getItem('id'), 
            },
            'headers': {
                'authorization': `Bearer ${localStorage.getItem('token')}` //recupère le token
            }
        }
        ).then((response) => {
            console.log(response);
            window.alert('compte supprimé');//Alerte nouveau titre
            history.push('/login');
        });
    };



    return (
        <div className="Profile">

            <h2>{localStorage.getItem('username')}</h2>
            {yourUploads.map((val) => {
                return (
                    // eslint-disable-next-line react/jsx-key
                    <div className="Post">
                        <div className="Image">
                            <img src={'http://localhost:3001/images/' + val.image} alt="image de votre profil" />
                            <label htmlFor="fichier">Vos fichiers</label>
                            <input type="file" id="fichier" onChange={(e) =>
                                // @ts-ignore
                                setNewImage(e.target.files)} /> {/* Update l'image */}
                            <UpdateIcon id="updateIcon" onClick={() => { updateUploadsImage(val.id); }} />

                        </div>
                        <div className="Content">
                            <div className="title">
                                <UpdateIcon id="updateIconTitle" onClick={() => { updateUploadsTitle(val.id); }} />
                                <label htmlFor="titre">Titre</label>
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
                                <label htmlFor="description">description</label>
                                <input type="text" placeholder="Update your description" id="description"
                                    onChange={(event) => {
                                        setNewDescription(event.target.value); /* Update description */
                                    }}
                                />
                                <UpdateIcon id="updateIcon" onClick={() => { updateUploadsDescription(val.id); }} />
                            </div>
                            <DeleteForeverIcon id="deleteIcon" onClick={() => {
                                deleteYourUploads(val.id); /* Bouton permettant de supprimer */
                            }}
                            />


                        </div>
                    </div>

                );

            })}
            <h3><DeleteForeverIcon id="deleteAccount" onClick={() => { deleteUser(); }} />Supprimer votre compte</h3> 
        </div>



    );
}

export default Profile;
