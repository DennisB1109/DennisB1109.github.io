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

// Code Block einkommentieren um die JSON Datei als Datenbank für die Übungen zu verwenden
/*
// Lade die JSON-Datei welche die Übungen enthält und greife auf Übungen zu
let exercises = []; // Globale Variable für die Übungen
// Funktion, um die JSON-Datei zu laden und Übungen global zu speichern
async function loadExercises() {
    try {
        const response = await fetch('ExerciseDB.json');
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        const data = await response.json();
        exercises = Object.values(data.exercises); // Speichere die Übungen global
    } catch (error) {
        console.error('Fehler beim Laden der Übungen:', error);
    }
}

// Diese Funktion sollte beim Laden der Seite aufgerufen werden
window.onload = async function() {
    await loadExercises(); // Lade die Übungen einmalig
    // Du kannst hier weitere Initialisierungen vornehmen
};
*/
// Code Block einkommentieren um lokal mit den Übungen zu arbeiten

let exercises = [
    {
        "name": ["Bankdrücken"],
        "difficulty": 2,
        "muscle_group": ["Brust", "Mittlere Brust"],
        "training_location": ["Gym"],
        "age": [1, 100],
        "goal": "Muskelaufbau",
        "gender": ["Male"]
    },
    {
        "name": ["Butterfly-Maschine"],
        "difficulty": 1,
        "muscle_group": ["Brust", "Innere Brust"],
        "training_location": ["Gym"],
        "age": [1, 100],
        "goal": "Muskelaufbau",
        "gender": ["Male", "Female"]
    },
    {
        "name": ["Fliegende mit Kurzhanteln"],
        "difficulty": 2,
        "muscle_group": ["Brust", "Innere Brust"],
        "training_location": ["Gym"],
        "age": [1, 100],
        "goal": "Muskelaufbau",
        "gender": ["Male", "Female"]
    },
    {
        "name": ["Schrägbankdrücken"],
        "difficulty": 2,
        "muscle_group": ["Brust", "Obere Brust"],
        "training_location": ["Gym"],
        "age": [1, 100],
        "goal": "Muskelaufbau",
        "gender": ["Male"]
    },
    {
        "name": ["Negativbankdrücken"],
        "difficulty": 2,
        "muscle_group": ["Brust", "Untere Brust"],
        "training_location": ["Gym"],
        "age": [1, 100],
        "goal": "Muskelaufbau",
        "gender": ["Male"]
    },
    {
        "name": ["Cable Fly"],
        "difficulty": 1,
        "muscle_group": ["Brust", "Innere Brust"],
        "training_location": ["Gym"],
        "age": [1, 100],
        "goal": "Muskelaufbau",
        "gender": ["Male", "Female"]
    },
    {
        "name": ["Brustpresse Maschine"],
        "difficulty": 1,
        "muscle_group": ["Brust", "Mittlere Brust"],
        "training_location": ["Gym"],
        "age": [1, 100],
        "goal": "Muskelaufbau",
        "gender": ["Male", "Female"]
    },
    {
        "name": ["Latzug"],
        "difficulty": 2,
        "muscle_group": ["Rücken", "Latissimus", "Teres Major"],
        "training_location": ["Gym"],
        "age": [1, 100],
        "goal": "Muskelaufbau",
        "gender": ["Male", "Female"]
    },
    {
        "name": ["Kreuzheben"],
        "difficulty": 3,
        "muscle_group": ["Rücken", "Unterer Rücken"],
        "training_location": ["Gym"],
        "age": [1, 100],
        "goal": "Muskelaufbau",
        "gender": ["Male"]
    },
    {
        "name": ["Kurzhantel Rudern", "Dumbbell Bent-Over Rows"],
        "difficulty": 2,
        "muscle_group": ["Rücken", "Latissimus", "Teres Major"],
        "training_location": ["Gym"],
        "age": [1, 100],
        "goal": "Muskelaufbau",
        "gender": ["Male", "Female"]
    },
    {
        "name": ["Langhantel Rudern", "Barbell Bent-Over Rows"],
        "difficulty": 2,
        "muscle_group": ["Rücken", "Latissimus", "Teres Major"],
        "training_location": ["Gym"],
        "age": [1, 100],
        "goal": "Muskelaufbau",
        "gender": ["Male", "Female"]
    },
    {
        "name": ["Shrugs mit Kurzhanteln"],
        "difficulty": 1,
        "muscle_group": ["Nacken", "Oberer Trapezius"],
        "training_location": ["Gym"],
        "age": [1, 100],
        "goal": "Muskelaufbau",
        "gender": ["Male"]
    },
    {
        "name": ["Schulterdrücken", "Shoulder Press"],
        "difficulty": 3,
        "muscle_group": ["Schultern", "Vordere Schulter"],
        "training_location": ["Gym"],
        "age": [1, 100],
        "goal": "Muskelaufbau",
        "gender": ["Male", "Female"]
    },
    {
        "name": ["Ausfallschritte"],
        "difficulty": 1,
        "muscle_group": ["Beine"],
        "training_location": ["Gym"],
        "age": [1, 100],
        "goal": "Muskelaufbau",
        "gender": ["Male", "Female"]
    },
    {
        "name": ["Kniebeugen"],
        "difficulty": 3,
        "muscle_group": ["Beine"],
        "training_location": ["Gym"],
        "age": [1, 100],
        "goal": "Muskelaufbau",
        "gender": ["Male", "Female"]
    },
    {
        "name": ["Schrägbeinpresse"],
        "difficulty": 2,
        "muscle_group": ["Beine"],
        "training_location": ["Gym"],
        "age": [1, 100],
        "goal": "Muskelaufbau",
        "gender": ["Male", "Female"]
    },
    {
        "name": ["Beinpresse"],
        "difficulty": 2,
        "muscle_group": ["Beine"],
        "training_location": ["Gym"],
        "age": [1, 100],
        "goal": "Muskelaufbau",
        "gender": ["Male", "Female"]
    },
    {
        "name": ["Bulgarian Split Squats"],
        "difficulty": 3,
        "muscle_group": ["Beine", "Po", "Quadrizeps"],
        "training_location": ["Gym"],
        "age": [1, 100],
        "goal": "Muskelaufbau",
        "gender": ["Male", "Female"]
    },
    {
        "name": ["Beinstrecker"],
        "difficulty": 1,
        "muscle_group": ["Beine", "Quadrizeps"],
        "training_location": ["Gym"],
        "age": [1, 100],
        "goal": "Muskelaufbau",
        "gender": ["Male", "Female"]
    },
    {
        "name": ["Beinbeuger"],
        "difficulty": 1,
        "muscle_group": ["Beine", "Beinbeuger"],
        "training_location": ["Gym"],
        "age": [1, 100],
        "goal": "Muskelaufbau",
        "gender": ["Male", "Female"]
    },
    {
        "name": ["Wadenheben sitzend"],
        "difficulty": 1,
        "muscle_group": ["Waden"],
        "training_location": ["Gym"],
        "age": [1, 100],
        "goal": "Muskelaufbau",
        "gender": ["Male", "Female"]
    },
    {
        "name": ["Wadenheben stehend"],
        "difficulty": 1,
        "muscle_group": ["Waden"],
        "training_location": ["Gym"],
        "age": [1, 100],
        "goal": "Muskelaufbau",
        "gender": ["Male", "Female"]
    },
    {
        "name": ["Trizepsdrücken"],
        "difficulty": 1,
        "muscle_group": ["Arme", "Trizeps"],
        "training_location": ["Gym"],
        "age": [1, 100],
        "goal": "Muskelaufbau",
        "gender": ["Male", "Female"]
    },
    {
        "name": ["Arnold Dips"],
        "difficulty": 1,
        "muscle_group": ["Arme", "Trizeps"],
        "training_location": ["Gym"],
        "age": [1, 100],
        "goal": "Muskelaufbau",
        "gender": ["Male", "Female"]
    },
    {
        "name": ["Dips"],
        "difficulty": 2,
        "muscle_group": ["Arme", "Trizeps", "Vordere Schulter"],
        "training_location": ["Gym"],
        "age": [1, 100],
        "goal": "Muskelaufbau",
        "gender": ["Male", "Female"]
    },
    {
        "name": ["French Press"],
        "difficulty": 2,
        "muscle_group": ["Arme", "Trizeps"],
        "training_location": ["Gym"],
        "age": [1, 100],
        "goal": "Muskelaufbau",
        "gender": ["Male", "Female"]
    },
    {
        "name": ["Enges Bankdrücken"],
        "difficulty": 2,
        "muscle_group": ["Arme", "Trizeps"],
        "training_location": ["Gym"],
        "age": [1, 100],
        "goal": "Muskelaufbau",
        "gender": ["Male", "Female"]
    },
    {
        "name": ["Trizeps Kickbacks"],
        "difficulty": 1,
        "muscle_group": ["Arme", "Trizeps"],
        "training_location": ["Gym"],
        "age": [1, 100],
        "goal": "Muskelaufbau",
        "gender": ["Male", "Female"]
    },
    {
        "name": ["Bizepscurls"],
        "difficulty": 1,
        "muscle_group": ["Arme", "Bizeps"],
        "training_location": ["Gym"],
        "age": [1, 100],
        "goal": "Muskelaufbau",
        "gender": ["Male", "Female"]
    },
    {
        "name": ["Aufrechtes Rudern", "Cable Upright Row"],
        "difficulty": 1,
        "muscle_group": ["Rücken", "Oberer Trapezius"],
        "training_location": ["Gym"],
        "age": [1, 100],
        "goal": "Muskelaufbau",
        "gender": ["Male", "Female"]
    },
    {
        "name": ["Face Pulls"],
        "difficulty": 2,
        "muscle_group": ["Rücken", "Unterer Trapezius", "Rotatorenmanschette", "Hintere Schulter"],
        "training_location": ["Gym"],
        "age": [1, 100],
        "goal": "Muskelaufbau",
        "gender": ["Male", "Female"]
    },
    {
        "name": ["Reverse Flys"],
        "difficulty": 1,
        "muscle_group": ["Rücken", "Unterer Trapezius", "Hintere Schulter"],
        "training_location": ["Gym"],
        "age": [1, 100],
        "goal": "Muskelaufbau",
        "gender": ["Male", "Female"]
    },
    {
        "name": ["Prone Y-Raises"],
        "difficulty": 1,
        "muscle_group": ["Rücken", "Unterer Trapezius"],
        "training_location": ["Gym", "Zuhause"],
        "age": [1, 100],
        "goal": "Muskelaufbau",
        "gender": ["Male", "Female"]
    },
    {
        "name": ["Klimmzüge", "Pull-Ups"],
        "difficulty": 2,
        "muscle_group": ["Rücken", "Unterer Trapezius", "Oberer Trapezius", "Latissimus", "Teres Major"],
        "training_location": ["Gym", "Cali-Park"],
        "age": [1, 100],
        "goal": "Muskelaufbau",
        "gender": ["Male", "Female"]
    },
    {
        "name": ["Kabelaußenrotation", "Außenrotation am Kabelzug"],
        "difficulty": 1,
        "muscle_group": ["Rücken", "Rotatorenmanschette"],
        "training_location": ["Gym"],
        "age": [1, 100],
        "goal": "Muskelaufbau",
        "gender": ["Male", "Female"]
    },
    {
        "name": ["Frontheben mit Kurzhanteln", "Dumbbell Front Raise"],
        "difficulty": 1,
        "muscle_group": ["Schultern", "Vordere Schulter"],
        "training_location": ["Gym"],
        "age": [1, 100],
        "goal": "Muskelaufbau",
        "gender": ["Male", "Female"]
    },
    {
        "name": ["Frontheben mit Langhantel", "Barbell Front Raise"],
        "difficulty": 1,
        "muscle_group": ["Schultern", "Vordere Schulter"],
        "training_location": ["Gym"],
        "age": [1, 100],
        "goal": "Muskelaufbau",
        "gender": ["Male", "Female"]
    },
    {
        "name": ["Arnold Presse", "Arnold Press"],
        "difficulty": 2,
        "muscle_group": ["Schultern", "Vordere Schulter"],
        "training_location": ["Gym"],
        "age": [1, 100],
        "goal": "Muskelaufbau",
        "gender": ["Male"]
    },
    {
        "name": ["Frontheben am Kabelturm", "Cable Front Raise"],
        "difficulty": 1,
        "muscle_group": ["Schultern", "Vordere Schulter"],
        "training_location": ["Gym"],
        "age": [1, 100],
        "goal": "Muskelaufbau",
        "gender": ["Male", "Female"]
    },
    {
        "name": ["Rear Delt Flys am Kabelzug", "Cable Front Raise"],
        "difficulty": 1,
        "muscle_group": ["Schultern", "Hintere Schulter"],
        "training_location": ["Gym"],
        "age": [1, 100],
        "goal": "Muskelaufbau",
        "gender": ["Male", "Female"]
    },
    {
        "name": ["Bent-Over Reverse Flys"],
        "difficulty": 2,
        "muscle_group": ["Schultern", "Hintere Schulter"],
        "training_location": ["Gym"],
        "age": [1, 100],
        "goal": "Muskelaufbau",
        "gender": ["Male", "Female"]
    },
    {
        "name": ["Seitheben", "Lateral Raise"],
        "difficulty": 2,
        "muscle_group": ["Schultern", "Seitliche Schulter"],
        "training_location": ["Gym"],
        "age": [1, 100],
        "goal": "Muskelaufbau",
        "gender": ["Male", "Female"]
    },
    {
        "name": ["Seitheben am Kabelzug", "Lateral Raise"],
        "difficulty": 1,
        "muscle_group": ["Schultern", "Seitliche Schulter"],
        "training_location": ["Gym"],
        "age": [1, 100],
        "goal": "Muskelaufbau",
        "gender": ["Male", "Female"]
    },
    {
        "name": ["Seitheben an der Maschine", "Lateral Raise"],
        "difficulty": 3,    // Schwer
        "muscle_group": ["Schultern", "Seitliche Schulter"],
        "training_location": ["Gym"],
        "age": [1, 100],
        "goal": "Muskelaufbau",
        "gender": ["Male", "Female"]
    },
    {
        "name": ["Brustpresse mit Kurzhanteln", "Dumbbell Bench Press"],
        "difficulty": 1,    // Leicht
        "muscle_group": ["Brust", "Mittlere Brust"],
        "training_location": ["Gym"],
        "age": [1, 100],
        "goal": "Muskelaufbau",
        "gender": ["Male"]
    },
    {
        "name": ["Kurzhantel Überzüge", "Dumbbell Pullover"],
        "difficulty": 2,    // Mittel
        "muscle_group": ["Brust", "Untere Brust"],
        "training_location": ["Gym"],
        "age": [1, 100],
        "goal": "Muskelaufbau",
        "gender": ["Male", "Female"]
    },
    {
        "name": ["Liegestütze", "Push Ups"],
        "difficulty": 1,
        "muscle_group": ["Brust", "Mittlere Brust"],
        "training_location": ["Gym"],
        "age": [1, 100],
        "goal": "Muskelaufbau",
        "gender": ["Male", "Female"]
    },
    {
        "name": ["Negativ Liegestütze (Füße auf Bank)", "Decline Push Up (Feet on Bench)"],
        "difficulty": 1,
        "muscle_group": ["Brust", "Obere Brust"],
        "training_location": ["Gym"],
        "age": [1, 100],
        "goal": "Muskelaufbau",
        "gender": ["Male", "Female"]
    },
    {
        "name": ["Positiv Liegestütze (Hände auf Bank)", "Incline Push Up (Hands on Bench)"],
        "difficulty": 1,
        "muscle_group": ["Brust", "Untere Brust"],
        "training_location": ["Gym"],
        "age": [1, 100],
        "goal": "Muskelaufbau",
        "gender": ["Male", "Female"]
    },
    {
        "name": ["Positiv Bankdrücken (Smith Machine)", "Smith Machine Incline Bench Press"],
        "difficulty": 1,
        "muscle_group": ["Brust", "Obere Brust"],
        "training_location": ["Gym"],
        "age": [1, 100],
        "goal": "Muskelaufbau",
        "gender": ["Male"]
    },
    {
        "name": ["Bankdrücken (Smith Machine)", "Smith Machine Bench Press"],
        "difficulty": 1,
        "muscle_group": ["Brust", "Mittlere Brust"],
        "training_location": ["Gym"],
        "age": [1, 100],
        "goal": "Muskelaufbau",
        "gender": ["Male"]
    },
    {
        "name": ["Reverse Curls"],
        "difficulty": 1,
        "muscle_group": ["Arme", "Bizeps"],
        "training_location": ["Gym"],
        "age": [1, 100],
        "goal": "Muskelaufbau",
        "gender": ["Male", "Female"]
    },
    {
        "name": ["Konzentrations Curl", "Concentration Curl"],
        "difficulty": 1,
        "muscle_group": ["Arme", "Bizeps"],
        "training_location": ["Gym"],
        "age": [1, 100],
        "goal": "Muskelaufbau",
        "gender": ["Male", "Female"]
    },
    {
        "name": ["Hammer Curl"],
        "difficulty": 1,
        "muscle_group": ["Arme", "Bizeps"],
        "training_location": ["Gym"],
        "age": [1, 100],
        "goal": "Muskelaufbau",
        "gender": ["Male", "Female"]
    },
    {
        "name": ["Preacher Curl (Maschine)", "Preacher Curl (Machine)"],
        "difficulty": 1,
        "muscle_group": ["Arme", "Bizeps"],
        "training_location": ["Gym"],
        "age": [1, 100],
        "goal": "Muskelaufbau",
        "gender": ["Male", "Female"]
    },
    {
        "name": ["Kabel Curl", "Kabel Curl"],
        "difficulty": 1,
        "muscle_group": ["Arme", "Bizeps"],
        "training_location": ["Gym"],
        "age": [1, 100],
        "goal": "Muskelaufbau",
        "gender": ["Male", "Female"]
    },
    {
        "name": ["Curls mit SZ-Stange"],
        "difficulty": 1,
        "muscle_group": ["Arme", "Bizeps"],
        "training_location": ["Gym"],
        "age": [1, 100],
        "goal": "Muskelaufbau",
        "gender": ["Male", "Female"]
    },
    {
        "name": ["Aktive Erholung", "Active Rest"],
        "difficulty": 1,
        "muscle_group": ["Erholung"],
        "training_location": ["Gym"],
        "age": [1, 100],
        "goal": "Erholung",
        "gender": ["Male", "Female"]
    },
    {
        "name": ["Hip Thrusts"],
        "difficulty": 3,
        "muscle_group": ["Po"],
        "training_location": ["Gym"],
        "age": [1, 100],
        "goal": "Muskelaufbau",
        "gender": ["Female"]
    },
    {
        "name": ["Plank"],
        "difficulty": 1,
        "muscle_group": ["Core"],
        "training_location": ["Gym"],
        "age": [1, 100],
        "goal": "Muskelaufbau",
        "gender": ["Male", "Female"]
    },
    {
        "name": ["Rumänisches Kreuzheben", "Romanian Deadlifts"],
        "difficulty": 2,
        "muscle_group": ["Po"],
        "training_location": ["Gym"],
        "age": [1, 100],
        "goal": "Muskelaufbau",
        "gender": ["Female"]
    },
    {
        "name": ["Glute Bridges"],
        "difficulty": 1,
        "muscle_group": ["Core", "Po"],
        "training_location": ["Gym"],
        "age": [1, 100],
        "goal": "Muskelaufbau",
        "gender": ["Female"]
    },
    {
        "name": ["Hyperextensions"],
        "difficulty": 1,
        "muscle_group": ["Unterer Rücken"],
        "training_location": ["Gym"],
        "age": [1, 100],
        "goal": "Muskelaufbau",
        "gender": ["Female"]
    },
    {
        "name": ["Cable Kickbacks"],
        "difficulty": 2,
        "muscle_group": ["Po"],
        "training_location": ["Gym"],
        "age": [1, 100],
        "goal": "Muskelaufbau",
        "gender": ["Female"]
    },
    {
        "name": ["Abduction Machine"],
        "difficulty": 1,
        "muscle_group": ["Po"],
        "training_location": ["Gym"],
        "age": [1, 100],
        "goal": "Muskelaufbau",
        "gender": ["Female"]
    },
    {
        "name": ["Goblet Squat"],
        "difficulty": 1,
        "muscle_group": ["Po"],
        "training_location": ["Gym"],
        "age": [1, 100],
        "goal": "Muskelaufbau",
        "gender": ["Female"]
    }
];

