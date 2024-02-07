import React from 'react';

function click() {
    alert(`Tombol Ditekan`);
}

function Button() {
  return (
    <button className="button flex" onClick={click}>
        Check Username
    </button>
  );
}

export default Button;
