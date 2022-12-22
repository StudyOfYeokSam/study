import React from "react";

class Board extends React.Component<
  {
    value: any;
  },
  {
    squares: null[] | string[];
    currentTic: "X" | "O";
    XPlayer: string[];
    OPlayer: string[];
  }
> {
  constructor(props: { value: any } | Readonly<{ value: any }>) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      currentTic: "X",
      XPlayer: [],
      OPlayer: [],
    };
  }

  matrix = {
    0: [0, 0],
    1: [0, 1],
    2: [0, 2],
    3: [0, 1],
    4: [1, 1],
    5: [1, 2],
    6: [2, 0],
    7: [2, 1],
    8: [2, 2],
  };

  handleClick(i: number) {
    const squares = this.state.squares.slice();

    let nextTic: "X" | "O" = "X";

    squares[i] = this.state.currentTic;

    if (this.state.currentTic === nextTic) {
      nextTic = "O";
    }

    this.setState({ squares: squares, currentTic: nextTic });
  }

  renderSquare(i: number) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => {
          this.handleClick(i);
        }}
      />
    );
  }

  render() {
    const status = `Next player: ${this.state.currentTic}`;

    return (
      <div>
        <div className="status">{status}</div>

        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>

        <style>{}</style>
      </div>
    );
  }
}

class Square extends React.Component<
  { value: string | null; onClick: () => void },
  {}
> {
  render() {
    return (
      <button
        className="square"
        onClick={this.props.onClick}
        style={{
          border: "1px solid black",
          outline: "none",
          width: 50,
          height: 50,
        }}
      >
        {this.props.value ?? "-"}
      </button>
    );
  }
}

export default Board;
