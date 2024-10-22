// import 'style.scss';

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
    "Frage 7: An welchen Tagen in der Woche möchtest du trainieren?"
]

const results = [
    [0,0,0],            // Entries for Gender
    [0],                // Entries for Age
    [0,0,0],            // Entries for Gender
    [0,0,0,0],          // Entries for Injuries
    [0,0,0],            // Entries for Goals
    [0,0,0],            // Entries for Location
    [0,0,0,0,0,0,0]     // Entries for TrainingDays
]

class Exercise {
    constructor(name, muscleGroup, difficultyLevel){
        this.name = name;
        this.muscleGroup = muscleGroup;
        this.difficultyLevel = difficultyLevel;
    }
}

const exercises = [
    new Exercise("Bankdrücken", "Brust", 3),
    new Exercise("Butterfly", "Brust", 3),
    new Exercise("Fliegende mit Kurzhanteln", "Brust", 3),
    new Exercise("Schrägbankdrücken", "Brust", 3),
    new Exercise("Negativbankdrücken", "Brust", 3),
    new Exercise("Cable Fly", "Brust", 3),
    new Exercise("Brustpresse", "Brust", 3),
    
    new Exercise("Latzug", "Rücken", 3),
    new Exercise("Kreuzheben", "Rücken", 3),
    new Exercise("Rudern", "Rücken", 3),

    new Exercise("Shrugs", "Nacken", 3),
    
    new Exercise("Schulterdrücken", "Schultern", 3),
    
    new Exercise("Ausfallschritte", "Beine", 3),
    new Exercise("Kniebeugen", "Beine", 3),
    new Exercise("Schrägbeinpresse", "Beine", 3),
    new Exercise("Beinpresse", "Beine", 3),
    new Exercise("Bulgarian Split Squats", "Beine", 3),
    
    new Exercise("Beinstecker", "Quadtrizeps", 3),

    new Exercise("Beinbeuger", "Beinbeuger", 3),

    new Exercise("Wadenheben sitzend", "Waden", 3),
    new Exercise("Wadenheben stehend", "Waden", 3),
    
    new Exercise("Trizepsdrücken", "Trizeps", 3),
    new Exercise("Arnold Dips", "Trizeps", 3),
    new Exercise("Dips", "Trizeps", 3),
    new Exercise("French Press", "Trizeps", 3),
    new Exercise("Enges Bankdrücken", "Trizeps", 3),
    new Exercise("Trizeps Kickbacks", "Trizeps", 3),

    new Exercise("Bizepscurls", "Bizeps", 3)
];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const startButton = document.getElementById('test');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const genderContainer = document.getElementById("genderID");
const sliderContainer = document.getElementById("slideContainerID");
const fitnessLevelContainer = document.getElementById("fitnessLevelID");
const verletzungenContainer = document.getElementById("verletzungenID");
const wochenplanContainer = document.getElementById("wochenplanID");
const trainingsZieleContainer = document.getElementById("trainingsZieleID");
const trainingLocationContainer = document.getElementById("trainingLocationID");
const weeklyTableContainer = document.getElementById("weeklyID");
weeklyTableContainer.style.display = "none";
const triweeklyTableContainer = document.getElementById("triweeklyID");
triweeklyTableContainer.style.display = "none";

function startQuestions() {
    console.log("Test");
    startButton.remove();
    prevButton.style.display = "block";
    nextButton.style.display = "block";
    showNextQuestions();
}

function showPrevQuestions() {
    if (currentQuestionIndex != 1){
        const TitleTextContainer = document.getElementById("TitleTextContainer");
        currentQuestionIndex--;
        TitleTextContainer.innerHTML = questions[currentQuestionIndex];
    } else {
        alert("Dies ist die erste Frage");
    }
    checkQuestionIndex(currentQuestionIndex);   
}

