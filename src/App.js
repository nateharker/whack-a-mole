import './App.css';
import React, {useEffect, useState, useRef} from 'react';

const EASY_DIFFICULTY = 1000;
const  MEDIUM_DIFFICULTY = 750;
const HARD_DIFFICULTY = 500;

function Square(props) {
    return (
      <button
        className = {props.classInfo}
        onClick={() => props.handleClick(props.squareIndex)}
      >
      </button>
    );
}

function Timer(props) {
  const Ref = useRef(null);

  //state for timer
  const [timer, setTimer] = useState('00 sec');

  function getTimeRemaining(e) {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    return {
      total, seconds
    };
  }

  function startTimer(deadlineTime) {
    let {total, seconds} = getTimeRemaining(deadlineTime);
    if (total >= 0) {
      setTimer(
        (seconds > 9 ? seconds + ' sec' : '0' + seconds + ' sec')
      )
    }
    if(total === 0) {
      props.endGame();
    }
  }

  function clearTimer(deadlineTime) {
    setTimer(props.gameLength.toString() + ' sec');
    props.chooseRandSquare();

    if (Ref.current) {
      clearInterval(Ref.current)
    }

    const id = setInterval(() => {
      props.chooseRandSquare();
      startTimer(deadlineTime);
    }, props.difficultyLevel)
    Ref.current = id;
  }

  function getDeadTime() {
    let deadline = new Date();

    deadline.setSeconds(deadline.getSeconds() + props.gameLength);
    return deadline;
  }

  useEffect(() => {
    clearTimer(getDeadTime());
    return () => clearInterval(Ref.current);
  }, []);

  return (
    <>
      <div className='timer-container'>
        <div className='setting-group'>
          <h1 className='timer'>Time Remaining</h1>
          <div className='setting-buttons'>
            <h1 className='timer timer-seconds'>{timer}</h1>
          </div>
        </div>
      </div>
    </>
  );

}

function Board (props) {
  const boardRows = [];

  for (let i = 0; i < props.numSquares; i++) {
    if(i === 0 || (Number.isInteger(i / Math.sqrt(props.numSquares)))) {
      boardRows.push(renderRow(i));
    }
  }

  function handleClick(index) {
    // needs work, how to check which
    if(props.squares[index] === ('square ' + props.moleImage)) {
      props.setCount((props.count + 1));
    }
  }

  function renderSquare(squareIndex) {
    return (
      <Square 
        key={squareIndex}
        squareIndex={squareIndex}
        classInfo={props.squares[squareIndex]}
        handleClick={handleClick}
      />
    );
  }

  function renderRow(i) {
    const rowSquares = [];
    for(let counter = i; counter < (i + Math.sqrt(props.numSquares)); counter++) {
      rowSquares.push(renderSquare(counter))
    }
    return (
      <div className="board-row" key={i}>
        {rowSquares}
      </div>
    );
  }

  return (
    <>
      {boardRows}
    </>
  ); 
}

function Controls(props) {

  function startGame() {
    props.setCurrentGame(true);
    props.setCount(0);
  }

  function endGame() {
    props.setCurrentGame(false);
    props.setTotalPossible((props.gameLength / (props.difficultyLevel / 1000)));
    props.setSquares(Array(props.numSquares).fill('square'));
    if(!props.gamePlayed) {
      props.setGamePlayed(true);
    }
  }

  if(props.currentGame) {
    return (
      <>
        <Timer
          difficultyLevel={props.difficultyLevel}
          chooseRandSquare={props.squarePicker}
          gameLength={props.gameLength}
          endGame={() => endGame()}
        />
      </>
    );
  }
  else {
    return (
      <>
        <div className='setting-group'>
          <h2>Grid Size</h2>
          <div className='setting-buttons'>
            <button 
              onClick={() => props.setNumSquares(16)} 
              className={(props.numSquares === 16 ? 'control-button selected-button' : 'control-button easy-button')}
            >
              4 x 4
            </button>
            <button
              onClick={() => props.setNumSquares(25)} 
              className={(props.numSquares === 25 ? 'control-button selected-button' : 'control-button medium-button')}
            >
              5 x 5
            </button>
            <button
              onClick={() => props.setNumSquares(36)} 
              className={(props.numSquares === 36 ? 'control-button selected-button' : 'control-button hard-button')}
            >
              6 x 6
            </button>
          </div>
        </div>
        <hr></hr>
        <div className='setting-group'>
          <h2>Difficulty Level</h2>
          <div className='setting-buttons'>
            <button 
              onClick={() => props.setDifficultyLevel(EASY_DIFFICULTY)} 
              className={(props.difficultyLevel === EASY_DIFFICULTY ? 'control-button selected-button' : 'control-button easy-button')}
            >
              Easy
            </button>
            <button
              onClick={() => props.setDifficultyLevel(MEDIUM_DIFFICULTY)} 
              className={(props.difficultyLevel === MEDIUM_DIFFICULTY ? 'control-button selected-button' : 'control-button medium-button')}
            >
              Medium
            </button>
            <button
              onClick={() => props.setDifficultyLevel(HARD_DIFFICULTY)} 
              className={(props.difficultyLevel === HARD_DIFFICULTY ? 'control-button selected-button' : 'control-button hard-button')}
            >
              Hard
            </button>
          </div>
        </div>
        <hr></hr>
        <div className='setting-group'>
          <h2>Game Length</h2>
          <div className='setting-buttons'>
            <button 
              onClick={() => props.setGameLength(15)} 
              className={(props.gameLength === 15 ? 'control-button selected-button' : 'control-button easy-button')}
            >
              15 sec
            </button>
            <button
              onClick={() => props.setGameLength(30)} 
              className={(props.gameLength === 30 ? 'control-button selected-button' : 'control-button medium-button')}
            >
              30 sec
            </button>
            <button
              onClick={() => props.setGameLength(60)} 
              className={(props.gameLength === 60 ? 'control-button selected-button' : 'control-button hard-button')}
            >
              60 sec
            </button>
          </div>
        </div>
        <hr></hr>
        <div className='setting-group'>
          <h2>Pick-a-Mole</h2>
          <div className='setting-buttons'>
            <button 
              onClick={() => props.setMoleImage('react-img')} 
              className={(props.moleImage === 'react-img' ? 'image-button react-img-selected' : 'image-button react-img')}
            >
            </button>
            <button
              onClick={() => props.setMoleImage('mole-img')} 
              className={(props.moleImage === 'mole-img' ? 'image-button mole-img-selected' : 'image-button mole-img')}
            >
            </button>
            <button
              onClick={() => props.setMoleImage('utes-img')} 
              className={(props.moleImage === 'utes-img' ? 'image-button utes-img-selected' : 'image-button utes-img')}
            >
            </button>
            <button
              onClick={() => props.setMoleImage('bug-img')} 
              className={(props.moleImage === 'bug-img' ? 'image-button bug-img-selected' : 'image-button bug-img')}
            >
            </button>
          </div>
        </div>
        <hr></hr>
        <button 
          className='start-button'
          onClick={() => startGame()}
        >
        Start
        </button>
      </>
    );
  }
}

