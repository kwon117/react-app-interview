import React, { Component } from 'react';
import styled from 'styled-components';

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

const Question = styled.div`
  width: 100%;
  border-color: #cecece;
  border-style: solid;
  border-width: .33em;
  padding: 15px;
  box-sizing: border-box;
`;

const AnswerField = styled.textarea`
  display: block;
  width: 100%;
  height: 58px;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  border-style: solid;
  border-color: #7EA6E0;
  border-width: .33em;
  padding: 2px;
  font-size: inherit;
  font-family: inherit;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: ${props => props.backButton ? "space-between" : "flex-end"};
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

export const buttonStyles = {
  back: {
    bg: "#F8CECC",
    border: "#B95551",
  },
  next: {
    bg: "#D5E8D4",
    border: "#82B366",
  },
};

export default class IWQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: this.props.savedAnswer || "",
      placeholder: this.props.question.placeholder || IWQuestion.defaultPlaceholder,
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      answer: props.savedAnswer || "",
      placeholder: props.question.placeholder || IWQuestion.defaultPlaceholder,
    });
  }

  static defaultPlaceholder = "Your answer";

  onAnswerChange = (e) => {
    this.setState({
      answer: e.target.value,
    });
  }

  onNext = () => {
    this.props.setAnswer(this.state.answer);
    this.props.goNext();
  }

  onKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      this.onNext();
    }
  }

  render() {
    return (
      <Container>
        <Image src={this.props.question.img} />
        <Question>
          {this.props.question.questionText}
        </Question>
        <AnswerField
          value={this.state.answer}
          placeholder={this.state.placeholder}
          onChange={this.onAnswerChange}
          onKeyPress={this.onKeyPress}
        />
        <ButtonsContainer backButton={!this.props.disableBackButton}>
          <Button
            type={"back"}
            onClick={this.props.goBack}
            hidden={this.props.disableBackButton}
          >
            Back
          </Button>
          <Button
            type={"next"}
            onClick={this.onNext}
          >
            Next
          </Button>
        </ButtonsContainer>
      </Container>
    );
  }
}
