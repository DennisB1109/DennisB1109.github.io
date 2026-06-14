/**
 * model.js — Trainingsplan-Logik
 *
 * Verantwortlich für:
 *  1. Übungsdatenbank (nach Muskelgruppe, Ort, Level)
 *  2. Generierung eines 7-Tage-Plans basierend auf Nutzereingaben
 *  3. Rendern des Plans in die Ergebnis-Tabelle
 */

// ============================================================
// 1. ÜBUNGSDATENBANK
// ============================================================

/**
 * Struktur jeder Übung:
 * {
 *   name: string,
 *   sets: number,
 *   reps: string,       // z.B. "8-12" oder "30 Sek"
 *   location: string[], // "gym" | "home" | "calipark"
 *   level: string[],    // "lauch" | "erfahren" | "profi"
 *   muscle: string,     // Muskelgruppe (für Split-Logik)
 *   avoidIfInjury: string[] // "knee" | "hip" | "shoulder" | "back"
 * }
 */
const EXERCISE_DB = [

  // ── BRUST ──────────────────────────────────────────────
  { name: "Bankdrücken",         sets: 4, reps: "8-10",  location: ["gym"],               level: ["erfahren","profi"],  muscle: "chest",    avoidIfInjury: ["shoulder"] },
  { name: "Kurzhantel-Flyes",    sets: 3, reps: "12-15", location: ["gym"],               level: ["erfahren","profi"],  muscle: "chest",    avoidIfInjury: ["shoulder"] },
  { name: "Schrägbank-Drücken",  sets: 4, reps: "8-10",  location: ["gym"],               level: ["profi"],             muscle: "chest",    avoidIfInjury: ["shoulder"] },
  { name: "Liegestütze",         sets: 3, reps: "10-15", location: ["gym","home","calipark"], level: ["lauch","erfahren"],  muscle: "chest", avoidIfInjury: ["shoulder"] },
  { name: "Enge Liegestütze",    sets: 3, reps: "10-12", location: ["gym","home","calipark"], level: ["erfahren","profi"],  muscle: "chest", avoidIfInjury: ["shoulder"] },

  // ── RÜCKEN ─────────────────────────────────────────────
  { name: "Klimmzüge",           sets: 4, reps: "6-10",  location: ["gym","calipark"],    level: ["erfahren","profi"],  muscle: "back",     avoidIfInjury: ["shoulder","back"] },
  { name: "Latzug",              sets: 4, reps: "10-12", location: ["gym"],               level: ["lauch","erfahren"],  muscle: "back",     avoidIfInjury: ["shoulder"] },
  { name: "Rudern mit Stange",   sets: 4, reps: "8-10",  location: ["gym"],               level: ["erfahren","profi"],  muscle: "back",     avoidIfInjury: ["back"] },
  { name: "KH-Rudern einarming", sets: 3, reps: "10-12", location: ["gym"],               level: ["lauch","erfahren"],  muscle: "back",     avoidIfInjury: ["back"] },
  { name: "Superman-Holds",      sets: 3, reps: "15 Sek",location: ["home"],              level: ["lauch"],             muscle: "back",     avoidIfInjury: [] },
  { name: "Hyperextensions",     sets: 3, reps: "12-15", location: ["gym"],               level: ["lauch","erfahren"],  muscle: "back",     avoidIfInjury: ["back"] },

  // ── SCHULTERN ──────────────────────────────────────────
  { name: "Schulterdrücken",     sets: 4, reps: "8-10",  location: ["gym"],               level: ["erfahren","profi"],  muscle: "shoulders",avoidIfInjury: ["shoulder"] },
  { name: "Seitheben",           sets: 3, reps: "12-15", location: ["gym"],               level: ["lauch","erfahren"],  muscle: "shoulders",avoidIfInjury: ["shoulder"] },
  { name: "Face Pulls",          sets: 3, reps: "15-20", location: ["gym"],               level: ["lauch","erfahren","profi"], muscle: "shoulders", avoidIfInjury: ["shoulder"] },
  { name: "Pike Push-Ups",       sets: 3, reps: "10-12", location: ["home","calipark"],   level: ["lauch","erfahren"],  muscle: "shoulders",avoidIfInjury: ["shoulder"] },

  // ── ARME (Bizeps) ──────────────────────────────────────
  { name: "Bizeps-Curls",        sets: 3, reps: "10-12", location: ["gym"],               level: ["lauch","erfahren"],  muscle: "biceps",   avoidIfInjury: [] },
  { name: "Hammer-Curls",        sets: 3, reps: "10-12", location: ["gym"],               level: ["lauch","erfahren"],  muscle: "biceps",   avoidIfInjury: [] },
  { name: "Chin-Ups",            sets: 4, reps: "6-8",   location: ["gym","calipark"],    level: ["erfahren","profi"],  muscle: "biceps",   avoidIfInjury: ["shoulder"] },

  // ── ARME (Trizeps) ─────────────────────────────────────
  { name: "Trizeps-Drücken",     sets: 3, reps: "12-15", location: ["gym"],               level: ["lauch","erfahren"],  muscle: "triceps",  avoidIfInjury: ["shoulder"] },
  { name: "Skull-Crushers",      sets: 3, reps: "10-12", location: ["gym"],               level: ["erfahren","profi"],  muscle: "triceps",  avoidIfInjury: ["shoulder"] },
  { name: "Dips",                sets: 3, reps: "8-12",  location: ["gym","calipark"],    level: ["erfahren","profi"],  muscle: "triceps",  avoidIfInjury: ["shoulder"] },
  { name: "Enges Liegestütz",    sets: 3, reps: "10-15", location: ["home"],              level: ["lauch"],             muscle: "triceps",  avoidIfInjury: [] },

  // ── BEINE (Quads) ──────────────────────────────────────
  { name: "Kniebeugen",          sets: 4, reps: "8-10",  location: ["gym"],               level: ["lauch","erfahren"],  muscle: "quads",    avoidIfInjury: ["knee","hip"] },
  { name: "Beinpresse",          sets: 4, reps: "10-12", location: ["gym"],               level: ["lauch","erfahren"],  muscle: "quads",    avoidIfInjury: ["knee","hip"] },
  { name: "Ausfallschritte",     sets: 3, reps: "10 je", location: ["gym","home"],        level: ["lauch","erfahren"],  muscle: "quads",    avoidIfInjury: ["knee","hip"] },
  { name: "Bulgarische KBS",     sets: 4, reps: "8-10",  location: ["gym"],               level: ["erfahren","profi"],  muscle: "quads",    avoidIfInjury: ["knee","hip"] },
  { name: "Bodyweight Squats",   sets: 3, reps: "15-20", location: ["home","calipark"],   level: ["lauch"],             muscle: "quads",    avoidIfInjury: ["knee"] },

  // ── BEINE (Hamstrings / Gesäß) ─────────────────────────
  { name: "Rumänisches KH",      sets: 4, reps: "8-10",  location: ["gym"],               level: ["erfahren","profi"],  muscle: "hamstrings",avoidIfInjury: ["back","hip"] },
  { name: "Beinbeuger-Maschine", sets: 3, reps: "12-15", location: ["gym"],               level: ["lauch","erfahren"],  muscle: "hamstrings",avoidIfInjury: ["knee"] },
  { name: "Hip Thrusts",         sets: 4, reps: "10-12", location: ["gym"],               level: ["lauch","erfahren"],  muscle: "hamstrings",avoidIfInjury: ["hip","back"] },
  { name: "Glute Bridges",       sets: 3, reps: "15-20", location: ["home"],              level: ["lauch"],             muscle: "hamstrings",avoidIfInjury: [] },

  // ── CORE / BAUCH ───────────────────────────────────────
  { name: "Plank",               sets: 3, reps: "30 Sek",location: ["gym","home","calipark"], level: ["lauch","erfahren","profi"], muscle: "core", avoidIfInjury: ["back"] },
  { name: "Crunches",            sets: 3, reps: "20",    location: ["gym","home"],        level: ["lauch"],             muscle: "core",     avoidIfInjury: ["back"] },
  { name: "Russian Twists",      sets: 3, reps: "20",    location: ["gym","home"],        level: ["lauch","erfahren"],  muscle: "core",     avoidIfInjury: ["back"] },
  { name: "Hängendes Knieheben", sets: 3, reps: "10-15", location: ["gym","calipark"],    level: ["erfahren","profi"],  muscle: "core",     avoidIfInjury: [] },
  { name: "Ab Wheel",            sets: 3, reps: "8-10",  location: ["gym","home"],        level: ["profi"],             muscle: "core",     avoidIfInjury: ["back"] },
];


