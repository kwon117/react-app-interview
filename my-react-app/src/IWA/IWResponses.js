import React, { Component } from 'react';
import styled from 'styled-components';
import {
  Button,
  Container,
  Spacer,
} from './IWQuestion.js';

const FinalText = styled.div`
  width: 100%;
  text-align: center;
`;

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
  text-align: center;
  background-color: #D5E8D4;
`;

const ButtonContainer = styled.div`
  width: 100%;
`;

export default class IWResponses extends Component {
  static blankAnswer = "You have left this question blank";

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
      <Container img={this.props.finalPic}>
        <Spacer />
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
