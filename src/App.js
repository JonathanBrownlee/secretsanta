import React from 'react';
import emailjs from 'emailjs-com';
import './App.css';

function App() {

  function sendEmail() {
    let templateParams = {
      to: "santaclausnoreply1@gmail.com",
      message: 'Welcome to The Universe'
    }
    emailjs.send('default_service', 'template_bt5l82r', templateParams, 'user_S2B6oiUmBtw2Y5iTdBpK7')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  }

  return (
    <div>
        <button onClick={sendEmail}>Primary</button>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
    </div>
  );
}

export default App;