// ============================================================
// 2. TRAININGSTAG-SPLIT-KONFIGURATION
// ============================================================

/**
 * Gibt die Muskelgruppen pro Tag zurück,
 * basierend auf der Anzahl der Trainingstage pro Woche.
 *
 * @param {number} trainingDaysCount
 * @returns {string[][]} Array von Muskelgruppen-Arrays je Tag
 */
function getSplitForDays(trainingDaysCount) {
  const SPLITS = {
    1: [["chest","back","shoulders","quads","hamstrings","biceps","triceps","core"]],
    2: [
      ["chest","triceps","shoulders"],
      ["back","biceps","quads","hamstrings","core"],
    ],
    3: [
      ["chest","triceps","shoulders"],
      ["back","biceps","core"],
      ["quads","hamstrings","core"],
    ],
    4: [
      ["chest","triceps"],
      ["back","biceps"],
      ["shoulders","core"],
      ["quads","hamstrings"],
    ],
    5: [
      ["chest","triceps"],
      ["back","biceps"],
      ["shoulders","core"],
      ["quads"],
      ["hamstrings","core"],
    ],
    6: [
      ["chest","triceps"],
      ["back","biceps"],
      ["shoulders"],
      ["quads"],
      ["hamstrings","core"],
      ["chest","back","core"],
    ],
    7: [
      ["chest","triceps"],
      ["back","biceps"],
      ["shoulders","core"],
      ["quads"],
      ["hamstrings"],
      ["chest","back"],
      ["core","shoulders"],
    ],
  };

  // Bei mehr als 7 Tagen: auf 7 begrenzen
  const key = Math.min(trainingDaysCount, 7);
  return SPLITS[key] || SPLITS[3];
}