function showNextQuestions() {
    if (currentQuestionIndex < questions.length-1){
        const TitleTextContainer = document.getElementById("TitleTextContainer");
        currentQuestionIndex++;
        TitleTextContainer.innerHTML = questions[currentQuestionIndex];
        if (currentQuestionIndex == 3){
            results[1][0] = parseInt(output.innerHTML);
        }
        checkQuestionIndex(currentQuestionIndex); 
    } else {
        // ToDo
        for (let i = 0; i < results.length; i++) {
            // Iteriere über die Spalten der aktuellen Zeile
            for (let j = 0; j < results[i].length; j++) {
                // Gib den Wert des aktuellen Elements im 2D-Array aus
                console.log(`results[${i}][${j}] = ${results[i][j]}`);
            }
        }
        alert("Alle Fragen beantwortet, dein Trainingsplan wird erstellt");
        displayPlan();
    }
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
    if (currentQuestionIndex == 5) {
        trainingsZieleContainer.style.display = "block";
    }
    if (currentQuestionIndex != 5) {
        trainingsZieleContainer.style.display = "none";
    }
    if (currentQuestionIndex == 6) {
        trainingLocationContainer.style.display = "block";
    }
    if (currentQuestionIndex != 6) {
        trainingLocationContainer.style.display = "none";
    }  
    if (currentQuestionIndex == 7) {
        wochenplanContainer.style.display = "block";
    }
    if (currentQuestionIndex != 7) {
        wochenplanContainer.style.display = "none";
    }
}

var slider = document.getElementById("myRange");
var output = document.getElementById("alter");

output.innerHTML = slider.value;

slider.oninput = function(){
    output.innerHTML = this.value;
}

slider.addEventListener("mouseover", function(){
    var x = slider.value;
    var color = 'linear-gradient(90deg, rgb(117,252,117))' + x + '%, rgb(214,214,214)' + x + '%)';
    slider.style.background = color;
})

// Event Listener for the Gender Section ------------
// Male Button
document.getElementById('male').addEventListener('change', function() {
    results[0] = [1, 0, 0]; // Setze Male auf 1, Female und Diverse auf 0
});

// Female Button
document.getElementById('female').addEventListener('change', function() {
    results[0] = [0, 1, 0]; // Setze Female auf 1, Male und Diverse auf 0
});

// Diverse Button
document.getElementById('diverse').addEventListener('change', function() {
    results[2] = [0, 0, 1]; // Setze Diverse auf 1, Male und Female auf 0
});

// Event Listener for the Age Section ------------
// is handled in line 112

// Event Listener for the Fitness Level Section ------------
// lauch Button
document.getElementById('lauch').addEventListener('change', function() {
    results[2] = [1, 0, 0]; // Setze lauch auf 1, erfahren und profi auf 0
});

// erfahren Button
document.getElementById('erfahren').addEventListener('change', function() {
    results[2] = [0, 1, 0]; // Setze erfahren auf 1, lauch und profi auf 0
});

// profi Button
document.getElementById('profi').addEventListener('change', function() {
    results[2] = [0, 0, 1]; // Setze profi auf 1, lauch und erfahren auf 0
});

// Event Listener for the Injuries Section ------------
// Knie Button
document.getElementById('kneeCheckbox').addEventListener('change', function() {
    results[3][0] = 1; // Setze Knie auf 1
});

// Hüfte Button
document.getElementById('hipCheckbox').addEventListener('change', function() {
    results[3][1] = 1; // Setze Hüfte auf 1
});

// Schulter Button
document.getElementById('shoulderCheckbox').addEventListener('change', function() {
    results[3][2] = 1; // Setze Schulter auf 1
});

// Rücken Button
document.getElementById('backCheckbox').addEventListener('change', function() {
    results[3][3] = 1; // Setze Rücken auf 1
});

// Event Listener for the Training Goals Section ------------
// Muskelaufbau Button
document.getElementById('muskelaufbau').addEventListener('change', function() {
    results[4][0] = 1; // Setze Muskelaufbau auf 1
});

// Abnehmen Button
document.getElementById('abnehmen').addEventListener('change', function() {
    results[4][1] = 1; // Setze Abnehmen auf 1
});

// Reha Button
document.getElementById('reha').addEventListener('change', function() {
    results[4][2] = 1; // Setze Reha auf 1
});

// Event Listener for the Training Locations Section ------------
// Zuhause Button
document.getElementById('zuhause').addEventListener('change', function() {
    results[5] = [1, 0, 0]; // Setze Zuhause auf 1, Gym und Cali-Park auf 0
});

// Gym Button
document.getElementById('gym').addEventListener('change', function() {
    results[5] = [0, 1, 0]; // Setze Gym auf 1, Zuhause und Cali-Park auf 0
});

