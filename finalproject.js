// select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

// create our questions
let questions = [
    {
        question : "What is period poverty?",
        imgSrc : "https://d8s293fyljwh4.cloudfront.net/petitions/images/232550/horizontal/TheMenstrualMob.jpg?1534122098",
        choiceA : "The delay of a woman's period",
        choiceB : "The inability of woman to buy menstrual products",
        choiceC : "The lack of menstrual products in a store",
        correct : "B"
    },{
        question : "Which state out of the ones below have the highest rate of homelessness as of 2018?",
        imgSrc : "https://realestateagentpdx.com/wp-content/uploads/2017/04/portland-homeless-tiny-home.jpg",
        choiceA : "Washington",
        choiceB : "Nebraska",
        choiceC : "California",
        correct : "C"
    },{
        question : "What are some actions being taken against period poverty?",
        imgSrc : "https://www.telegraph.co.uk/content/dam/news/2018/05/28/TELEMMGLPICT000164388001_trans_NvBQzQNjv4BqqVzuuqpFlyLIwiB6NTmJwfSVWeZ_vEN7c6bHu2jJnT8.jpeg?imwidth=450",
        choiceA : "Preventing the use of birth control",
        choiceB : "Remoivng taxes on menstrual products",
        choiceC : "Promoting the use of tampons over pads",
        correct : "B"
    },{
      question : "What is one of the leading causes of homelessness?",
      imgSrc : "https://www.usnews.com/dims4/USNEWS/c92892d/2147483647/thumbnail/640x420/quality/85/?url=http%3A%2F%2Fcom-usnews-beam-media.s3.amazonaws.com%2Fa9%2F81%2F3d24c4884b4481c780fc0942d2ac%2F190423-homeless-editorial.jpg",
      choiceA : "Unemployment",
      choiceB : "Family issues",
      choiceC : "Substance abuse",
      correct : "A"
  },{
    question : "How do women experiencing period poverty most commonly handle it?",
    imgSrc : "https://img.thedailybeast.com/image/upload/c_crop,d_placeholder_euli9k,h_1439,w_2560,x_0,y_0/dpr_1.5/c_limit,w_1044/fl_lossy,q_auto/v1492109432/articles/2016/09/21/yes-men-can-have-periods-and-we-need-to-talk-about-them/160917-Street-if-men-had-periods-tease_dd7bj9",
    choiceA : "Try to get pregnant",
    choiceB : "Go on a diet and excercise daily",
    choiceC : "Substitute rags and tissues for menstrual products",
    correct : "C"
    }
];

// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 15; // 10s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
function renderQuestion(){
    let q = questions[runningQuestion];

    question.innerHTML = "<p>"+ q.question +"</p>";
    qImg.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter render

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnwer

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender(){
    scoreDiv.style.display = "block";

    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score/questions.length);

    // choose the image based on the scorePerCent
    let img = (scorePerCent >= 80) ? "img/5.png" :
              (scorePerCent >= 60) ? "img/4.png" :
              (scorePerCent >= 40) ? "img/3.png" :
              (scorePerCent >= 20) ? "img/2.png" :
              "img/1.png";

    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
}
