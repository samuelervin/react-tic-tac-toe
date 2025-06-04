export default function GameOver({ winner, onRestartGame }) {

    return (
        <div id="game-over">

            <h2>Game Over</h2>      
            {winner && <p>{winner ? `Winner: ${winner}` : 'It\'s a draw!'}</p>}
            {!winner && <p>It's a draw!</p>}

            <button onClick={onRestartGame}>Play Again</button>

            </div>
    )
}