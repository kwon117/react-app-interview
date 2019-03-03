import React, { Component } from 'react';
import styled from 'styled-components';
import { buttonStyles } from './IWQuestion.js';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: space-around;
  align-items: center;
`;

const Image = styled.img`
  max-width: 100px;
  max-height: auto;
`;

const FinalText = styled.div``;

const ResponseBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2%;
  background-color: lightgrey;
`;

const Question = styled.div`
  width: 100%;
  padding: 2px;
  box-sizing: border-box;
  font-style: italic;
  text-align: center;
`;

const Response = styled.div`
  display: block;
  width: 100%;
  padding: 2px;
  box-sizing: border-box;
  font-size: inherit;
  font-family: inherit;
  text-align: center;
  background-color: #D5E8D4;
`;

const ButtonContainer = styled.div`
  justify-content: space-between;
  width: 100%;
`;

const Button = styled.button`
  border: none;
  display: ${props => props.hidden ? "disabled" : "inline-block"};
  background-color: ${props => buttonStyles[props.type].bg};
  border-color: ${props => buttonStyles[props.type].border};
  border-width: .33em;
  border-style: solid;
  padding: .33em 1em;
`;

export default class IWResponses extends Component {
  renderFinalText() {
    if (this.props.finalText) {
      return (
        <FinalText>
          {this.props.finalText}
        </FinalText>
      );
    }
    return null;
  }

  static blankAnswer = "You have left this question blank";

  renderQuestions() {
    return this.props.submission.map((question) => {
      return (
        <ResponseBlock key={question.questionText + question.response}>
          <Question>{question.questionText}</Question>
          <Response>{question.response || IWResponses.blankAnswer}</Response>
        </ResponseBlock>
      );
    })
  }

  render() {
    return (
      <Container>
        <Image src={this.props.finalPic} />
        {this.renderFinalText()}
        {this.renderQuestions()}
        <ButtonContainer>
          <Button
            type={"back"}
            onClick={this.props.goBack}
            hidden={!this.props.editable}
          >
            Back
          </Button>
        </ButtonContainer>
      </Container>
    );
  }
}