/* Funktion zum erstellen eines Fensters das beim drücken eines Knopfes geöffnet wird */
function openImageModal(imageSrc) {
    // Erstelle das Modal-Overlay
    const modalOverlay = document.createElement('div');
    modalOverlay.style.position = 'fixed';
    modalOverlay.style.top = '0';
    modalOverlay.style.left = '0';
    modalOverlay.style.width = '100%';
    modalOverlay.style.height = '100%';
    modalOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    modalOverlay.style.display = 'flex';
    modalOverlay.style.justifyContent = 'center';
    modalOverlay.style.alignItems = 'center';
    modalOverlay.style.zIndex = '1000';

    // Erstelle das Bild
    const image = document.createElement('img');
    image.src = imageSrc;
    image.style.maxWidth = '80%';
    image.style.maxHeight = '80%';
    image.style.border = '2px solid white';
    modalOverlay.appendChild(image);

    // Füge eine Schließfunktion hinzu
    modalOverlay.addEventListener('click', () => {
        document.body.removeChild(modalOverlay);
    });

    // Füge das Modal dem Body hinzu
    document.body.appendChild(modalOverlay);
}


async function createFullBodyWorkout(fitnesslevel) {
    const fullBody = ["Beine", "Brust", "Rücken", "Schultern", "Trizeps", "Bizeps"];
    return createWorkout(fitnesslevel, fullBody, "Male");
}

