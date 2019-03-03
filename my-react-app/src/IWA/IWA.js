import React, { Component } from 'react';
import styled from 'styled-components';
import IWResponses from './IWResponses.js'
import IWQuestion from './IWQuestion.js'
const iconAccurateRetina = process.env.PUBLIC_URL + 'images/icon-accurate-retina.png';
const iconAuditSupportRetina = process.env.PUBLIC_URL + 'images/icon-audit-support-retina.png';
const iconMaxRefundRetina = process.env.PUBLIC_URL + 'images/icon-max-refund-retina.png';
const iconFinal = process.env.PUBLIC_URL + 'images/final-pic.jpg';

const Container = styled.div`
  max-width: 700px;
  height: 100%;
  box-sizing: border-box;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default class IWA extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentQuestion: 0,
      responses: [],
    }
    this.questions = this.props.questions || IWA.defaultQuestions;
    this.finalText = this.props.finalText || IWA.defaultFinalText
    this.finalPic = this.props.finalPic || IWA.defaultFinalPic;
  };
  
  static defaultFinalText = "Thank you, you will receive a response shortly.";
  static defaultFinalPic = iconFinal;
  static defaultQuestions = [
    {
      questionText: "What is your name?",
      img: iconAccurateRetina,
      placeholder: "First Last",
    },
    {
      questionText: "What is the position you are applying for?",
      img: iconAuditSupportRetina,
      placeholder: "Job Title",
    },
    {
      questionText: "What qualifies you for this position?",
      img: iconMaxRefundRetina,
      placeholder: "I am awesome!",
    },
  ];


  setAnswer = (index) => {
    return (answer) => {
      const responses = [...this.state.responses];
      responses[index] = answer;
      this.setState({ responses });
    }
    // instanciating a curried function is the price paid for the ability to render multiple questions
  }

  getSubmission() {
    const submission = this.questions.map((question, index) => {
      return { ...question, response: this.state.responses[index]};
    });
    return submission;
  }
  
  goBack = () => {
    this.setState({
      currentQuestion: this.state.currentQuestion - 1,
    });
  }

  goNext = () => {
    this.setState({
      currentQuestion: this.state.currentQuestion + 1,
    });
  }

  onAnswerFinal = () => {
    if (this.props.finish) {
      this.props.finish(this.getSubmission());
    }
  }

  get done() {
    return this.state.currentQuestion === this.questions.length;
  }

  get isFinalQuestion() {
    return this.state.currentQuestion === this.questions.length - 1;
  }

  renderBody() {
    if (this.done) {
      return (
        <IWResponses
          submission={this.getSubmission()}
          finalText={this.finalText}
          finalPic={this.finalPic}
          editable={!this.props.noEdits}
          goBack={this.goBack}
        />
      );
    } else {
      return (
        <IWQuestion
          question={this.questions[this.state.currentQuestion]}
          savedAnswer={this.state.responses[this.state.currentQuestion]}
          disableBackButton={this.props.noEdits || this.state.currentQuestion === 0}
          setAnswer={this.setAnswer(this.state.currentQuestion)}
          isFinalQuestion={this.isFinalQuestion}
          onAnswerFinal={this.onAnswerFinal}
          goBack={this.goBack}
          goNext={this.goNext}
        />
      );
    }
  }

  render() {
    return (
      <Container>
        {this.renderBody()}
      </Container>
    );
  }
}
