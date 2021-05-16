import React, { useState } from 'react'
import "./Upload.css";
import Axios from 'axios'
import {useHistory} from 'react-router-dom'


function Upload() {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('');
    const [image, setImage] = useState([]);

    let history = useHistory();

    const upload = () => {

        const formData = new FormData()
        formData.append("image", image[0])
        formData.append("data",  JSON.stringify( { //Permet de poster des publi, et est envoyé a la bdd
            title: title, 
            description: description, 
            author: localStorage.getItem('username')
        }))
        Axios.post("http://localhost:3001/upload/",formData).then(()=>{
                    
                    history.push('/');
    
                });

        };
    
        return (
        <div className="Upload">
          <h1>Create a post</h1>
            <div className="UploadForm">
                <input 
                type="text" 
                placeholder="Title..."
                onChange= {(event) => {
                    setTitle(event.target.value);
                }}
                />
                <input 
                type="text" 
                placeholder="Description..."
                onChange= {(event) => {
                    setDescription(event.target.value);
                }}
                />

                <input type="file" onChange={(e) => setImage(e.target.files)}/>
                <button onClick={upload}>Upload</button> 
            </div>
            
        </div>
    );
}

export default Upload;
