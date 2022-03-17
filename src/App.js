import "./App.css";
import React from "react";
import { Word } from "./components/Word";
import { wordDictionary } from "./assets/WordsDictionary";

class App extends React.Component {
  constructor(props) {
    super(props);
    // 5757 is how many words we have in the dictionary file
    const randomIndex = Math.floor(Math.random() * 5757);
    const targetWord = wordDictionary[randomIndex];
    this.state = {
      word: targetWord,
      currentTry: ["", "", "", "", ""],
      turn: 0,
    };
  }

  delete() {
    for (let index = 4; index >= 0; index--) {
      const element = this.state.currentTry[index];
      if (element !== "") {
        const newCurrentTry = this.state.currentTry;
        newCurrentTry[index] = "";
        this.setState({ currentTry: newCurrentTry });
        break;
      }
    }
  }

  setCurrentTry(letter) {
    for (let index = 0; index < this.state.currentTry.length; index++) {
      const element = this.state.currentTry[index];
      if (element === "") {
        const newCurrentTry = this.state.currentTry;
        newCurrentTry[index] = letter;
        this.setState({ currentTry: newCurrentTry });
        break;
      }
    }
  }

  /**
   * Validates if it is a word
   */
  canTry() {
    var canTry = true;
    this.state.currentTry.forEach((element) => {
      if (element === "") {
        canTry = false;
      }
    });
    return canTry;
  }

  onKeyDown(keyboardEvent) {
    // backspace
    if (keyboardEvent.keyCode === 8) {
      this.delete();
    }

    var inp = String.fromCharCode(keyboardEvent.keyCode);
    if (/[a-zA-Z]/.test(inp)) {
      this.setCurrentTry(inp);
      return;
    }
  }

  nextTurn() {
    // resets state
    this.setState({
      currentTry: ["", "", "", "", ""],
      turn: this.state.turn + 1,
    });
  }

  renderWord(isActive) {
    const state = this.state;
    const props = {
      state,
      isActive,
    };
    return <Word data={props}></Word>;
  }

  /**
   * Tests if the word has 5 letters and if it is a real word so that it can be submitted
   *
   * @param {*} e
   */
  testWord(e) {
    e.preventDefault();
    e.stopPropagation();
    const currentTry = this.state.currentTry.join("").toLowerCase();
    // can the word be tested
    if (this.canTry()) {
      // word is valid but incorrect, go to next turn
      if (currentTry !== this.state.word) {
        this.nextTurn();
      } else {
        // word if valid and correct, success
        alert("success");
      }
    }
  }

  render() {
    return (
      <div className="App" tabIndex="0" onKeyDown={(e) => this.onKeyDown(e)}>
        {this.renderWord(this.state.turn === 0)}
        {this.renderWord(this.state.turn === 1)}
        {this.renderWord(this.state.turn === 2)}
        {this.renderWord(this.state.turn === 3)}
        {this.renderWord(this.state.turn === 4)}
        {this.renderWord(this.state.turn === 5)}
        <button onClick={(e) => this.testWord(e)}>Try</button>
      </div>
    );
  }
}

export default App;