async function createFullBodyWorkoutFemale(fitnesslevel) {
    const fullBody = ["Po", "Quadrizeps", "Beinbeuger", "Core", "Rücken", "Rücken"];
    return createWorkout(fitnesslevel, fullBody, "Female");
}

async function createWorkout(fitnesslevel, muscleGroups, gender) {
    const trainingsplan = [];
    const hinzugefuegteUebungen = new Set(); // Doppelte Übungen vermeiden
    
    // Filtere und wähle Übungen aus
    muscleGroups.forEach(muskelgruppe => {
        const verfuegbareUebungen = shuffleArray(exercises.filter(exercise =>
            exercise.muscle_group.includes(muskelgruppe) &&
            exercise.difficulty <= fitnesslevel &&
            exercise.gender.includes(gender) && // Überprüfung auf Geschlecht
            !hinzugefuegteUebungen.has(exercise.name)
        ));
        
        if (verfuegbareUebungen.length > 0) {
            trainingsplan.push(verfuegbareUebungen[0].name[0]); // Name der Übung
            hinzugefuegteUebungen.add(verfuegbareUebungen[0].name);
        }
    });
    
    // Buttons erstellen
    const buttonContainer = document.createElement('div');
    buttonContainer.style.display = 'flex';
    buttonContainer.style.flexWrap = 'wrap';
    buttonContainer.style.gap = '5px';
    
    trainingsplan.slice(0, 6).forEach(exerciseName => { // Maximal 6 Buttons
        const button = document.createElement('button');
        button.innerText = exerciseName;
        button.classList.add('exercise-button'); // Optional für Styling

        // Event-Listener für das Öffnen des Modals hinzufügen
        button.addEventListener('click', () => {
            const imagePath = ("Images/Exercises/" + exerciseName + ".png").replace(/\s+/g, "_"); // Passe den Pfad an
            openImageModal(imagePath);
        });

        buttonContainer.appendChild(button);
    });

    return buttonContainer; // Rückgabe des Containers mit Buttons
}

