import GameBoard from "./components/GameBoard"
import GameOver from "./components/GameOver"
import Player from "./components/Player"
import Log from "./components/Log"
import { useState } from "react"
import { WINNING_COMBINATIONS } from "./winning-combinations"

const initialGameboard = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];

const PLAYERS = {
    'X': 'Player 1',
    'O':'Player 2'};

function deriveActivePlayer(gameTurns) {
      let currentPlayer = "X";
      if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
                    currentPlayer = 'O';
                  }
      return currentPlayer;
  }

   function deriveWinner(gameboard, players){
      let winner = null;
      //check for winning combinations
      for (const combination of WINNING_COMBINATIONS) {
      
        const firstSquareSymbol = gameboard[combination[0].row][combination[0].column];
        const secondSquareSymbol = gameboard[combination[1].row][combination[1].column];
        const thirdSquareSymbol = gameboard[combination[2].row][combination[2].column];
      
        if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
          winner = players[firstSquareSymbol];
        } 
      }
      return winner;
  }

export default function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState(PLAYERS);

 // Derive the active player based on the game turns
 let activePlayer = deriveActivePlayer(gameTurns);
//setup initial gameboard
 let gameboard = initialGameboard.map(row => [...row]);

//compute the turns
if(gameTurns.length > 0) {
    gameTurns.forEach(turn => { 
        const {square, player} = turn;
        const {row, col} = square;
        gameboard[row][col] = player;
    });
}

function handleSelectSquare(rowIndex, colIndex) {
 // setActivePlayer((prevPlayer) => prevPlayer === 'X' ? 'O' : 'X');
  setGameTurns((prevTurns) => { 
                  let currentPlayer = deriveActivePlayer(prevTurns);
                 const updatedTurns = [{ square:{ row: rowIndex, col: colIndex }, player: currentPlayer}, ...prevTurns];
                 return updatedTurns;
                });
  } // end handleSelectSquare

  function resetGame() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => ({
      ...prevPlayers,
      [symbol]: newName
    }));
  }

   const winner = deriveWinner(gameboard, players);
   const hasDraw = gameTurns.length === 9 && !winner;

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
         <Player name='player1' symbol='X' isActive={activePlayer === 'X'} onNameChange={handlePlayerNameChange}/>
         <Player name='player2' symbol='O' isActive={activePlayer === 'O'} onNameChange={handlePlayerNameChange}/>
        </ol>
    
        {(winner || hasDraw) && <GameOver winner={winner} onRestartGame={resetGame} />}
     
        <GameBoard 
          board={gameboard}
          onSelectSquare={handleSelectSquare} 
          activePlayerSymbol={activePlayer} 
          
          />
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}
