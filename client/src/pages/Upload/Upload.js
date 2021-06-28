import React, { useState } from 'react';
import './Upload.css';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';


function Upload() {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState([]);


    let history = useHistory();

    const upload = () => {

        const formData = new FormData();
        formData.append('image', image[0]);
        formData.append('data', JSON.stringify({ //Permet de poster des publi, et est envoyé a la bdd
            title: title,
            description: description,
            author: localStorage.getItem('username'), //On récupère le username
            id: localStorage.getItem('id'),//récupère l'id


        }));
        Axios.post(
            'http://localhost:3001/upload/', formData, //On envoie le formdata

            {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`, //On récupère le token

                }
            },
        ).then((response) => {
            console.log(response);

            history.push('/');
        });
    };

    return (
        <div className="Upload">
            <h1>Create a post</h1>
            <div className="UploadForm">
                <label htmlFor="titre">Title</label>
                <input
                    type="text"
                    placeholder="Title..."
                    id="titre"
                    onChange={(event) => {
                        setTitle(event.target.value); //L'utilisateur rentre son titre
                    }}
                />
                <label htmlFor="description">Description</label>
                <input
                    type="text"
                    placeholder="Description..."
                    id="description"
                    onChange={(event) => {
                        setDescription(event.target.value);//L'utilisateur rentre sa description
                    }}
                />
                <label htmlFor="uploads">Uploads</label>
                <input type="file" id="uploads" onChange={(e) => setImage(
                    // @ts-ignore
                    e.target.files)} /> {/* Lutilisateur rentre son image */}
                <button onClick={upload}>Upload</button>
            </div>

        </div>
    );
}

export default Upload;


