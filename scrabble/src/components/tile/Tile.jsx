import { useState } from 'react';
import './_tile.scss'; 

const Tile = ({letter, number}) => {
    const tiltTile = () => {
        const degrees = Math.random();
        if (degrees < 0.66) {
            return '0deg';
        } else if (degrees >= 0.66 && degrees < 0.83) {
            return '-2deg';
        } else {
            return '1deg';
        }
    }

    return (
        <div className="tile" style={{ transform: `rotate(${tiltTile()})`}}>
            <span className="letter">{letter}</span>
            <span className="value">{number == 0 ? '' : number}</span>
        </div>
    )

}

export default Tile;