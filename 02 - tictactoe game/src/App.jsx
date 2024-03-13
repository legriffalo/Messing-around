import Player from "./components/Player.jsx";
import GameBoard from './components/GameBoard.jsx';
import Log from './components/Log.jsx';
import GameOver from "./components/gameOver.jsx";
import { useState } from "react";

function winner(turns){

const previousPlayer = [deriveActivePlayer(turns)==='O'? 'X':'O'];
console.log(previousPlayer);
let check = turns.filter(turn => turn.player == previousPlayer );
console.log(check);

for (let i = 0; i<3; i++){
  // console.log(`i is curretly ${i}`)
  //filter to each player and check
  if(check.filter(turn=>turn.square.row == i).length > 2
  || check.filter(turn=>turn.square.col == i).length > 2
  || check.filter(turn=>turn.square.row == turn.square.col).length >2
  || check.filter(turn=>turn.square.row == 2-turn.square.col).length > 2
  )
  {
    console.log('win triggered')
    // console.log(`${previousPlayer} won`)
    return previousPlayer
}
else{
  console.log('no winners yet!')
}}}

function deriveActivePlayer(gameTurns){

  let currentPlayer = 'X';
  if (gameTurns.length > 0 && gameTurns[0].player ==='X'){
    currentPlayer='O';}
    // console.log(currentPlayer);
    return currentPlayer;
}


function App() {
const [gameTurns, setGameTurns] = useState([])
// const [ activePlayer, setActivePlayer ] = useState('X');

const currentPlayer = deriveActivePlayer(gameTurns);
const aWinner = winner(gameTurns)
const hasDraw = gameTurns.length === 9 && !aWinner

function handleSelectSquare(rowIndex,colIndex,){
// setActivePlayer((curActivePlayer)=> curActivePlayer === 'X' ? 'O':'X');
// console.log(activePlayer==='X')


setGameTurns((prevTurns)=>{

  const currentPlayer = deriveActivePlayer(prevTurns);
  // console.log(currentPlayer)
  // if (prevTurns.length > 0 && prevTurns[0].player ==='X'){
  //   currentPlayer='O';
  // }

  
  const updatedTurns = [
    {square: { row: rowIndex, col: colIndex }, player: currentPlayer}, ...prevTurns];
    // console.log(updatedTurns);
    // const checkWinner = winner(updatedTurns)

return updatedTurns;
})
} ;

function handleRestart(){
  setGameTurns([]);
}
console.log(winner(gameTurns))
// const Winner = winner(gameTurns);

  return (
    <div>
     


    <div id ='game-container'>

      {/* Players list */}
      <ol id = 'players' className='highlight-player'>
      <Player initialName='player1' symbol = 'O' isActive = {currentPlayer==='X'}/>
      <Player initialName='player2' symbol = 'X' isActive = {currentPlayer==='O'}/>
      </ol> 
  {(aWinner||hasDraw)&& <GameOver winner ={aWinner} onRestart ={handleRestart} />}
  <GameBoard 
  onSelectSquare={handleSelectSquare} 
  // activePlayerSymbol = {activePlayer}
  turns = {gameTurns}
  /> 
  </div>
  <Log turns = {gameTurns}/>

 </div>   
  )
}

export default App