async function createPushWorkout(fitnesslevel) {
    const push = ["Brust", "Brust", "Brust", "Schultern", "Schultern", "Schultern", "Trizeps", "Trizeps"];
    return createWorkout(fitnesslevel, push, "Male");
}

async function createPullWorkout(fitnesslevel) {
    const pull = ["Rücken", "Rücken", "Rücken", "Nacken", "Bizeps", "Bizeps"];
    return createWorkout(fitnesslevel, pull, "Male");
}

async function createLegsWorkout(fitnesslevel) {
    const legs = ["Beine", "Beine", "Quadrizeps", "Beinbeuger", "Waden", "Waden"];
    return createWorkout(fitnesslevel, legs, "Male");
}

async function createBackWorkout(fitnesslevel) {
    const back = ["Latissimus", "Oberer Trapezius", "Unterer Trapezius", "Unterer Rücken", "Rotatorenmanschette", "Teres Major"];
    return createWorkout(fitnesslevel, back, "Male");
}

async function createShoulderNeckWorkout(fitnesslevel) {
    const shoulderNeck = ["Vordere Schulter", "Vordere Schulter", "Seitliche Schulter", "Seitliche Schulter", "Hintere Schulter", "Hintere Schulter", "Nacken", "Nacken"];
    return createWorkout(fitnesslevel, shoulderNeck, "Male");
}

