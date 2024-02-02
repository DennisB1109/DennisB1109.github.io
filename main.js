// import 'style.scss';

// Hier könntest du JavaScript-Code hinzufügen, wenn benötigt
let currentQuestionIndex = 0;

const body = document.querySelector('body');
const toggle = document.getElementById('toggle');
toggle.onclick = function(){
    toggle.classList.toggle('active');
    body.classList.toggle('active');
}

const buttons = document.querySelectorAll('.waves');
const time = 800;

buttons.forEach((button) => {
    createContentWrapper(button);
    const wavesWrapper = createWavesWrapper(button);
    button.addEventListener("click", ($event) => {
        const{offsetX, offsetY} = $event;
        const{width} = button.getBoundingClientRect();
        const wave = document.createElement('div');

        const size = width * 1.5;
        const posX = offsetX - size / 2;
        const posY = offsetY - size / 2;
        wave.style.setProperty('translate', `${posX}px ${posY}px`);
        wave.style.setProperty('--time', `${time}ms`);

        wave.classList.add('wave');
        wavesWrapper.appendChild(wave);

        setTimeout(() => {
            wavesWrapper.removeChild(wave);
        }, time);
    });
});

function createContentWrapper(button){
    const content = button.innerHTML;
    button.innerHTML = '';
    const contentWraper = document.createElement('div');
    contentWraper.classList.add('content-wrapper');
    contentWraper.innerHTML = content;
    button.appendChild(contentWraper);
}

function createWavesWrapper(button){
    const wavesWrapper = document.createElement('div');
    wavesWrapper.classList.add('wave-wrapper');
    button.appendChild(wavesWrapper);
    return wavesWrapper;
}

const questions = [
    "Blocker",
    "Frage 1: Bitte wähle dein Geschecht aus",
    "Frage 2: Nenne mir dein Alter",
    "Frage 3: Wie würdest du dein aktuelles Fitnesslevel beschreiben?",
    "Frage 4: Hast du aktuell Verletzungen?",
    "Frage 5: Was sind deine Trainingsziele?",
    "Frage 6: Wo willst du in Zukunft trainieren?",
    "Frage 7: Welche Trainingsausrüstung steht dir zur Verfügung?",
    "Frage 8: An welchen Tagen in der Woche möchtest du trainieren?"
]

const startButton = document.getElementById('test');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const genderContainer = document.getElementById("genderID");
const sliderContainer = document.getElementById("slideContainerID");
const fitnessLevelContainer = document.getElementById("fitnessLevelID");
const verletzungenContainer = document.getElementById("verletzungenID");
const wochenplanContainer = document.getElementById("wochenplanID");

function startQuestions() {
    console.log("Test");
    startButton.remove();
    prevButton.style.display = "block";
    nextButton.style.display = "block";
    showNextQuestions();
}

function showPrevQuestions() {
    if (currentQuestionIndex != 1){
        const questionContainer = document.getElementById("questionContainer");
        currentQuestionIndex--;
        questionContainer.innerHTML = questions[currentQuestionIndex];
    } else {
        alert("Dies ist die erste Frage");
    }

    checkQuestionIndex(currentQuestionIndex);   
}

function showNextQuestions() {
    if (currentQuestionIndex < questions.length-1){
        const questionContainer = document.getElementById("questionContainer");
        currentQuestionIndex++;
        questionContainer.innerHTML = questions[currentQuestionIndex];
    } else {
        alert("Alle Frage beantwortet");
    }
    checkQuestionIndex(currentQuestionIndex); 
}

function checkQuestionIndex(questionIndex) {
    if (currentQuestionIndex == 1) {
        genderContainer.style.display = "block";
    }
    if (currentQuestionIndex != 1) {
        genderContainer.style.display = "none";
    } 
    if (currentQuestionIndex == 2) {
        sliderContainer.style.display = "block";
    }
    if (currentQuestionIndex != 2) {
        sliderContainer.style.display = "none";
    }  
    if (currentQuestionIndex == 3) {
        fitnessLevelContainer.style.display = "block";
    }
    if (currentQuestionIndex != 3) {
        fitnessLevelContainer.style.display = "none";
    }  
    if (currentQuestionIndex == 4) {
        verletzungenContainer.style.display = "block";
    }
    if (currentQuestionIndex != 4) {
        verletzungenContainer.style.display = "none";
    }  
    if (currentQuestionIndex == 8) {
        wochenplanContainer.style.display = "block";
    }
    if (currentQuestionIndex != 8) {
        wochenplanContainer.style.display = "none";
    }  
}

var slider = document.gerElementById("myRange");
var output = document.gerElementById("alter");

output.innerHTML = slider.value;

slider.oninput = function(){
    output.innerHTML = this.value;
}

slider.addEventListener("mouseover", function(){
    var x = slider.value;
    var color = 'linear-gradient(90deg, rgb(117,252,117))' + x + '%, rgb(214,214,214)' + x + '%)';
    slider.style.background = color;
})