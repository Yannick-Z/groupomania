import React, { useState } from 'react'
import "./Upload.css";
import Axios from 'axios'
import { useHistory } from 'react-router-dom'


function Upload() {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('');
    const [image, setImage] = useState([]);

    let history = useHistory();

    const upload = () => {

        const formData = new FormData()
        formData.append("image", image[0])
        formData.append("data", JSON.stringify({ //Permet de poster des publi, et est envoyé a la bdd
            title: title,
            description: description,
            author: localStorage.getItem('username')
        }))
        Axios.post("http://localhost:3001/upload/", formData).then(() => {
            history.push('/');
        });
    };

    return (
        <div className="Upload">
            <h1>Create a post</h1>
            <div className="UploadForm">
                <label for="titre">Title</label>
                <input
                    type="text"
                    placeholder="Title..."
                    id="titre"
                    onChange={(event) => {
                        setTitle(event.target.value); //L'utilisateur rentre son titre
                    }}
                />
                <label for="description">Description</label>
                <input
                    type="text"
                    placeholder="Description..."
                    id="description"
                    onChange={(event) => {
                        setDescription(event.target.value);//L'utilisateur rentre sa description
                    }}
                />
                <label for="uploads">Uploads</label>
                <input type="file" id="uploads" onChange={(e) => setImage(e.target.files)} /> {/* Lutilisateur rentre son image */}
                <button onClick={upload}>Upload</button>
            </div>

        </div>
    );
}

export default Upload;
