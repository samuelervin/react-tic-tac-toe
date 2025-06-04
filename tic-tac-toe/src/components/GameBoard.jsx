

export default function GameBoard({onSelectSquare, turns}) {
let gameboard = initalGameboard;

if(turns.length > 0) {
 
    turns.forEach(turn => { 
        const {square, player} = turn;
        const {row, col} = square;
        gameboard[row][col] = player;

    }
    );
}


// const [gameboard, setGameboard] = useState(initalGameboard);

// function handleSelectSquare(rowIndex, colIndex, symbol) {
//     setGameboard((prevBoard) => {
//         const updateBoard = [...prevBoard.map(row => [...row])]; // Create a deep copy of the gameboarrd
//         updateBoard[rowIndex][colIndex] = activePlayerSymbol;
//         return updateBoard;
//     });
//     onSelectSquare();
// }

 return (
    <ol id="game-board">
        {gameboard.map((row, rowIndex) => (
            <li key={rowIndex}>
                <ol>
                    {row.map((playerSymbol, colIndex) => (
                        <li key={colIndex}>
                            <button onClick={()=>{onSelectSquare(rowIndex,colIndex)}} 
                                    disabled={playerSymbol !== '' || playerSymbol === undefined}
                                    >
                                        {playerSymbol}
                            </button>
                        </li>
                    ))}
                </ol>
            </li>
        ))}
    </ol>
 )

}