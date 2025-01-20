// colors.js
export const colors = [
    'red',
    'blue',
    'green',
    'yellow',
    'orange',
    'purple',
    'pink',
    'brown',
    'gray',
    'black',
  ];
  
  // Box.js
  import React, { useState } from 'react';
  import PropTypes from 'prop-types';
  
  function Box({ color, onColorChange, isChanged }) {
    const [localIsChanged, setLocalIsChanged] = useState(isChanged);
  
    return (
      <div
        style={{
          backgroundColor: color,
          width: '50px',
          height: '50px',
          display: 'inline-block',
          margin: '5px',
        }}
      >
        {localIsChanged && <span>Changed!</span>}
      </div>
    );
  }
  
  Box.propTypes = {
    color: PropTypes.string.isRequired,
    onColorChange: PropTypes.func.isRequired,
    isChanged: PropTypes.bool,
  };
  
  Box.defaultProps = {
    isChanged: false,
  };
  
  export { Box };
  
  // BoxContainer.js
  import React, { useState, useEffect } from 'react';
  import Box from './Box';
  import { colors } from './colors';
  
  function BoxContainer({ numBoxes = 16 }) {
    const [boxes, setBoxes] = useState(() => {
      return Array.from({ length: numBoxes }).map(() =>
        getRandomColor()
      );
    });
  
    const [changedIndex, setChangedIndex] = useState(null);
  
    useEffect(() => {
      const timeoutId = setTimeout(() => {
        setChangedIndex(null);
      }, 500); // Hide "Changed!" after 0.5 seconds
  
      return () => clearTimeout(timeoutId);
    }, [changedIndex]);
  
    const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];
  
    const handleColorChange = () => {
      const randomIndex = Math.floor(Math.random() * numBoxes);
      const newColor = getRandomColor();
      const updatedBoxes = [...boxes];
      updatedBoxes[randomIndex] = newColor;
      setBoxes(updatedBoxes);
      setChangedIndex(randomIndex);
    };
  
    return (
      <>
        <div>
          {boxes.map((color, index) => (
            <Box
              key={index}
              color={color}
              onColorChange={handleColorChange}
              isChanged={index === changedIndex}
            />
          ))}
        </div>
        <button onClick={handleColorChange}>Change</button>
      </>
    );
  }
  
  BoxContainer.propTypes = {
    numBoxes: PropTypes.number,
  };
  
  export { BoxContainer };
  
  // App.js
  import React from 'react';
  import BoxContainer from './BoxContainer';
  
  function App() {
    return (
      <div>
        <h1>Color Boxes</h1>
        <BoxContainer />
      </div>
    );
  }
  
  export default App;