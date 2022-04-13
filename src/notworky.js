import './App.css';
import React from 'react';

let numSquares = 25;

class Square extends React.Component {
  render() {
    return (
      <button
        className="square"
        onClick={() => this.props.onClick()}
      >
        {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(numSquares).fill(null),
    };
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  activateSquare() {
    const squares = this.state.squares.slice();
    let selectedSquare = this.getRandomInt(numSquares);
    squares[selectedSquare] = 'active';
    this.setState({squares: squares});
  }

  // handleClick(i) {

  //   const squares = this.state.squares.slice();
  //   squares[i] = '';
  //   this.setState({squares: squares});
  // }

  renderSquare(i) {
    return (
      <Square
        className={this.state.squares[i]}
        // onClick={() => this.handleClick(i)}
      />
    );
  }

  renderRow(i) {
    const rowSquares = [];
    for (let counter = i; counter < (counter + Math.sqrt(numSquares)); counter++) {
      rowSquares.push(this.renderSquare(counter));
    }
    return (
      <div className="board-row">
        {rowSquares}
      </div>
    );
  }

  render() {
    const status = 'Needs work';
    const boardRows = [];

    for (let i = 0; i < numSquares; i++) {
      if(i === 0 || (Number.isInteger(i / Math.sqrt(numSquares)))) {
        boardRows.push(this.renderRow(i));
      }
    }

    return (
      <div>
        <div className="status">{status}</div>
        {boardRows}
        {/* <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
          {this.renderSquare(3)}
          {this.renderSquare(4)}
        </div>
        <div className="board-row">
          {this.renderSquare(5)}
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
          {this.renderSquare(9)}
        </div>
        <div className="board-row">
          {this.renderSquare(10)}
          {this.renderSquare(11)}
          {this.renderSquare(12)}
          {this.renderSquare(13)}
          {this.renderSquare(14)}
        </div>
        <div className="board-row">
          {this.renderSquare(15)}
          {this.renderSquare(16)}
          {this.renderSquare(17)}
          {this.renderSquare(18)}
          {this.renderSquare(19)}
        </div>
        <div className="board-row">
          {this.renderSquare(20)}
          {this.renderSquare(21)}
          {this.renderSquare(22)}
          {this.renderSquare(23)}
          {this.renderSquare(24)}
        </div> */}
      </div>
    );
  }
}

class Controls extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //Needs work
    };
  }

  render(){
    return (
      <button onClick>Start Game</button>
    )
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
          <Controls />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

export default Game;
