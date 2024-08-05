import { useState } from 'react';
import './_tile.scss'; 

const Tile = ({letter, number}) => {

    return (
        <div className="tile">
            <span className="letter">{letter}</span>
            <span className="value">{number == 0 ? '' : number}</span>
        </div>
    )

}

export default Tile;