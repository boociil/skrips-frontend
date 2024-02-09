import React, { useState } from 'react';

function App() {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    // Toggle state isClicked
    setIsClicked(!isClicked);
  };

  return (
    <div>
      <button onClick={handleClick}>Klik Saya</button>
      <div 
        onClick={handleClick} 
        style={{ backgroundColor: isClicked ? 'red' : 'blue', width: '100px', height: '100px' }}
      >
        {isClicked ? 'Clicked!' : 'Not Clicked'}
      </div>
    </div>
  );
}

export default App;
