import React, { Component } from 'react';
import IWA from './IWA/IWA.js';

class App extends Component {

  static questions = [
    {
      question: "What is your name?",
      picture: "",
    },
    {
      question: "What is the position you are applying for?",
      picture: "",
    },
    {
      question: "What qualifies you for this position?",
      picture: "",
    },
  ];

  render() {
    return (
      <div className="App">
        <IWA 
          questions={App.questions}
          finalText={null}
          finalPic={null}
        />
      </div>
    );
  }
}

export default App;
