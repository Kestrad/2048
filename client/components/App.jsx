import React from 'react';
import Grid from './Grid.jsx';
import _ from 'lodash';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.state = {
      squares: Array(16).fill(null),
      squareHasMerged: Array(16).fill(false),
      win: false,
      lose: false,
      addTile: false,
      ended: false
    }
    this.starters = [2, 4];
    console.log(this.state);
  }

  handleKeyPress(e) {
    if (!this.state.ended) {
      if (e.keyCode == 38) {
        this.moveThisWay("up");
      }
      if (e.keyCode == 40) {
        this.moveThisWay("down");
      }
      if (e.keyCode == 37) {
        this.moveThisWay("left");
      }
      if (e.keyCode == 39) {
        this.moveThisWay("right");
      }
    } else {
      console.log("game has ended");
    }
  }

  moveThisWay(dir) {
    console.log(dir);
    let newValArr = [...this.state.squares];
    let newStateArr = [...this.state.squareHasMerged];

    if (dir === "up") {
      let moved = false; 
      let validMove = false;
      for (let col=0; col<4; col++) {
        do {
          moved = false;
          for (let row=0; row<4; row++) {
            let square = col + row*4;
            if (newValArr[square]) {
              let above = square-4;
              if (above >= 0 && !newValArr[above]) {
                newValArr[above] = newValArr[square];
                newStateArr[above] = newStateArr[square];
                newValArr[square] = null;
                newStateArr[square] = false;
                moved = true;
                validMove = true;
              } else if (above >=0 && newValArr[above] === newValArr[square] && !newStateArr[square] && !newStateArr[above]) {
                newValArr[above] = newValArr[above]*2;
                newStateArr[above] = true;
                newValArr[square] = null;
                newStateArr[square] = false;
                moved = true;
                validMove = true;
              }
            }
          }
        } while (moved === true);
      }
      if (validMove) {
        this.setState({
          squares: newValArr,
          addTile: true,
        })
      }
    }
    if (dir === "down") {
      let moved = false; 
      let validMove = false;
      for (let col=0; col<4; col++) {
        do {
          moved = false;
          for (let row=3; row>=0; row--) {
            let square = col + row*4;
            if (newValArr[square]) {
              let below = square+4;
              if (below <= 15 && !newValArr[below]) {
                newValArr[below] = newValArr[square];
                newStateArr[below] = newStateArr[square];
                newValArr[square] = null;
                newStateArr[square] = false;
                moved = true;
                validMove = true;
              } else if (below <= 15 && newValArr[below] === newValArr[square] && !newStateArr[square] && !newStateArr[below]) {
                newValArr[below] = newValArr[below]*2;
                newStateArr[below] = true;
                newValArr[square] = null;
                newStateArr[square] = false;
                moved = true;
                validMove = true;
              }
            }
          }
        } while (moved === true);
      }
      if (validMove) {
        this.setState({
          squares: newValArr,
          addTile: true,
        })
      }
    }
    if (dir === "left") {
      let moved = false; 
      let validMove = false;
      for (let row=0; row<4; row++) {
        do {
          moved = false;
          for (let col=0; col<4; col++) {
            let square = col + row*4;
            if (newValArr[square]) {
              let left = square-1;
              if (left >= row*4 && !newValArr[left]) {
                newValArr[left] = newValArr[square];
                newStateArr[left] = newStateArr[square];
                newValArr[square] = null;
                newStateArr[square] = false;
                moved = true;
                validMove = true;
              } else if (left >= row*4 && newValArr[left] === newValArr[square] && !newStateArr[square] && !newStateArr[left]) {
                newValArr[left] = newValArr[left]*2;
                newStateArr[left] = true;
                newValArr[square] = null;
                newStateArr[square] = false;
                moved = true;
                validMove = true;
              }
            }
          }
        } while (moved === true);
      }
      if (validMove) {
        this.setState({
          squares: newValArr,
          addTile: true,
        })
      }
    }
    if (dir === "right") {
      let moved = false; 
      let validMove = false;
      for (let row=0; row<4; row++) {
        do {
          moved = false;
          for (let col=3; col>=0; col--) {
            let square = col + row*4;
            if (newValArr[square]) {
              let right = square+1;
              if (right <= row*4+3 && !newValArr[right]) {
                newValArr[right] = newValArr[square];
                newStateArr[right] = newStateArr[square];
                newValArr[square] = null;
                newStateArr[square] = false;
                moved = true;
                validMove = true;
              } else if (right <= row*4+3 && newValArr[right] === newValArr[square] && !newStateArr[square] && !newStateArr[right]) {
                newValArr[right] = newValArr[right]*2;
                newStateArr[right] = true;
                newValArr[square] = null;
                newStateArr[square] = false;
                moved = true;
                validMove = true;
              }
            }
          }
        } while (moved === true);
      }
      if (validMove) {
        this.setState({
          squares: newValArr,
          addTile: true,
        })
      }
    }
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress, false);
    let squaresGenerated = 0;
    let newValArr = [...this.state.squares];
    while (squaresGenerated < 2) {
      let square = Math.floor(Math.random() * 16);
      if (!newValArr[square]) {
        newValArr[square] = _.sample(this.starters);
        squaresGenerated++;
      }
    }
    this.setState({
      squares: newValArr,
      addTile: false,
    })
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('previous state', prevState.squares);
    console.log('new state', this.state.squares);
    
    if (this.state.squares.includes(2048) && !this.state.win) {
      alert("you have won");
      this.setState({
        win: true,
      });
      return;
    }

    let newValArr = [...this.state.squares];
    let nullIndices = newValArr.reduce((indices, value, index) => {
      if (value === null) {
        indices.push(index);
      }
      return indices;
    }, [])

    //console.log('null indices', nullIndices);
    
    if (nullIndices.length < 1 && !this.state.lose) {
      this.checkMovesPossible(newValArr);
      return;
    }
    
    if (this.state.addTile && !this.state.lose) {
      let newValArr = [...this.state.squares];
      let addSquare = _.sample(nullIndices);
      let addVal = _.sample(this.starters);
      newValArr[addSquare] = addVal;
      this.setState({
        addTile: false,
        squares: newValArr,
      });
      return;
    }

    if (this.state.lose && !this.state.ended) {
      alert("you have lost");
      this.setState({ended: true});
      return;
    }
  }

  checkMovesPossible(stateArr) {
    for (let row=0; row<4; row++) {
      for (let col=0; col<4; col++) {
        let square = col + row*4;
        let above = square-4;
        let below = square+4;
        let left = square-1;
        let right = square+1;

        if (stateArr[square] === stateArr[above] || stateArr[square] === stateArr[below] || stateArr[square] === stateArr[left] || stateArr[square] === stateArr[right]) {
          return true;
        }
      }
    }
    this.setState({lose: true});
  }

  render() {
    return (
      <Grid handleKeyPress={this.handleKeyPress} squares={this.state.squares} sqStates={this.state.squareState} />
    )
  }
}

export default App;