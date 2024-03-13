export default function Log({turns}){
    // console.log('yo');
    let log =[]
    for (const turn of turns){
        const {square,player} = turn;
        const {row,col} = square;
        log.push(<li key={turns.indexOf(turn)}>player:{player} moved to square:{row},{col}</li>);
    // console.log(log);
}

    return(
        <ol id = 'log'>
        {log}
        </ol>
    )
};