// Cali-Park Button
document.getElementById('caliPark').addEventListener('change', function() {
    results[5] = [0, 0, 1]; // Setze Cali-Park auf 1, Zuhause und Gym auf 0
});

// Event Listener for the Week Schedule Section ------------
// Montag Button
document.getElementById('mondayCheckbox').addEventListener('change', function() {
    results[6][0] = 1; // Setze Montag auf 1
});

// Dienstag Button
document.getElementById('tuesdayCheckbox').addEventListener('change', function() {
    results[6][1] = 1; // Setze Dienstag auf 1
});

// Mittwoch Button
document.getElementById('wednesdayCheckbox').addEventListener('change', function() {
    results[6][2] = 1; // Setze Mittwoch auf 1
});

// Donnerstag Button
document.getElementById('thursdayCheckbox').addEventListener('change', function() {
    results[6][3] = 1; // Setze Donnerstag auf 1
});

// Freitag Button
document.getElementById('fridayCheckbox').addEventListener('change', function() {
    results[6][4] = 1; // Setze Freitag auf 1
});

// Samstag Button
document.getElementById('saturdayCheckbox').addEventListener('change', function() {
    results[6][5] = 1; // Setze Samstag auf 1
});

// Sonntag Button
document.getElementById('sundayCheckbox').addEventListener('change', function() {
    results[6][6] = 1; // Setze Sonntag auf 1
});

// Funktion zum Mischen eines Arrays (für zufällige Auswahl)
function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

async function createFullBodyWorkout(fitnesslevel) {
    let trainingsplan = [];

    // Lade die JSON-Datei
    const response = await fetch("ExerciseDB.json");
    const data = await response.json();
    // Zugriff auf Übungen
    const exercises = Object.values(data.exercises);

    const muskelGruppenReihenfolge = ["Beine", "Brust", "Rücken", "Schultern", "Trizeps", "Bizeps"];

    muskelGruppenReihenfolge.forEach(muskelgruppe => {
        let verfuegbareUebungen = shuffleArray(exercises.filter(exercise =>
            exercise.muscle_group.includes(muskelgruppe) && 
            exercise.difficulty === fitnesslevel
        ));
        
        if (verfuegbareUebungen.length > 0) {
            trainingsplan.push(verfuegbareUebungen[0]);
        }
    });

    // Rückgabe des Trainingsplans als String
    return trainingsplan.map(exercise => `${exercise.name} (${exercise.muscleGroup})`).join('\n\n');
}

async function createPushWorkout(fitnesslevel) {
    let trainingsplan = [];

    // Lade die JSON-Datei
    const response = await fetch("ExerciseDB.json");
    const data = await response.json();
    // Zugriff auf Übungen
    const exercises = Object.values(data.exercises);

    const push = ["Brust", "Brust", "Brust", "Schultern", "Schultern", "Schultern", "Trizeps", "Trizeps"];

    push.forEach(muskelgruppe => {
        let verfuegbareUebungen = shuffleArray(exercises.filter(exercise =>
            exercise.muscle_group.includes(muskelgruppe) && // Ändere 'muscleGroup' auf 'muscle_group'
            exercise.difficulty === fitnesslevel // Ändere 'difficultyLevel' auf 'difficulty'
        ));

        if (verfuegbareUebungen.length > 0) {
            trainingsplan.push(verfuegbareUebungen[0]);
        }
    });

    // Rückgabe des Trainingsplans als String
    return trainingsplan.map(exercise => `${exercise.name[0]} (${exercise.muscle_group[0]})`).join('\n\n'); // Verwende den ersten Namen
}

async function createPullWorkout(fitnesslevel) {
    let trainingsplan = [];
    
    // Lade die JSON-Datei
    const response = await fetch("ExerciseDB.json");
    const data = await response.json();
    // Zugriff auf Übungen
    const exercises = Object.values(data.exercises);

    const pull = ["Rücken", "Rücken", "Rücken", "Nacken", "Bizeps", "Bizeps"];

    pull.forEach(muskelgruppe => {
        let verfuegbareUebungen = shuffleArray(exercises.filter(exercise =>
            exercise.muscle_group.includes(muskelgruppe) && // Ändere 'muscleGroup' auf 'muscle_group'
            exercise.difficulty === fitnesslevel // Ändere 'difficultyLevel' auf 'difficulty'
        ));

        if (verfuegbareUebungen.length > 0) {
            trainingsplan.push(verfuegbareUebungen[0]);
        }
    });

    // Rückgabe des Trainingsplans als String
    return trainingsplan.map(exercise => `${exercise.name[0]} (${exercise.muscle_group[0]})`).join('\n\n');
}

