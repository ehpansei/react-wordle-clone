import React from "react";
import {
  INVALID,
  UNCHECKED,
  VALID,
  VALID_WRONG_POSITION,
} from "../constants/LetterStatus";
import { LetterSquare } from "./LetterSquare";

export class Word extends React.Component {
  // saves word attempt
  word = "";
  status = [UNCHECKED, UNCHECKED, UNCHECKED, UNCHECKED, UNCHECKED];

  /**
   * Updates word attempt "state" for when player is on another word line
   */
  componentDidUpdate() {
    if (this.props.data.isActive) {
      this.word = this.props.data.state.currentTry;
      this.status = this.calculateWithArrays();
    }
  }

  /**
   * Calculates if the word contains these letters and if they are on the correct position
   *
   * 0 - unchecked
   * 1 - contains but wrong position
   * 2 - contains and correct position
   * 3 - not existing
   *
   *
   * @returns a 5 length array with the status of the letter on each index
   */
  calculateLetterResults() {
    const realWordArray = this.props.data.state.word.split("");
    const wordAttempt = this.props.data.state.currentTry;

    //
    let status = [UNCHECKED, UNCHECKED, UNCHECKED, UNCHECKED, UNCHECKED];

    wordAttempt.forEach((letter, index) => {
      const realWord = realWordArray.join("");
      if (letter !== "" && realWord.includes(letter.toLowerCase())) {
        // letter is present on the real word
        status[index] = VALID_WRONG_POSITION;
        if (realWordArray[index] === letter.toLowerCase()) {
          // letter is present and in the correct position
          status[index] = VALID;
        }
      } else {
        status[index] = INVALID;
      }
    });

    return status;
  }

  calculateWithArrays() {
    const realWordArray = this.props.data.state.word.split("");
    const wordAttempt = this.props.data.state.currentTry.map((element) =>
      element.toLowerCase()
    );

    const realWordStruct = {};
    // map words with positions
    realWordArray.forEach((element, index) => {
      if (!realWordStruct[element]) {
        realWordStruct[element] = [index];
      } else {
        realWordStruct[element].push(index);
      }
    });

    const wordAttemptStruct = {};
    // map words with positions
    wordAttempt.forEach((letter, index) => {
      if (!wordAttemptStruct[letter]) {
        wordAttemptStruct[letter] = [index];
      } else {
        wordAttemptStruct[letter].push(index);
      }
    });

    // init statusStruct with all UNCHECKED
    const statusStruct = [
      VALID_WRONG_POSITION,
      VALID_WRONG_POSITION,
      VALID_WRONG_POSITION,
      VALID_WRONG_POSITION,
      VALID_WRONG_POSITION,
    ];

    // do the check
    Object.keys(wordAttemptStruct).forEach((attemptLetter) => {
      const realWordPositions = realWordStruct[attemptLetter];
      const attemptPositions = wordAttemptStruct[attemptLetter];
      //if letter exists in word
      if (realWordStruct[attemptLetter]) {
        // check real word positions

        // for each letter attempt position
        attemptPositions.forEach((attemptLetterPosition, index) => {
          // is it in the correct place?
          if (realWordPositions.includes(attemptLetterPosition)) {
            statusStruct[attemptLetterPosition] = VALID;

            // recheck previous attempts that were VALID_WRONG_POSITION
            const previousAttemptLetters = attemptPositions.slice(0, index - 1);
            previousAttemptLetters.forEach((letterPosition) => {
              if (statusStruct[letterPosition] === VALID_WRONG_POSITION) {
                statusStruct[letterPosition] = INVALID;
              }
            });
          }
        });
      } else {
        // all these positions are invalid
        attemptPositions.forEach((attemptLetterPosition) => {
          statusStruct[attemptLetterPosition] = INVALID;
        });
      }
    });

    return statusStruct;
  }

  renderLetter(props) {
    return <LetterSquare data={props}></LetterSquare>;
  }

  getLetterByIndex(index) {
    var props;

    if (this.props.data.isActive) {
      props = {
        currentTry: this.props.data.state.currentTry[index],
        status: UNCHECKED,
        realLetter: this.props.data.state.word.split("")[index],
      };
    } else {
      props = {
        currentTry: this.word[index],
        status: this.status[index],
        realLetter: this.props.data.state.word.split("")[index],
      };
    }
    return props;
  }

  render() {
    return (
      <div className="Word">
        {this.renderLetter(this.getLetterByIndex(0))}
        {this.renderLetter(this.getLetterByIndex(1))}
        {this.renderLetter(this.getLetterByIndex(2))}
        {this.renderLetter(this.getLetterByIndex(3))}
        {this.renderLetter(this.getLetterByIndex(4))}
      </div>
    );
  }
}
