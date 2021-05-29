
import emailjs from "emailjs-com";
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
        e.target.reset()
        alert('votre formulaire à bien été soumis'); /* alert au click indiquant que le formulaire à bien été crée */
    }
/* formulaire de contact */
    return (
        <form onSubmit={sendEmail}> {/* onSubmit associé à la fonction sendEmail */}
<div class="background">
  <div class="container">
    <div class="screen">
      <div class="screen-header">
        <div class="screen-header-left">
          <div class="screen-header-button close"></div>
          <div class="screen-header-button maximize"></div>
          <div class="screen-header-button minimize"></div>
        </div>
        <div class="screen-header-right">
          <div class="screen-header-ellipsis"></div>
          <div class="screen-header-ellipsis"></div>
          <div class="screen-header-ellipsis"></div>
        </div>
      </div>
      <div class="screen-body">
        <div class="screen-body-item left">
          <div class="app-title">
            <span>CONTACT</span>
            <span>US</span>
          </div>
          <div class="app-contact">CONTACT  : +33 6 61 24 37 40</div>
        </div>
        <div class="screen-body-item">
          <div class="app-form">
            <div class="app-form-group">
              <label for="name">name</label>
              <input class="app-form-control" placeholder="VOTRE NOM" id="name" name="names" />
            </div>
            <div class="app-form-group">
              <label for="pseudo">Name</label>
              <input class="app-form-control" placeholder="VOTRE PSEUDO" id="pseudo" name="pseudos"/>
            </div>
            <div class="app-form-group">
              <label for="email">email</label>
              <input class="app-form-control" placeholder="EMAIL" id="email" name="mail"/>
            </div>
            <div class="app-form-group">
              <label for="objet">objet</label>
              <input class="app-form-control" placeholder="OBJET" id="objet" name="object"/>
            </div>
            <div class="app-form-group message">
              <label for="message">message</label>
              <input class="app-form-control" placeholder="MESSAGE" id="message" name="messages"/>
            </div>
            <div class="app-form-group buttons">
              <button class="app-form-button">Envoyer</button>  {/* envoie le formulaire */}
            </div>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</div>
</form>
            
    )
}


