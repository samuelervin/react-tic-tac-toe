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

 let activePlayer = deriveActivePlayer(gameTurns);
 let gameboard = initalGameboard;

function handleSelectSquare(rowIndex, colIndex) {
 // setActivePlayer((prevPlayer) => prevPlayer === 'X' ? 'O' : 'X');
  setGameTurns((prevTurns) => { 
                  let currentPlayer = deriveActivePlayer(prevTurns);
                 const updatedTurns = [{ square:{ row: rowIndex, col: colIndex }, player: currentPlayer}, ...prevTurns];
                 return updatedTurns;
                });
  } // end handleSelectSquare



  for (const combination of WINNING_COMBINATIONS) {
    
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
         <Player name='player1' symbol='X' isActive={activePlayer === 'X'}/>
         <Player name='player2' symbol='O' isActive={activePlayer === 'O'}/>
        </ol>

        <GameBoard 
          turns={gameTurns}
          onSelectSquare={handleSelectSquare} activePlayerSymbol={activePlayer} />
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}
