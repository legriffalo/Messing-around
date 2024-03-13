import {useState} from 'react';

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];
  
  export default function GameBoard({onSelectSquare, turns }) {
    let gameBoard = [...initialGameBoard].map(array=>[...array]);

    for (const turn of turns){
      const {square,player} = turn;
      const {row,col} = square;

      gameBoard[row][col]=player;
    }
    // const[ gameBoard, setGameBoard] = useState(initialGameBoard);

    // function handleSelectSquare(rowIndex,colIndex){
    //   setGameBoard((prevGameBoard) =>{
    //   const updatedBoard = [...prevGameBoard.map(innerArray =>[...innerArray])];
    //   updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
    //   console.log(updatedBoard)
    //   return updatedBoard;
    //   })

    //   onSelectSquare();
    // }

    // function setGameBoard(){

    // }
    return (
      <ol id="game-board">
        {gameBoard.map((row, rowIndex) => (
          <li key={rowIndex}>
            <ol>
              {row.map((playerSymbol, colIndex) => (
                <li key={colIndex}>
                  <button onClick={()=> onSelectSquare(rowIndex,colIndex)} disabled = {playerSymbol!==null}>{playerSymbol}</button>
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>
    );
  };