// ============================================================
// 3. ÜBUNGSAUSWAHL
// ============================================================

/**
 * Filtert und wählt Übungen für eine Muskelgruppe aus.
 *
 * @param {string}   muscle    - Muskelgruppe
 * @param {string}   location  - "gym" | "home" | "calipark"
 * @param {string}   level     - "lauch" | "erfahren" | "profi"
 * @param {string[]} injuries  - Array mit Verletzungs-IDs
 * @param {number}   count     - Gewünschte Anzahl Übungen
 * @returns {object[]} Gefilterte Übungs-Objekte
 */
function selectExercises(muscle, location, level, injuries, count) {
  const candidates = EXERCISE_DB.filter(ex =>
    ex.muscle === muscle &&
    ex.location.includes(location) &&
    ex.level.includes(level) &&
    !ex.avoidIfInjury.some(inj => injuries.includes(inj))
  );

  // Fallback: Level-Filter lockern wenn zu wenig Übungen
  if (candidates.length === 0) {
    const fallback = EXERCISE_DB.filter(ex =>
      ex.muscle === muscle &&
      ex.location.includes(location) &&
      !ex.avoidIfInjury.some(inj => injuries.includes(inj))
    );
    return fallback.slice(0, count);
  }

  return candidates.slice(0, count);
}

/**
 * Generiert alle Übungen für einen Trainingstag.
 *
 * @param {string[]} muscles  - Muskelgruppen des Tages
 * @param {string}   location
 * @param {string}   level
 * @param {string[]} injuries
 * @returns {object[]} Liste aller Übungen für diesen Tag
 */
function buildDayWorkout(muscles, location, level, injuries) {
  // Übungen pro Muskelgruppe (weniger Muskeln = mehr Übungen je Gruppe)
  const exPerMuscle = muscles.length <= 2 ? 3 : muscles.length <= 4 ? 2 : 1;

  return muscles.flatMap(muscle =>
    selectExercises(muscle, location, level, injuries, exPerMuscle)
  );
}


// ============================================================
// 4. PLAN-GENERIERUNG
// ============================================================

/**
 * Erstellt den vollständigen 7-Tage-Trainingsplan.
 *
 * @param {object} userData - Nutzereingaben aus dem Fragebogen
 * @returns {object} Plan mit Trainingstagen als Keys (z.B. "monday")
 */
