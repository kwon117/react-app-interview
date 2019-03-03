import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 700px;
`;

export default class IWA extends Component {
  propTypes = {
    questions: [],
    finalText: "",
    finalPic: "",
    finish: () => {},
    noEdits: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      currentQuestion: 0,
      responses: [],
    }
  };

  setAnswer = (index) => {
    return (answer) => {
      const repsonses = [...this.state.responses];
      responses[index] = answer;
      this.setState({ responses });
    }
    // instanciating a curried function is the price paid for the ability to render multiple questions
  }

  getSubmission() {
    if (this.props.finish) {
      this.props.finish();
    }
  }
  
  goBack = () => {
    this.setState({
      currentQuestion: this.state.currentQuestion--,
    });
  }

  goNext = () => {
    this.setState({
      currentQuestion: this.state.currentQuestion++,
    });
  }

  get final() {
    return this.state.currentQuestion === this.props.questions.length;
  }

  renderBody() {
    if (this.final) {
      return (
        <IWAResponses
          submission={this.getSubmission()}
          finalText={this.props.finalText}
          finalPic={this.props.finalPic}
          editable={!this.props.noEdits}
        />
      );
    } else {
      return (
        <IWAQuestion
          question={this.props.questions[this.state.currentQuestion]}
          disableBackButton={this.props.noEdits || this.state.currentQuestion === 0}
          setAnswer={this.setAnswer(this.state.currentIndex)}
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