import classNames from "classnames";
import React from "react";
import { UNCHECKED, VALID_WRONG_POSITION } from "../constants/LetterStatus";

export class LetterSquare extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      letter: "",
      isValid: "",
    };
  }

  isValid() {
    if (this.props.data.currentTry) {
      return (
        this.props.data.status !== UNCHECKED &&
        this.props.data.currentTry.toLowerCase() === this.props.data.realLetter
      );
    }
  }

  render() {
    return (
      <div
        className={classNames("Letter", {
          Valid: this.isValid(),
          Invalid: !this.isValid() && this.props.data.status !== UNCHECKED,
          ValidButWrongPosition:
            this.props.data.status === VALID_WRONG_POSITION,
        })}
      >
        {this.props.data.currentTry}
      </div>
    );
  }
}