async function createLegsWorkout(fitnesslevel) {
    let trainingsplan = [];
    
    // Lade die JSON-Datei
    const response = await fetch("ExerciseDB.json");
    const data = await response.json();
    // Zugriff auf Übungen
    const exercises = Object.values(data.exercises);

    const legs = ["Beine", "Beine", "Quadtrizeps", "Beinbeuger", "Waden", "Waden"];

    legs.forEach(muskelgruppe => {
        let verfuegbareUebungen = shuffleArray(exercises.filter(exercise =>
            exercise.muscle_group.includes(muskelgruppe) && // Ändere 'muscleGroup' auf 'muscle_group'
            exercise.difficulty === fitnesslevel // Ändere 'difficultyLevel' auf 'difficulty'
        ));

        if (verfuegbareUebungen.length > 0) {
            trainingsplan.push(verfuegbareUebungen[0]);
        }
    });

    // Rückgabe des Trainingsplans als String
    return trainingsplan.map(exercise => `${exercise.name[0]} (${exercise.muscle_group[0]})`).join('\n\n');
}


async function displayPlan(){
    wochenplanContainer.style.display = "none";
    TitleTextContainer.style.display = "none";
    prevButton.style.display = "none";
    nextButton.style.display = "none";

    // Zuerst checken wir wie viele Wochentage der User trainieren möchte
    var weekdays = 0;
    for(let i = 0; i < 7; i++){
        if (results[6][i] == 1){
            weekdays++;
        }
    }

    const showText = document.getElementById("TitleTextContainer");
    showText.innerHTML = "Basierend auf deinen Angaben wurde für dich folgender Trainingsplan erstellt";
    showText.style.display = "block";
    if(weekdays == 4){
        // Zeige 3-wöchige Tabelle
        triweeklyTableContainer.style.display = "block";
    } else {
        // Zeige 1-wöchige Tabelle
        weeklyTableContainer.style.display = "block";
        var tabelle = document.getElementById("weeklyID").getElementsByTagName("table")[0];
        var zeilen = tabelle.getElementsByTagName("tr");
        
        var zellen = zeilen[1].getElementsByTagName("td");
        let counterForPushPullLegs = 1;
        for (var j = 0; j < zellen.length; j++) {
            if(results[6][j] == 1){
                if (weekdays == 1){
                    // Ganzkörper
                    zellen[j].innerText = await createFullBodyWorkout(3);
                } else if(weekdays == 2){
                    // Ganzkörper
                    zellen[j].innerText = await createFullBodyWorkout(3);
                } else if(weekdays == 3){
                    // Push, Pull, Legs
                    if(counterForPushPullLegs == 1){
                        zellen[j].innerText = await createPushWorkout(3);
                        counterForPushPullLegs++;
                    } else if(counterForPushPullLegs == 2){
                        zellen[j].innerText = await createPullWorkout(3);
                        counterForPushPullLegs++;
                    } else if(counterForPushPullLegs == 3){
                        zellen[j].innerText = await createLegsWorkout(3);
                        counterForPushPullLegs++;
                    }
                } else if(weekdays == 6){
                    // Push, Pull, Legs, Push, Pull, Legs
                    if(counterForPushPullLegs == 1 || counterForPushPullLegs == 4){
                        zellen[j].innerText = await createPushWorkout(3);
                        counterForPushPullLegs++;
                    } else if(counterForPushPullLegs == 2 || counterForPushPullLegs == 5){
                        zellen[j].innerText = await createPullWorkout(3);
                        counterForPushPullLegs++;
                    }else if(counterForPushPullLegs == 3 || counterForPushPullLegs == 6){
                        zellen[j].innerText = await createLegsWorkout(3);
                        counterForPushPullLegs++;
                    }
                }
            }
        }
    }
}

