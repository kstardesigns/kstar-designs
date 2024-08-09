import { useState, useEffect } from 'react';
import useScreenSize from '../../hooks/Resize';
import './_tile.scss'; 

const Tile = ({letter, number, index, onBonusSquareChange, wordLength}) => {
    let [bonusSquare, setBonusSquare] = useState(0);
    const isBelow800 = useScreenSize(800);

    const bonusSquares = [
        { 'type': 'none', 'text': 'no bonus', 'mult': '1', 'wordmult': '1' },
        { 'type': 'dl', 'text': 'double letter', 'mult': '2', 'wordmult': '1' },
        { 'type': 'tl', 'text': 'triple letter', 'mult': '3', 'wordmult': '1' },
        { 'type': 'dw', 'text': 'double word', 'mult': '1', 'wordmult': '2' },
        { 'type': 'tw', 'text': 'triple word', 'mult': '1', 'wordmult': '3' }
    ]

    useEffect(() => {
        // Send initial bonus values to parent
        onBonusSquareChange(index, bonusSquares[bonusSquare].mult, bonusSquares[bonusSquare].wordmult);
    }, []);
    
    const handleBonusSquareChange = () => {
        //change to next bonus square type
        const newBonusSquare = (bonusSquare + 1) % bonusSquares.length;
        setBonusSquare(newBonusSquare);

        //pass the word multipliers
        onBonusSquareChange(index, bonusSquares[newBonusSquare].mult, bonusSquares[newBonusSquare].wordmult);
    }

    const tiltTile = () => {
        const degrees = Math.random();
        if (degrees < 0.60) {
            return '0deg';
        } else if (degrees >= 0.60 && degrees < 0.70) {
            return '-2deg';
        } else if (degrees >= 0.70 && degrees < 0.80) {
            return '-1deg';
        } else {
            return '1deg';
        }
    }

    // set styles based on screen size
    const tileWrapStyle = `word-length-${wordLength}`;

    return (
        <div className={`tile-wrap ${tileWrapStyle}`}>
            <div className="tile" style={{ transform: `rotate(${tiltTile()})`}}>
                <span className="letter">{letter}</span>
                <span className="value">{number == 0 ? '' : number}</span>
            </div>
            <div className="bonus-square">
                <button type="button" 
                        className={`bonus-square-button bonus-square-button--${bonusSquares[bonusSquare].type}`} 
                        onClick={handleBonusSquareChange}>
                            <span className="bonus-square-triangle"></span>
                        {bonusSquares[bonusSquare].text}
                </button>
            </div>
        </div>
    )

}

export default Tile;