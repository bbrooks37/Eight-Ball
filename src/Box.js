import React from "react";
import "./Box.css";

/** Individual colored box.
 *
 * Props:
 * - color: color of box
 * - isChanged: boolean indicating if the box has been changed
 */
function Box({ color, isChanged }) {
  return (
    <div
      className="Box"
      style={{ backgroundColor: color }}
    >
      {isChanged && <span>Changed!</span>} 
    </div>
  );
}

export default Box;