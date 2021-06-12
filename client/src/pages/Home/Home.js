import React, { useEffect, useState } from 'react';
import './Home.css';
import Axios from 'axios';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';


function Home() {

    const [uploads, setUploads] = useState([]);
    const [likes, setLikes] = useState(0);
    
    // const [role] = useState('');
    
    // const [yourUploads, setYourUploads] = useState([]);
    const admin = localStorage.getItem('role');
    const [comment, setComment] = useState('');
    
 


    useEffect(() => {
        
        if (!localStorage.getItem('loggedIn')) {
            localStorage.setItem('loggedIn', false);
        }
    }, []);


    useEffect(() => {
        Axios.get('http://localhost:3001/upload',
        ).then((response) => {//Récupère les uploads des utilisateurs
            setUploads(response.data);
            var tempArr = [];
            response.data.map((val) => {
                tempArr.push(val.likes);
            });
            setLikes(tempArr); //Affiche les likes utilisateurs
        });
    }, []);

    const likePost = (id) => {
        Axios.post('http://localhost:3001/upload/like', { //Permet de mettre un like aux publications
            userLiking: localStorage.getItem('username'),
            postId: id,

        }).then(() => {
            console.log('you liked this post');
            window.location.reload();//la page se recharge automatiquement

        });
    };

    const deleteYourUploads = (id) => {
        Axios.delete(`http://localhost:3001/upload/delete/${id}`).then(() => {//Permet de supprimer ses publications
            setUploads(
                uploads.filter((val) => {
                    return val.id !== id;
                })
            );
        });
    };

    const commenter = (postId) => { //Permet de commenter les publications
        let userId = parseInt(localStorage.getItem('id'));
        Axios.post('http://localhost:3001/upload/comment', { comment, postId, userId }).then(() => {//Post le commentaire avec le nom de l'auteur
            window.location.reload();//Recharge la page au post du commentaire
        });
    };



    return (
        <div className="Home">
            <h1>Home</h1>
            {uploads.map((val, key) => {
                return (
                    <div className="Post" key={key}>
                        <div className="Image">
                            <img src={'http://localhost:3001/images/' + val.image} alt="image de post" />
                        </div>

                        <div className="Content">
                            <div className="title">
                                {''}
                                {val.title} / by @{val.author} </div>
                            <div className="description">{val.description}</div>
                        </div>

                        <div className="Engagement">
                            <FavoriteIcon
                                id="likeButton" onClick={() => {
                                    likePost(val.id);
                                    console.log(likes);
                                    setLikes(likes + 1);//Actualise les likes avec +1
                                    console.log(likes);
                                }} />
                            {val.likes}

                            <ChatBubbleOutlineIcon id="commentIcon" onClick={() => commenter(val.id)} /> {/* bouton commenter */}
                            <label htmlFor="comment" id="comments">Commentaires : </label>
                            <input
                                type="text"
                                placeholder="commenter"
                                id="comment"
                                onChange={(event) => {
                                    setComment(event.target.value); /* Post le commentaire  */
                                }} />
                            {val.comments.map((comment, key) => {
                                return (
                                    <div className="Commentaire" key={key}>
                                        <div>
                                            @ {comment.username} a écrit :  {/* Récupère le commentaire et le nom de l'auteur */}
                                            {comment.commentaire}

                                        </div>
                                    </div>
                                );
                            })
                            }
                            {admin == 'admin' ? <button onClick={() => { /* Si admin alors il peut supprimer les posts */
                                deleteYourUploads(val.id);
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
