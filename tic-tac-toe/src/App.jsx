import GameBoard from "./components/GameBoard"
import Player from "./components/Player"
import Log from "./components/Log"
import { useState } from "react"
import { WINNING_COMBINATIONS } from "./winning-combinations"


const initalGameboard = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];

function deriveActivePlayer(gameTurns) {
      let currentPlayer = "X";
      if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
                    currentPlayer = 'O';
                  }
      return currentPlayer;
  }

export default function App() {
  const [gameTurns, setGameTurns] = useState([]);
 // const [activePlayer, setActivePlayer] = useState('X');

 // Derive the active player based on the game turns
 let activePlayer = deriveActivePlayer(gameTurns);
 let winner;

 //setup iniital gameboard
 let gameboard = initalGameboard;
//computer the turns
if(gameTurns.length > 0) {
    gameTurns.forEach(turn => { 
        const {square, player} = turn;
        const {row, col} = square;
        gameboard[row][col] = player;

    }
    );
}


function handleSelectSquare(rowIndex, colIndex) {
 // setActivePlayer((prevPlayer) => prevPlayer === 'X' ? 'O' : 'X');
  setGameTurns((prevTurns) => { 
                  let currentPlayer = deriveActivePlayer(prevTurns);
                 const updatedTurns = [{ square:{ row: rowIndex, col: colIndex }, player: currentPlayer}, ...prevTurns];
                 return updatedTurns;
                });
  } // end handleSelectSquare


//check for winning combinations
  for (const combination of WINNING_COMBINATIONS) {
    console.log('gameboard', gameboard);
    const firstSquareSymbol = gameboard[combination[0].row][combination[0].column];
    console.log('firstSquareSymbol', firstSquareSymbol);
    const secondSquareSymbol = gameboard[combination[1].row][combination[1].column];
    console.log('secondSquareSymbol', secondSquareSymbol);
    const thirdSquareSymbol = gameboard[combination[2].row][combination[2].column];
    console.log('thirdSquareSymbol', thirdSquareSymbol);

    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = firstSquareSymbol;
    } 
    console.log('winner', winner);
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
         <Player name='player1' symbol='X' isActive={activePlayer === 'X'}/>
         <Player name='player2' symbol='O' isActive={activePlayer === 'O'}/>
        </ol>
    
        {winner && `You won ${winner}!`}
     
        <GameBoard 
          board={gameboard}
          onSelectSquare={handleSelectSquare} activePlayerSymbol={activePlayer} />
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}
