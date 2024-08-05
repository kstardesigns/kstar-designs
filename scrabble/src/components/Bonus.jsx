import { useState } from 'react';
import './../styles.scss'; 

const BonusCheckbox = ({bonus, onStateChange}) => {

    const handleBonusChange = (event) => {
        onStateChange(event.target.checked ? true : false);
    }

    return (
        <div className="bonus">
            <input type="checkbox" id="bonus50" checked={bonus} onChange={handleBonusChange} />
            <label htmlFor="bonus50">50 point bonus?</label> 
        </div>
    )

}

export default BonusCheckbox;