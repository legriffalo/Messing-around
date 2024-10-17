
/// next steps//
// get question to rotate/randomly generate
// get format nicely
// get it to deal with varying question lengths 
//https://stackoverflow.com/questions/5613834/convert-string-to-variable-name-in-javascript
///

  //
  //  Use a closure to hide the local variables from the
  //  global namespace
  //
 // (function () {
  //  var QUEUE = MathJax.Hub.queue;  // shorthand for the queue
  //  var math = null;                // the element jax for the math output.

    //
    //  Get the element jax when MathJax has produced it.
    //

//window.UpdateMath = function () {


//mat = document.getElementsByClassName('input')


//for(let i = 0;i<mat.length;i++){


    //QUEUE.Push(function () {
     //   TeX = mat[i].value
    //  math = MathJax.Hub.getAllJax("MathOutput")[0];
   //   QUEUE.Push(["Text",math,"\\displaystyle{"+TeX+"}"]);
 //   });


//}};
   

  //})();


//function include(file) {
  
   // var script  = document.createElement('script');
    //script.src  = file;
    //script.type = 'text/javascript';
    //script.defer = true;
    
   // document.getElementsByTagName('head').item(0).appendChild(script);
    
  //}
    
  /* Include Many js files */
 // include('./quiz_dependencies/MathJax-2.7.3/MathJax.js')

//var document = "quiz.html"

//questions = questions.replaceAll("*",'&#215');
//questions = questions.replaceAll("*",'&#92;times')
//questions = questions.replaceAll("*",'&#92;times')
const qs = JSON.parse(questions);
////

const opt = JSON.parse(options);
console.log(opt);
//var check = JSON.parse(questions).Q1.Question;
//window.alert(check);
var quizstate = 0;
var answer = 0 ;
var i = 0;
//var question_list = object.keys(qs);
var score = 0;
var keys = [];
for(var k in qs) keys.push(k);

if(parseInt(opt.options.Randomised) == 1){
   // window.alert('triggered randomised qs')
    keys = keys.sort((a, b) => 0.5 - Math.random())
    //window.alert(keys);
};
if(parseInt(opt.options.loopincorrect) == 1){
    loop = true
};

var question = keys[i]



function startQuiz(){
    
    if(quizstate != 1){
        document.getElementById("choices").innerHTML = '';
        //window.alert(quizstate);
        document.getElementById("quizover").style.display = "none";
         quizstate = 1;
        //window.alert(gamestate);
        generatequestion(question);    
    }
    else{
        quizover();
        quizstate = 0;
    }
}

function quizover(){
    document.getElementById("quizover").style.display = "block";
    
    document.getElementById('outof').innerHTML = i;
}

function generatequestion(question){
    //window.alert('question being generated')
    //var incorrect = 0;
    var question1 = eval("qs."+ question);
    document.getElementById('instruction').innerHTML = question1.mode;
    var question2 = question1.Question; 
    document.getElementById('question').innerHTML = question2;
    //console.log(question)
    answer = question1.Correctanswer;
    //console.log(answer)
    var incorrect = question1.incorrect.map((x)=>x);
    console.log(incorrect);
    incorrect.push(answer);
    var answers = incorrect;
    var answers2 = answers.sort((a, b) => 0.5 - Math.random());
    console.log(answers2);

    for(var i = 0; i < answers.length; i++) {
        //window.alert(answers[i]);
        gen_box(answers[i],i,'choices');}
        
    //answers.forEach((x, i) => gen_box(x,i,'choices'));
    MathJax.Hub.Typeset("[#container]")
}

function gen_box(x,i,y){
    //window.alert('box being generated')
    document.getElementById(y).innerHTML+='<div class="box" id="box'+ i + '"onclick="checkAnswer(' + i + ')">'+ x +'</div>'

    if(x == answer){
        document.getElementById('box'+i).classList.add('correct');
    }
}


function checkAnswer(b){
    //window.alert(answer)
    //var b = document.getElementById("box"+b).textContent;
    //window.alert(b);
   //check answer from box
    if(document.getElementById("box"+b).innerHTML === answer || document.getElementById("box"+b).classList.contains('correct'))
    //if answer is correct
    {document.getElementById("correct").style.display = "block";
    setTimeout(function(){document.getElementById("correct").style.display = "none"},1000)
    //update score
     updateScore();
     document.getElementById("choices").innerHTML = '';
     //new question
    generatequestion(question);
    
    }
    else{//if answer is incorrect
        document.getElementById("wrong").style.display = "block";
        setTimeout(function(){document.getElementById("wrong").style.display = "none"},1000)


    if(loop){
        document.getElementById("choices").innerHTML = '';
        var question_to_repeat = keys[i]
        //window.alert(question_to_repeat)
        keys.push(question_to_repeat);
        //window.alert(keys)
        i+=1;
        question = keys[i];
        generatequestion(question)
    }
    }
}

function updateScore() {
    score += 1;
    document.getElementById("scorevalue").innerHTML = score;
    document.getElementById("quizscore").innerHTML = score;

    i+=1;
    if(i<keys.length){
        question = keys[i];  
    }
    else{
        quizover()
        i = 0;
    }
    
    //window.alert(question);
    //window.alert(score);
}
     
function setTimer(){
   timer = window.setInterval(function(){myTimer()}, 1000); 
   document.getElementById("timeremaining").style.display = "block";
}       

        
function myTimer(){
    if(time>0){
    time--;
    document.getElementById("timeRemaining").innerHTML = time;
    }
    else {gameOver();}
}
 
function stopTimer(){
   // window.alert("timer stopped")
    clearInterval(timer);
    time = timesetting;
    document.getElementById("timeRemaining").innerHTML = time;
}

