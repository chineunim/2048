import React, {useState} from "react";
import { Board } from "../../Helpers";
import useEvent from "../../Hooks";
import Cell from "../Cell";
import Tile from "../Tile";
import GameOverlay from "../GameOverlay";
import "./style.scss"

const GameBoard = () => {
	const [board, setBoard] = useState(new Board());

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

	useEvent("keydown", handleKeyDown);

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