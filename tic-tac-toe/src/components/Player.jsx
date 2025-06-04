import { useState } from 'react';


export default function Player({ name, symbol, isActive, onNameChange }) {
    const [playerName, setPlayerName] = useState(name);
    const [playerSymbol, setPlayerSymbol] = useState(symbol);
    const [isEditing, setIsEditing] = useState(false);

    let buttonText = isEditing ? 'Save' : 'Edit';

    const handleEdit = () => {
        setIsEditing((editing) => !editing);
        onNameChange(playerSymbol, playerName);
    }

    function handleNameChange(event) {
        setPlayerName(event.target.value.toUpperCase());
    }

    let editablePlayerName  = <span className="player-name">{playerName}</span>;
    let editablePlayerSymbol = <span className="player-symbol">{playerSymbol}</span>;

    if (isEditing) {
        editablePlayerName = <input type="text" defaultValue={playerName} required onChange={handleNameChange}/>;
        editablePlayerSymbol = <input type="text" defaultValue={playerSymbol} className="player-symbol-input" />;
        buttonText = 'Save';
    }else {
        editablePlayerName = <span className="player-name">{playerName}</span>;
        editablePlayerSymbol = <span className="player-symbol">{playerSymbol}</span>;
        buttonText = 'Edit';
    }

    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
                {editablePlayerName}
                {editablePlayerSymbol}
                <button onClick={handleEdit}>{buttonText}</button>
            </span>
        </li>
    );
}