function generatePlan(userData) {
  const { location, level, injuries, schedule } = userData;

  // Trainingstage als geordnetes Array
  const ALL_DAYS = ["monday","tuesday","wednesday","thursday","friday","saturday","sunday"];
  const trainingDays = ALL_DAYS.filter(d => schedule.includes(d));
  const restDays     = ALL_DAYS.filter(d => !schedule.includes(d));

  // Split-Schema basierend auf Anzahl Trainingstage
  const split = getSplitForDays(trainingDays.length);

  // Plan aufbauen
  const plan = {};

  trainingDays.forEach((day, i) => {
    const muscles = split[i % split.length];
    plan[day] = {
      type: "training",
      muscles,
      exercises: buildDayWorkout(muscles, location, level, injuries),
    };
  });

  restDays.forEach(day => {
    plan[day] = { type: "rest", exercises: [] };
  });

  return plan;
}


// ============================================================
// 5. GLOBALE REGISTRIERUNG
// Macht generatePlan & renderPlan für main.js (klassisches Script) zugänglich.
// ============================================================
window.TrainingModel = { generatePlan, renderPlan };


// ============================================================
// 7. TABELLEN-RENDERING
// ============================================================

const DAY_LABELS = {
  monday:    "Montag",
  tuesday:   "Dienstag",
  wednesday: "Mittwoch",
  thursday:  "Donnerstag",
  friday:    "Freitag",
  saturday:  "Samstag",
  sunday:    "Sonntag",
};

/**
 * Formatiert eine einzelne Übung als HTML-String.
 * @param {object} ex
 * @returns {string}
 */
function renderExercise(ex) {
  return `
    <div class="exercise-entry">
      <span class="exercise-name">${ex.name}</span>
      <span class="exercise-meta">${ex.sets}×${ex.reps}</span>
    </div>`;
}

/**
 * Rendert den fertigen Plan in die Ergebnis-Tabelle im DOM.
 * @param {object} plan - Ausgabe von generatePlan()
 */
function renderPlan(plan) {
  const wrapper = document.getElementById('result-weekly');
  if (!wrapper) return;

  const ALL_DAYS = ["monday","tuesday","wednesday","thursday","friday","saturday","sunday"];

  // Tabellen-HTML bauen
  const headerCells = ALL_DAYS
    .map(d => `<th>${DAY_LABELS[d]}</th>`)
    .join('');

  const bodyCells = ALL_DAYS.map(day => {
    const dayData = plan[day];
    if (!dayData || dayData.type === "rest") {
      return `<td class="rest-day">Ruhetag 🛋️</td>`;
    }
    const exerciseHTML = dayData.exercises.length > 0
      ? dayData.exercises.map(renderExercise).join('')
      : '<span class="no-exercises">Keine Übungen verfügbar</span>';
    return `<td>${exerciseHTML}</td>`;
  }).join('');

  wrapper.innerHTML = `
    <table class="result-table">
      <thead><tr>${headerCells}</tr></thead>
      <tbody><tr>${bodyCells}</tr></tbody>
    </table>`;

  wrapper.style.display = 'block';
  wrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });

  // Inline-Styles für neue Elemente (keine extra CSS-Klassen nötig)
  injectResultStyles();
}


// ============================================================
// 8. HILFSSTILE FÜR ERGEBNISDARSTELLUNG
// ============================================================

function injectResultStyles() {
  if (document.getElementById('model-styles')) return;

  const style = document.createElement('style');
  style.id = 'model-styles';
  style.textContent = `
    .exercise-entry {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      gap: 8px;
      padding: 6px 0;
      border-bottom: 1px solid var(--border);
    }
    .exercise-entry:last-child {
      border-bottom: none;
    }
    .exercise-name {
      font-family: var(--font-body);
      font-size: 0.85rem;
      color: var(--text-primary);
    }
    .exercise-meta {
      font-family: var(--font-display);
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--accent);
      white-space: nowrap;
    }
    .rest-day {
      text-align: center;
      color: var(--text-secondary);
      font-size: 0.85rem;
      vertical-align: middle;
    }
    .no-exercises {
      color: var(--text-secondary);
      font-size: 0.8rem;
      font-style: italic;
    }
  `;
  document.head.appendChild(style);
}