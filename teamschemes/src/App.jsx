import { useState } from 'react';
import './_styles.scss'; 

function App() {

  const activeColors = [
    { hex: '#0c233f', name: 'midnight navy blue' },
    { hex: '#266092', name: 'lake blue' },
    { hex: '#79bc43', name: 'aurora green' },
    { hex: '#a0a2a3', name: 'moonlight grey' }
  ];

  return (
    <>
      <div className={`grid grid--${activeColors.length}`}>
        {
          activeColors.map((color, index) => (
            <div key={ index } style={{ backgroundColor: color.hex }}>
              { color.hex } / { color.name }
            </div>
          ))
        }
      </div>
    </>
  )
}

export default App
