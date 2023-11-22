import React, {useState} from "react";
import { Board } from "../../Helpers";
import useEvent from "../../Hooks";
import Cell from "../Cell";
import Tile from "../Tile";
import GameOverlay from "../GameOverlay";
import "./style.scss"

const GameBoard = () => {
	const [board, setBoard] = useState(new Board());
	const [touchStartX, setTouchStartX] = useState(null);
	const [touchStartY, setTouchStartY] = useState(null);

	const handleKeyDown = (e) => {
		if(board.hasWon()){
			return;
		}

		if(e.keyCode >= 37 && e.keyCode <= 40) {
			let direction = e.keyCode - 37;
			let boardClone = Object.assign(
				Object.create(Object.getPrototypeOf(board)),
				board
			);
			let newBoard = boardClone.move(direction);
			setBoard(newBoard);
		}
	};

	const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e) => {
    if (touchStartX === null || touchStartY === null) {
      return;
    }

    const touchEndX = e.touches[0].clientX;
    const touchEndY = e.touches[0].clientY;

    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;

    const minSwipeDistance = 50;

    if (Math.abs(deltaX) > minSwipeDistance || Math.abs(deltaY) > minSwipeDistance) {
      // define direction
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // horizontal
        if (deltaX > 0) {
          handleMove(2); // right
        } else {
          handleMove(0); // left
        }
      } else {
        // vertical move
        if (deltaY > 0) {
          handleMove(3); // down
        } else {
          handleMove(1); // up
        }
      }
      setTouchStartX(null);
      setTouchStartY(null);
    }
  };

  const handleMove = (direction) => {
    if (board.hasWon()) {
      return;
    }

    let boardClone = Object.assign(
      Object.create(Object.getPrototypeOf(board)),
      board
    );
    let newBoard = boardClone.move(direction);
    setBoard(newBoard);
  };

	useEvent("keydown", handleKeyDown);
	useEvent("touchstart", handleTouchStart);
  useEvent("touchmove", handleTouchMove);

	const cells = board.cells.map((row, rowIndex) => {
		return(
			<div key={rowIndex}>
				{row.map((col, colIndex) => {
					return <Cell key={rowIndex * board.size + colIndex} />;
				})}
			</div>
		);
	});

	const tiles = board.tiles
		.filter((tile) => tile.value !== 0)
		.map((tile, index) => {
			return <Tile tile={tile} key={index} />
		});

		const resetGame = () => {
			setBoard(new Board());
		}
		return (
			<div>
				<div className="details-box">
					<div className="resetButton" onClick={resetGame}>
						New Game
					</div>
					<div className="score-box">
						<div className="score-header">Score</div>
						<div>{board.score}</div>
					</div>
				</div>
				<div className="board">
					{cells}
					{tiles}
					<GameOverlay onRestart={resetGame} board={board} />
				</div>
			</div>
		);
}

export default GameBoard;