function Score(props) {

  if(props.gamePlayed && !props.currentGame) {
    return (
      <>
        <div className='score'>
          <h2>Your Score</h2>
          <h1 className='score'>{props.squaresClicked} / {props.totalPossible}</h1>
        </div>
        <hr></hr>
      </>
    );
  }
}

function Game() {
  const [ numSquares, setNumSquares ] = useState(16);
  const [ squares, setSquares ] = useState(Array(numSquares).fill('square'));
  const [ currentGame, setCurrentGame ] = useState(false);
  const [ squaresClicked, setSquaresClicked ] = useState(0);
  const [ gamePlayed, setGamePlayed ] = useState(false);
  const [ difficultyLevel, setDifficultyLevel] = useState(EASY_DIFFICULTY);
  const [ totalPossible, setTotalPossible ] = useState(30);
  const [ gameLength, setGameLength ] = useState(30);
  const [ moleImage, setMoleImage ] = useState('react-img')

  let previousRandomNumber = null;

  function changeGrid(newSquareNum) {
    setNumSquares(newSquareNum);
    setSquares(Array(newSquareNum).fill('square'));
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  function activateSquare() {
    const squaresCopy = squares.slice();
    let selectedSquare = getRandomInt(numSquares);
    //avoid having same square picked twice in a row
    while(previousRandomNumber === selectedSquare) {
      selectedSquare = getRandomInt(numSquares);
    }
    previousRandomNumber = selectedSquare;
    squaresCopy[selectedSquare] = 'square ' + moleImage;
    setSquares(squaresCopy);
  }

  function getBoardClass() {
    if(numSquares === 16) {
      return 'game-board-16'
    }
    else if(numSquares === 25) {
      return 'game-board-25'
    }
    else {
      return 'game-board-36'
    }
  }

  return (
    <>
      <div id='header'>
        <h1>Whack-a-Mole</h1>
      </div>
      <div id='controls'>
        <Score
          squaresClicked={squaresClicked}
          gamePlayed={gamePlayed}
          currentGame={currentGame}
          difficultyLevel={difficultyLevel}
          totalPossible={totalPossible}
          gameLength={gameLength}
        />
        <Controls
          squarePicker={activateSquare}
          currentGame={currentGame}
          setCurrentGame={setCurrentGame}
          squares={squares}
          setSquares={setSquares}
          gamePlayed={gamePlayed}
          setGamePlayed={setGamePlayed}
          numSquares={numSquares}
          setNumSquares={changeGrid}
          setCount={setSquaresClicked}
          difficultyLevel={difficultyLevel}
          setDifficultyLevel={setDifficultyLevel}
          setTotalPossible={setTotalPossible}
          gameLength={gameLength}
          setGameLength={setGameLength}
          moleImage={moleImage}
          setMoleImage={setMoleImage}
        />
      </div>
      <div id='game'>
        <div className="game-area">
          <div className={getBoardClass()}> 
            <Board 
              squares={squares}
              count={squaresClicked}
              setCount={setSquaresClicked}
              numSquares={numSquares}
              moleImage={moleImage}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Game;