async function createArmWorkout(fitnesslevel) {
    const arms = ["Bizeps", "Bizeps", "Bizeps", "Bizeps", "Trizeps", "Trizeps", "Trizeps"];
    return createWorkout(fitnesslevel, arms, "Male");
}

async function createChestWorkout(fitnesslevel) {
    const chest = ["Mittlere Brust", "Mittlere Brust", "Obere Brust", "Obere Brust", "Untere Brust", "Innere Brust"];
    return createWorkout(fitnesslevel, chest, "Male");
}

async function createLowerWorkoutFemale(fitnesslevel) {
    const chest = ["Po", "Po", "Beinbeuger", "Quadrizeps", "Waden", "Core"];
    return createWorkout(fitnesslevel, chest, "Female");
}

async function createUpperWorkoutFemale(fitnesslevel) {
    const chest = ["Rücken", "Unterer Rücken", "Vordere Schulter", "Hintere Schulter", "Bizeps", "Core"];
    return createWorkout(fitnesslevel, chest, "Female");
}

async function createPoWorkoutFemale(fitnesslevel) {
    const chest = ["Po", "Po", "Po", "Po", "Po"];
    return createWorkout(fitnesslevel, chest, "Female");
}

function createRecoveryButton() {
    // Erstelle den Container
    const buttonContainer = document.createElement('div');
    buttonContainer.style.display = 'flex';
    buttonContainer.style.justifyContent = 'center';
    buttonContainer.style.alignItems = 'center';

    // Erstelle den Button
    const button = document.createElement('button');
    button.innerText = "Aktive Erholung";
    button.classList.add('exercise-button'); // Optional für Styling
    
    // Klick-Event-Listener
    button.addEventListener('click', () => {
        openImageModal('Images/rest_day_image.png');
    });
    
    buttonContainer.appendChild(button);

    return buttonContainer; // Rückgabe des Containers mit dem Button
}


