//cookies for high score
//score judgement
//unlockables???
//pass it mode
//encouragement


//3 states playing on and off
var score = 0;
var gamestate = "off";
// variables to deal with gametype
var gametype =["solo","passit2"];
var g=0;
var chosengametype="solo";
//variables to manage difficulty options
var difficulty =["hard","normal","easy"];
var d = 0;
var chosendifficulty = "normal";
var gamedifficulty = 2500;

//variables managing volume options
var volume = ["low","medium","high"];
var v = 0;
var chosenvolume = "medium";


//variables to deal with instructions
var instructionsets = ["instructionset1","instructionset2","instructionset3","instructionset4"];
var i=0;
var choseninstructionset = "instructionset1";


// variable to store command from game
var commands = ["twist","pull","bop","spin","flick"];


//variables to deal with timed gameover and other timed events
var timeout;
var time
var c = "";


//voice sets
var instructionset = ["bopit1","twistit1","pullit1","flickit1","spinit1","passit","high","medium","low","hard","normal","easy","solo","passit2","aaaw","gameover","yousuck","notbad","bopitbigtime","beastmodeMF","highscore","score"]








//as soon as page is interacted with start audio
document.getElementById('container').addEventListener('click', function() {
  document.getElementById("starttune").play();
 
});
//set game to on
function startreset(){
    if(gamestate =="gameover"){
    //reload page
    location.reload();
    }
    else{
    gamestate = "on";
    testaudio(choseninstructionset);
    //kill game open audio
    document.getElementById("starttune").src="";
    //start ready screen audio
    document.getElementById("ready").play();
    
    
}}

// send user input to the appropriate function
function userinput(x){
     player(x);   
    if(gamestate == "playing"){
        check(x);}
    else if(gamestate =="on"){
        control(x);
    }
    else{window.alert("press start to play bop-it!");}
}

function scoreappraise(){
    var x = score;
     switch(true){
            case (x<15): player("yousuck");
                break;
            case (x<30):player("notbad");
                break;
            case (x<50): player("bopitbigtime");
                break;
            case (50<x): player("beastmodeMF");
                break;
            default: ;
        }
}

function playscore(x){
    var hundreds = Math.floor(x/100)&10;
    var tens = Math.floor(x/10)%10;
    var units = x%10;
    
    player("score");
    
    var bops = setInterval(function(){
    
        if(hundreds>0){
        hundreds--;
     player("bop");
        }
        
    else if(tens>0){
        tens--;
    player("twist");
    }
        else if(units>0){
        units--;
    player("flick");}},800);
}
    

//create audio elements from audio folder chosen
function initialiseinstructions(x){
    var i;
for(i = 0; i < instructionset.length ; i++){ 
    var newhtml= "<audio id='" + instructionset[i] + "'><source src='" + x + "/" + instructionset[i] + ".mp3'></audio>";

document.getElementById("audiofiles").innerHTML += newhtml;}}
//create audio for testing during ready screen
function testaudio(x){
//clear out test audio when new set selected 
document.getElementById("testaudio").innerHTML = "";
//get portrait of voice over
    var currentportrait = "<img id='portrait' src='" + x + "/portrait.png'>";
document.getElementById("portraits").innerHTML = currentportrait;
    
    //populate with audio from potential voice folder
    var i;
for(i = 0; i < instructionset.length ; i++){ 
    var newhtml= "<audio id='" + instructionset[i] + "'><source src='" + x + "/" + instructionset[i] + ".mp3'></audio>";

document.getElementById("testaudio").innerHTML += newhtml;}}

function setdifficulty(x){
    if(x=="hard"){
        gamedifficulty =1800;
    }
    else if(x=="medium"){
        gamedifficulty =2500;
    }
    else if(x=="easy"){
        gamedifficulty =3000;
    }
}

//play sounds for user input
function player(x){
document.getElementById(x).play();   
   
}

function generatecommand(){
    c = commands[Math.floor(5*Math.random())];
    player(c +"it1");
   timeout = setTimeout(function(){gameover()}, gamedifficulty);

    //document.getElementById(currentcommand).play();
}

function check(x){
    
    if(x!=c)
    {    
    gameover();
    }
    
    else{
    clearTimeout(timeout);
    //window.alert("correct");
    score+=1;
    document.getElementById("scorevalue").innerHTML = score;
    if(chosengametype == "passit2"){
        var passer = Math.random()*10
        if(passer<2){
        document.getElementById("passit").play();
        document.getElementById("BPM").play();
        timeout = setTimeout(function(){
            generatecommand()},3500);}
        else{
           timeout = setTimeout(function(){
            generatecommand()},1000); 
        }}
   
    
    else{timeout=setTimeout(function(){generatecommand()},1000);}
    }}

function gameover(){
    player("aaaw");
    gamestate="gameover";
    document.getElementById("backing").pause();
    document.getElementById("backing").currentTime=0;
    setTimeout(function(){player("gameover")},1000);
    document.getElementById("gamescore").innerHTML = score;
    document.getElementById('gameover1').style.display ='block';
    setTimeout(function(){scoreappraise(score)},2500);
    setTimeout(function(){playscore(score)},5000);
    
}

function control(x){
    if(x=='flick'){
    g++;
    chosengametype =   gametype[g%2];
    //window.alert(chosengametype); 
    document.getElementById(chosengametype).play();}
        
    else if(x=='pull'){
     v++;
    chosenvolume =   volume[v%3];
        //window.alert(chosenvolume);
        setvolume(chosenvolume);
        document.getElementById(chosenvolume).play();
    }
    else if(x=='twist'){
        i++;
        choseninstructionset = instructionsets[i%instructionsets.length];
    //window.alert(choseninstructionset); 
        testaudio(choseninstructionset);
        document.getElementById("twistit1").play();
    }
    else if(x=='spin'){  
    v++;
    chosendifficulty = difficulty[v%3];
        setdifficulty(chosendifficulty);
    //window.alert(chosendifficulty);
    document.getElementById(chosendifficulty).play();
    }
    else if(x=='bop'){
     gamestate="playing";
    initialiseinstructions(choseninstructionset);
        
    document.getElementById("ready").pause();
    document.getElementById("ready").currenttime=0;
    document.getElementById("backing").play();
    generatecommand(); 
    }
}

function setvolume(x){
    if(x=="low"){
        for(i = 0; i < instructionset.length ; i++){
            document.getElementById(instructionset[i]).volume = 0.5;}
    }
    else if(x=="medium"){
        for(i = 0; i < instructionset.length ; i++){
            document.getElementById(instructionset[i]).volume = 0.8;}
    }
    else if(x=="high"){
        for(i = 0; i < instructionset.length ; i++){
            document.getElementById(instructionset[i]).volume = 1.0;}
    }
}