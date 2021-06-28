
import emailjs from 'emailjs-com';
import React from 'react';
import './contact.css';

export default function ContactUs() {

    function sendEmail(e) {
        e.preventDefault();

/* fonction emailjs qui envoie un mail sur la boite gmail */
        
    emailjs.sendForm('gmail', 'template_3v1iljf', e.target, 'user_faJQ6Qwwsr2sSXmqeMWwI')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
        e.target.reset();
        alert('votre formulaire à bien été soumis'); /* alert au click indiquant que le formulaire à bien été crée */
    }
/* formulaire de contact */
    return (
        <form onSubmit={sendEmail}> {/* onSubmit associé à la fonction sendEmail */}
<div className="background"> {/*Formulaire HTML pour l'envoie du mail*/}
  <div className="container">
    <div className="screen">
      <div className="screen-header">
        <div className="screen-header-left">
          <div className="screen-header-button close"></div>
          <div className="screen-header-button maximize"></div>
          <div className="screen-header-button minimize"></div>
        </div>
        <div className="screen-header-right">
          <div className="screen-header-ellipsis"></div>
          <div className="screen-header-ellipsis"></div>
          <div className="screen-header-ellipsis"></div>
        </div>
      </div>
      <div className="screen-body">
        <div className="screen-body-item left">
          <div className="app-title">
            <span>CONTACT</span>
            <span>US</span>
          </div>
          <div className="app-contact">CONTACT  : +33 6 61 24 37 40</div>
        </div>
        <div className="screen-body-item">
          <div className="app-form">
            <div className="app-form-group">
              <label htmlFor="name">name</label>
              <input className="app-form-control" placeholder="VOTRE NOM" id="name" name="names" />
            </div>
            <div className="app-form-group">
              <label htmlFor="pseudo">Name</label>
              <input className="app-form-control" placeholder="VOTRE PSEUDO" id="pseudo" name="pseudos"/>
            </div>
            <div className="app-form-group">
              <label htmlFor="email">email</label>
              <input className="app-form-control" placeholder="EMAIL" id="email" name="mail"/>
            </div>
            <div className="app-form-group">
              <label htmlFor="objet">objet</label>
              <input className="app-form-control" placeholder="OBJET" id="objet" name="object"/>
            </div>
            <div className="app-form-group message">
              <label htmlFor="message">message</label>
              <input className="app-form-control" placeholder="MESSAGE" id="message" name="messages"/>
            </div>
            <div className="app-form-group buttons">
              <button className="app-form-button">Envoyer</button>  {/* envoie le formulaire */}
            </div>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</div>
</form>
            
    );
}


