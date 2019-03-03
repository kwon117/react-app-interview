import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
`;

const Image = styled.img`
`;

const FinalText = styled.div``;

const ResponseBlock = styled.div``;

const Question = styled.div``;

const Response = styled.div``;

const Button = styled.button`
  display: ${props => props.hidden ? "disabled" : "inline-block"};
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

  renderQuestions() {
    return this.props.submission.map((question) => {
      return (
        <ResponseBlock>
          <Question>{question.questionText}</Question>
          <Response>{question.response}</Response>
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
        <Button
          type={"back"}
          onClick={this.props.goBack}
          hidden={!this.props.editable}
        >
          Back
        </Button>
      </Container>
    );
  }
}
