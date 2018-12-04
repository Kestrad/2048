import React from 'react';
const Square = (props) => (
  <div className="square" id={props.id} onKeyPress={props.handleKeyPress} style={{'color': '#' + `${(Math.log2(props.value)*5957).toString(16)}`.padStart(6, '0')}}>
    {props.value}
  </div>
);

export default Square;