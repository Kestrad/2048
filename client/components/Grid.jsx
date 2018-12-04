import React from 'react';
import Square from './Square.jsx';

class Grid extends React.Component{
  constructor(props) {
    super(props);
  }

  renderSquare(i) {
    return (
      <Square
      className="square" 
      id={i} 
      handleKeyPress={this.props.handleKeyPress}
      value={this.props.squares[i]}
      />
    )
  }

  render() {
    let grid = [];
    for (let i=0; i<4; i++) {
      for (let j=0; j<4; j++) {
        grid.push(this.renderSquare(j+4*i));
      }
    }

    return (
      <div className="grid">{grid}</div>
    )
  }
}

export default Grid;