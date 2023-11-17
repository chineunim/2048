import React from "react";
import Tile from "../Tile";

const GameOverlay = ({ onRestart, board}) => {
  if (board.hasWon()) {
    return <div className="hasWon">
			<span className="tile2048">2048
				<p>YOU WIN</p>
				</span>
			</div>;
  } else if (board.hasLost()) {
    return (
      <div className="gameOver" onClick={onRestart}>
        <span>GAME OVER</span>
      </div>
    );
  }

  return null;
};

export default GameOverlay;