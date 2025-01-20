import React from 'react';

function ShakeButton({ onClick }) {
  return (
    <button className="shake-button" onClick={onClick}>
      Shake
    </button>
  );
}

export default ShakeButton;