async function displayPlan(){
    wochenplanContainer.style.display = "none";
    TitleTextContainer.style.display = "none";
    prevButton.style.display = "none";
    nextButton.style.display = "none";
    
    // Prüfen des Geschlechts des Users
    const genders = ["Male", "Female", "Diverse"];
    const userGenderIndex = results[0].findIndex(value => value === 1);
    const userGender = userGenderIndex !== -1 ? genders[userGenderIndex] : "";

    // Prüfen wie alt der User ist
    const userAge = results[1][0];

    // Prüfen wie viele Wochentage der User trainieren möchte
    var weekdays = 0;
    for(let i = 0; i < 7; i++){
        if (results[6][i] == 1){
            weekdays++;
        }
    }
    // Prüfen welches Trainingsziel (Muskelaufbau, Abnehmen, Reha)
    const trainingGoals = ["Muskelaufbau", "Abnehmen", "Reha"];
    const goalIndex = results[4].findIndex(value => value === 1);
    const trainingGoal = goalIndex !== -1 ? trainingGoals[goalIndex] : "";

    const showText = document.getElementById("TitleTextContainer");
    showText.innerHTML = "Basierend auf deinen Angaben wurde für dich folgender Trainingsplan erstellt";
    showText.style.display = "block";
    if(userGender == "Male"){
        if(userAge < 16) {
            showText.innerHTML = "Trainingspläne für Männer unter 16 Jahren sind bisher noch nicht verfügbar."
        }
        else if(userAge >= 60) {
            showText.innerHTML = "Trainingspläne für Senioren ab 60 Jahren sind bisher noch nicht verfügbar."
        }
        else if(16 >= userAge || userAge < 60 && weekdays == 4 && trainingGoal == "Muskelaufbau"){
            // Zeige 3-wöchige Tabelle
            triweeklyTableContainer.style.display = "block";
            var tabelle = document.getElementById("triweeklyID").getElementsByTagName("table")[0];
            var zeilen = tabelle.getElementsByTagName("tr");
            var zellenWocheEins = zeilen[1].getElementsByTagName("td");
            var zellenWocheZwei = zeilen[2].getElementsByTagName("td");
            var zellenWocheDrei = zeilen[3].getElementsByTagName("td");
            let counterForTrainingOrder = 1;
            for (var j = 0; j < zellenWocheEins.length; j++) {
                if(results[6][j] == 1){
                    if(counterForTrainingOrder == 1){
                        zellenWocheEins[j].appendChild(await createPushWorkout(3));
                        counterForTrainingOrder++;
                    } else if(counterForTrainingOrder == 2){
                        zellenWocheEins[j].appendChild(await createPullWorkout(3));
                        counterForTrainingOrder++;
                    } else if(counterForTrainingOrder == 3){
                        zellenWocheEins[j].appendChild(await createLegsWorkout(3));
                        counterForTrainingOrder++;
                    } else if(counterForTrainingOrder == 4){
                        zellenWocheEins[j].appendChild(await createPushWorkout(3));
                        counterForTrainingOrder++;
                    }
                }
            }
            counterForTrainingOrder = 1;
            for (var j = 0; j < zellenWocheZwei.length; j++) {
                if(results[6][j] == 1){
                    if(counterForTrainingOrder == 1){
                        zellenWocheZwei[j].appendChild(await createPullWorkout(3));
                        counterForTrainingOrder++;
                    } else if(counterForTrainingOrder == 2){
                        zellenWocheZwei[j].appendChild(await createLegsWorkout(3));
                        counterForTrainingOrder++;
                    } else if(counterForTrainingOrder == 3){
                        zellenWocheZwei[j].appendChild(await createPushWorkout(3));
                        counterForTrainingOrder++;
                    } else if(counterForTrainingOrder == 4){
                        zellenWocheZwei[j].appendChild(await createPullWorkout(3));
                        counterForTrainingOrder++;
                    }
                }
            }
            counterForTrainingOrder = 1;
            for (var j = 0; j < zellenWocheDrei.length; j++) {
                if(results[6][j] == 1){
                    if(counterForTrainingOrder == 1){
                        zellenWocheDrei[j].appendChild(await createLegsWorkout(3));
                        counterForTrainingOrder++;
                    } else if(counterForTrainingOrder == 2){
                        zellenWocheDrei[j].appendChild(await createPushWorkout(3));
                        counterForTrainingOrder++;
                    } else if(counterForTrainingOrder == 3){
                        zellenWocheDrei[j].appendChild(await createPullWorkout(3));
                        counterForTrainingOrder++;
                    } else if(counterForTrainingOrder == 4){
                        zellenWocheDrei[j].appendChild(await createLegsWorkout(3));
                        counterForTrainingOrder++;
                    }
                }
            }
        } 
        else if(16 >= userAge || userAge < 60 && weekdays != 4 && trainingGoal == "Muskelaufbau"){
            // Zeige 1-wöchige Tabelle
            weeklyTableContainer.style.display = "block";
            var tabelle = document.getElementById("weeklyID").getElementsByTagName("table")[0];
            var zeilen = tabelle.getElementsByTagName("tr");
            var zellen = zeilen[1].getElementsByTagName("td");
            let counterForTrainingOrder = 1;
            for (var j = 0; j < zellen.length; j++) {
                if(results[6][j] == 1){
                    if (weekdays == 1){
                        // Ganzkörper
                        zellen[j].appendChild(await createFullBodyWorkout(3));
                    } else if(weekdays == 2){
                        // Ganzkörper
                        zellen[j].appendChild(await createFullBodyWorkout(3));
                    } else if(weekdays == 3){
                        // Push, Pull, Legs
                        if(counterForTrainingOrder == 1){
                            zellen[j].appendChild(await createPushWorkout(3));
                            counterForTrainingOrder++;
                        } else if(counterForTrainingOrder == 2){
                            zellen[j].appendChild(await createPullWorkout(3));
                            counterForTrainingOrder++;
                        } else if(counterForTrainingOrder == 3){
                            zellen[j].appendChild(await createLegsWorkout(3));
                            counterForTrainingOrder++;
                        }
                    } else if(weekdays == 5){
                        // Push, Pull, Legs, Push, Pull, Legs (Bro Split)
                        if(counterForTrainingOrder == 1){
                            // zellen[j].innerText = await createChestWorkout(3);
                            zellen[j].appendChild(await createChestWorkout(3));
                            counterForTrainingOrder++;
                        } else if(counterForTrainingOrder == 2){
                            zellen[j].appendChild(await createLegsWorkout(3));
                            counterForTrainingOrder++;
                        }else if(counterForTrainingOrder == 3){
                            // zellen[j].innerText = await createBackWorkout(3);
                            zellen[j].appendChild(await createBackWorkout(3));
                            counterForTrainingOrder++;
                        } else if(counterForTrainingOrder == 4){
                            // zellen[j].innerText = await createShoulderNeckWorkout(3);
                            zellen[j].appendChild(await createShoulderNeckWorkout(3));
                            counterForTrainingOrder++;
                        } else if(counterForTrainingOrder == 5){
                            // zellen[j].innerText = await createArmWorkout(3);
                            zellen[j].appendChild(await createShoulderNeckWorkout(3));
                            counterForTrainingOrder++;
                        }
                    } else if(weekdays == 6){
                        // Push, Pull, Legs, Push, Pull, Legs
                        if(counterForTrainingOrder == 1 || counterForTrainingOrder == 4){
                            zellen[j].appendChild(await createPushWorkout(3));
                            counterForTrainingOrder++;
                        } else if(counterForTrainingOrder == 2 || counterForTrainingOrder == 5){
                            zellen[j].appendChild(await createPullWorkout(3));
                            counterForTrainingOrder++;
                        }else if(counterForTrainingOrder == 3 || counterForTrainingOrder == 6){
                            zellen[j].appendChild(await createLegsWorkout(3));
                            counterForTrainingOrder++;
                        }
                    } else if(weekdays == 7){
                        // Push, Pull, Legs, Recovery, Push, Pull, Legs
                        if(counterForTrainingOrder == 1){
                            zellen[j].appendChild(await createPushWorkout(3));
                            counterForTrainingOrder++;
                        } else if(counterForTrainingOrder == 2){
                            zellen[j].appendChild(await createPullWorkout(3));
                            counterForTrainingOrder++;
                        } else if(counterForTrainingOrder == 3){
                            zellen[j].appendChild(await createLegsWorkout(3));
                            counterForTrainingOrder++;
                        } else if(counterForTrainingOrder == 4){
                            zellen[j].appendChild(await createPushWorkout(3));
                            counterForTrainingOrder++;
                        } else if(counterForTrainingOrder == 5){
                            zellen[j].appendChild(await createPullWorkout(3));
                            counterForTrainingOrder++;
                        } else if(counterForTrainingOrder == 6){
                            zellen[j].appendChild(await createLegsWorkout(3));
                            counterForTrainingOrder++;
                        } else if(counterForTrainingOrder == 7){
                            zellen[j].appendChild(await createRecoveryButton());
                            counterForTrainingOrder++;
                        }
                    }
                }
            }
        }
        else if(trainingGoal == "Abnehmen"){
            showText.innerHTML = "Trainingspläne für Männder mit dem Ziel abzunehmen sind bisher noch nicht verfügbar."
        }
        else if(trainingGoal == "Reha"){
            showText.innerHTML = "Trainingspläne für Männer mit dem Ziel Rehabilitation sind bisher noch nicht verfügbar."
        }
    } else if(userGender == "Female"){
        if(userAge < 16) {
            showText.innerHTML = "Trainingspläne für Frauen unter 16 Jahren sind bisher noch nicht verfügbar."
        }
        else if(userAge >= 60) {
            showText.innerHTML = "Trainingspläne für Seniorinnen ab 60 Jahren sind bisher noch nicht verfügbar."
        }
        else if(16 >= userAge || userAge < 60 && trainingGoal == "Muskelaufbau"){
            // Zeige 1-wöchige Tabelle
            weeklyTableContainer.style.display = "block";
            var tabelle = document.getElementById("weeklyID").getElementsByTagName("table")[0];
            var zeilen = tabelle.getElementsByTagName("tr");
            var zellen = zeilen[1].getElementsByTagName("td");
            let counterForTrainingOrder = 1;
            for (var j = 0; j < zellen.length; j++) {
                if(results[6][j] == 1){
                    if (weekdays == 1){
                        // Ganzkörper
                        zellen[j].appendChild(await createFullBodyWorkoutFemale(3));
                    } else if(weekdays == 2){
                        // Upper-/Lower-Split
                        if(counterForTrainingOrder == 1){
                            zellen[j].appendChild(await createUpperWorkoutFemale(3));
                            counterForTrainingOrder++;
                        } else if (counterForTrainingOrder == 2){
                            zellen[j].appendChild(await createLowerWorkoutFemale(3));
                            counterForTrainingOrder++;
                        }
                    } else if(weekdays == 3){
                        // Unterkörpter (Po-Fokus), Oberkörper, Unterkörper (Beine Fokus)
                        if(counterForTrainingOrder == 1){
                            zellen[j].appendChild(await createPoWorkoutFemale(3));
                            counterForTrainingOrder++;
                        } else if(counterForTrainingOrder == 2){
                            zellen[j].appendChild(await createUpperWorkoutFemale(3));
                            counterForTrainingOrder++;
                        } else if(counterForTrainingOrder == 3){
                            zellen[j].appendChild(await createLegsWorkout(3));
                            counterForTrainingOrder++;
                        } 
                    } else if(weekdays == 4){
                        // Unterkörper (Glute- und Quadrizeps-Fokus), Oberkörper (Kraft und Haltung), Unterkörper (Beinbizeps- und Waden-Fokus), Oberkörper (Schulter- und Arm-Fokus)
                        console.log("Entered?");
                        if(counterForTrainingOrder == 1){
                            zellen[j].appendChild(await createPoWorkoutFemale(3));
                            counterForTrainingOrder++;
                        } else if(counterForTrainingOrder == 2){
                            zellen[j].appendChild(await createUpperWorkoutFemale(3));
                            counterForTrainingOrder++;
                        } else if(counterForTrainingOrder == 3){
                            zellen[j].appendChild(await createLowerWorkoutFemale(3));
                            counterForTrainingOrder++;
                        } else if(counterForTrainingOrder == 4){
                            zellen[j].appendChild(await createUpperWorkoutFemale(3));
                            counterForTrainingOrder++;
                        } 
                    } else if(weekdays == 5){
                        if(counterForTrainingOrder == 1){
                            // zellen[j].innerText = await createChestWorkout(3);
                            zellen[j].appendChild(await createPoWorkoutFemale(3));
                            counterForTrainingOrder++;
                        } else if(counterForTrainingOrder == 2){
                            zellen[j].appendChild(await createUpperWorkoutFemale(3));
                            counterForTrainingOrder++;
                        }else if(counterForTrainingOrder == 3){
                            // zellen[j].innerText = await createBackWorkout(3);
                            zellen[j].appendChild(await createLegsWorkout(3));
                            counterForTrainingOrder++;
                        } else if(counterForTrainingOrder == 4){
                            // zellen[j].innerText = await createShoulderNeckWorkout(3);
                            zellen[j].appendChild(await createUpperWorkoutFemale(3));
                            counterForTrainingOrder++;
                        } else if(counterForTrainingOrder == 5){
                            // zellen[j].innerText = await createArmWorkout(3);
                            zellen[j].appendChild(await createLowerWorkoutFemale(3));
                            counterForTrainingOrder++;
                        }
                    } else if(weekdays == 6){
                        // Push, Pull, Legs, Push, Pull, Legs
                        if(counterForTrainingOrder == 1 || counterForTrainingOrder == 5){
                            zellen[j].appendChild(await createPoWorkoutFemale(3));
                            counterForTrainingOrder++;
                        } else if(counterForTrainingOrder == 2 || counterForTrainingOrder == 4){
                            zellen[j].appendChild(await createPullWorkout(3));
                            counterForTrainingOrder++;
                        }else if(counterForTrainingOrder == 3 || counterForTrainingOrder == 6){
                            zellen[j].appendChild(await createLegsWorkout(3));
                            counterForTrainingOrder++;
                        }
                    } else if(weekdays == 7){
                        // Push, Pull, Legs, Recovery, Push, Pull, Legs
                        if(counterForTrainingOrder == 1){
                            zellen[j].appendChild(await createPoWorkoutFemale(3));
                            counterForTrainingOrder++;
                        } else if(counterForTrainingOrder == 2){
                            zellen[j].appendChild(await createUpperWorkoutFemale(3));
                            counterForTrainingOrder++;
                        } else if(counterForTrainingOrder == 3){
                            zellen[j].appendChild(await createLegsWorkout(3));
                            counterForTrainingOrder++;
                        } else if(counterForTrainingOrder == 4){
                            zellen[j].appendChild(await createLegsWorkout(3));
                            counterForTrainingOrder++;
                        } else if(counterForTrainingOrder == 5){
                            zellen[j].appendChild(await createUpperWorkoutFemale(3));
                            counterForTrainingOrder++;
                        } else if(counterForTrainingOrder == 6){
                            zellen[j].appendChild(await createLowerWorkoutFemale(3));
                            counterForTrainingOrder++;
                        } else if(counterForTrainingOrder == 7){
                            zellen[j].appendChild(await createRecoveryButton());
                            counterForTrainingOrder++;
                        }
                    }
                }
            }
        }
        else if(trainingGoal == "Abnehmen"){
            showText.innerHTML = "Trainingspläne für Frauen mit dem Ziel abzunehmen sind bisher noch nicht verfügbar."
        }
        else if(trainingGoal == "Reha"){
            showText.innerHTML = "Trainingspläne für Frauen mit dem Ziel Rehabilitation sind bisher noch nicht verfügbar."
        }
    } else{
        showText.innerHTML = "Trainingspläne für Diverse Personen sind bisher noch nicht verfügbar."
    }



    
}

