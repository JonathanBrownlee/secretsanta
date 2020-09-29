import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import './App.css';

// Taken from stackoverflow
function getShuffledArr(arr) {
  return [...arr].map((_, i, arrCopy) => {
    var rand = i + (Math.floor(Math.random() * (arrCopy.length - i)));
    [arrCopy[rand], arrCopy[i]] = [arrCopy[i], arrCopy[rand]]
    return arrCopy[i]
  })
}

function App() {

  const sendEmail = templateParams => {
    // emailjs.send('default_service', 'template_bt5l82r', templateParams, 'email_S2B6oiUmBtw2Y5iTdBpK7')
    //   .then((result) => {
    //     console.log(result.text);
    //   }, (error) => {
    //     console.log(error.text);
    //   });
  }
  const generateEmail = () => {
    fetch(`https://sv443.net/jokeapi/v2/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist&type=twopart&amount=${emailState.length}`)
      .then(res => res.json())
      .then((data) => {
        let jokes = data.jokes;
        const shuffledEmailState = getShuffledArr(emailState);
        shuffledEmailState.forEach((email, index) => {
          let incrementedIndex = index + 1;
          if (incrementedIndex === shuffledEmailState.length) {
            incrementedIndex = 0;
          }
          const joke = jokes.pop()
          const message = `Dear ${email.name}
          
          Merry Christmas!!!
          
          Your Secret Santa is ${shuffledEmailState[incrementedIndex].name}.
          
          ${joke.setup}
          
          ...

          ${joke.delivery}

          From Santa
          `;
          const templateParams = {
            to: email.email,
            messname: message
          }

          sendEmail(templateParams);
        })
      })
  }

  const blankEmail = { email: '', name: '' };
  const [emailState, setEmailState] = useState([
    { ...blankEmail },
  ]);

  const addEmail = () => {
    setEmailState([...emailState, { ...blankEmail }]);
  };

  const handleEmailChange = (e) => {
    const updatedEmails = [...emailState];
    updatedEmails[e.target.dataset.idx][e.target.className] = e.target.value;
    setEmailState(updatedEmails);
  };

  return (
    <div>
      <h1>Secret Santa Sender</h1>
      <form>
        <input
          type="button"
          value="Add New Email"
          onClick={addEmail}
        />
        {
          emailState.map((val, idx) => {
            const emailId = `email-${idx}`;
            const nameId = `name-${idx}`;
            return (
              <div key={`email-${idx}`}>
                <label htmlFor={emailId}>{`Email #${idx + 1}`}</label>
                <input
                  type="text"
                  name={emailId}
                  data-idx={idx}
                  id={emailId}
                  className="email"
                  value={emailState[idx].email}
                  onChange={handleEmailChange}
                />
                <label htmlFor={nameId}>Name</label>
                <input
                  type="text"
                  name={nameId}
                  data-idx={idx}
                  id={nameId}
                  className="name"
                  value={emailState[idx].name}
                  onChange={handleEmailChange}
                />
              </div>
            );
          })
        }
        <input type="button" value="Submit" onClick={generateEmail} />
      </form>
    </div>
  );
}

export default App;