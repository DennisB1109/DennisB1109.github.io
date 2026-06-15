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
  { name: "Rumänisches Kreuzheben",      sets: 4, reps: "8-10",  location: ["gym"],               level: ["erfahren","profi"],  muscle: "hamstrings",avoidIfInjury: ["back","hip"] },
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
// 5. RENDERING — Tabelle & Modal
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
 * Wandelt den Übungsnamen in einen Dateinamen um.
 * Leerzeichen → Unterstriche, Sonderzeichen entfernt.
 * Beispiel: "Bankdrücken" → "Bankdrücken.png"
 * (Dateinamen müssen exakt so heißen wie der Übungsname)
 * @param {string} name
 * @returns {string} Pfad zur Bilddatei
 */
function exerciseImagePath(name) {
  return `Images/Exercises/${name}.png`;
}

/**
 * Rendert eine einzelne Übung als anklickbaren Button.
 * Klick öffnet das Bild-Modal.
 * @param {object} ex
 * @returns {string} HTML-String
 */
function renderExercise(ex) {
  // data-Attribut für den Modal-Handler
  return `
    <button
      class="exercise-entry"
      onclick="TrainingModel.openModal('${ex.name.replace(/'/g, "\\'")}')"
      title="${ex.name} ansehen"
    >
      <span class="exercise-name">${ex.name}</span>
      <span class="exercise-meta">${ex.sets}×${ex.reps}</span>
    </button>`;
}

/**
 * Rendert den fertigen Plan in die Ergebnis-Tabelle im DOM.
 * @param {object} plan - Ausgabe von generatePlan()
 */
function renderPlan(plan) {
  const wrapper = document.getElementById('result-weekly');
  if (!wrapper) return;

  const ALL_DAYS = ["monday","tuesday","wednesday","thursday","friday","saturday","sunday"];

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

  injectResultStyles();
  initModal();
}


// ============================================================
// 6. BILD-MODAL
// ============================================================

/**
 * Erstellt das Modal einmalig im DOM (falls noch nicht vorhanden).
 */
function initModal() {
  if (document.getElementById('exercise-modal')) return;

  const modal = document.createElement('div');
  modal.id = 'exercise-modal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-label', 'Übungsvorschau');
  modal.innerHTML = `
    <div class="modal-backdrop" onclick="TrainingModel.closeModal()"></div>
    <div class="modal-card">
      <button class="modal-close" onclick="TrainingModel.closeModal()" aria-label="Schließen">✕</button>
      <h3 class="modal-title" id="modal-title"></h3>
      <div class="modal-image-wrapper">
        <img id="modal-img" src="" alt="" />
        <p class="modal-missing" id="modal-missing" style="display:none">
          Kein Bild vorhanden
        </p>
      </div>
      <p class="modal-meta" id="modal-meta"></p>
    </div>
  `;
  document.body.appendChild(modal);

  // Escape-Taste schließt Modal
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });
}

/**
 * Öffnet das Modal für eine bestimmte Übung.
 * Wird direkt aus dem onclick-Attribut aufgerufen.
 * @param {string} exerciseName
 */
function openModal(exerciseName) {
  const modal = document.getElementById('exercise-modal');
  if (!modal) return;

  // Übung aus DB suchen
  const ex = EXERCISE_DB.find(e => e.name === exerciseName);

  // Titel & Meta befüllen
  document.getElementById('modal-title').textContent = exerciseName;
  document.getElementById('modal-meta').textContent = ex
    ? `${ex.sets} Sätze × ${ex.reps} Wiederholungen`
    : '';

  // Bild laden
  const img     = document.getElementById('modal-img');
  const missing = document.getElementById('modal-missing');
  const path    = exerciseImagePath(exerciseName);

  img.style.display = 'none';
  missing.style.display = 'none';

  img.onload  = () => { img.style.display = 'block'; };
  img.onerror = () => { missing.style.display = 'block'; };
  img.src = path;
  img.alt = exerciseName;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden'; // Scrollen sperren
}

/**
 * Schließt das Modal.
 */
function closeModal() {
  const modal = document.getElementById('exercise-modal');
  if (modal) modal.classList.remove('open');
  document.body.style.overflow = '';
}


// ============================================================
// 7. STYLES (Tabelle + Modal)
// ============================================================

function injectResultStyles() {
  if (document.getElementById('model-styles')) return;

  const style = document.createElement('style');
  style.id = 'model-styles';
  style.textContent = `
    /* ── Übungs-Einträge (jetzt Buttons) ── */
    .exercise-entry {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 8px;
      padding: 8px 10px;
      width: 100%;
      border: none;
      border-bottom: 1px solid var(--border);
      background: transparent;
      cursor: pointer;
      border-radius: 6px;
      text-align: left;
      transition: background 0.15s ease;
    }
    .exercise-entry:last-child {
      border-bottom: none;
    }
    .exercise-entry:hover {
      background: var(--bg);
    }
    .exercise-entry:hover .exercise-name {
      color: var(--accent);
    }
    .exercise-name {
      font-family: var(--font-body);
      font-size: 0.85rem;
      color: var(--text-primary);
      transition: color 0.15s ease;
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

    /* ── Modal ── */
    #exercise-modal {
      display: none;
      position: fixed;
      inset: 0;
      z-index: 500;
      align-items: center;
      justify-content: center;
    }
    #exercise-modal.open {
      display: flex;
    }
    .modal-backdrop {
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.55);
      backdrop-filter: blur(4px);
    }
    .modal-card {
      position: relative;
      z-index: 1;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 20px;
      padding: 32px 28px 28px;
      width: min(420px, 90vw);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
      animation: modal-in 0.2s ease;
    }
    @keyframes modal-in {
      from { opacity: 0; transform: scale(0.95) translateY(8px); }
      to   { opacity: 1; transform: scale(1) translateY(0); }
    }
    .modal-close {
      position: absolute;
      top: 14px;
      right: 16px;
      background: var(--bg);
      border: 1px solid var(--border);
      border-radius: 50%;
      width: 32px;
      height: 32px;
      font-size: 0.8rem;
      cursor: pointer;
      color: var(--text-secondary);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.15s;
    }
    .modal-close:hover {
      background: var(--border);
    }
    .modal-title {
      font-family: var(--font-display);
      font-size: 1.2rem;
      font-weight: 700;
      color: var(--text-primary);
      text-align: center;
      margin: 0;
    }
    .modal-image-wrapper {
      width: 100%;
      aspect-ratio: 4/3;
      border-radius: 12px;
      overflow: hidden;
      background: var(--bg);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    #modal-img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    .modal-missing {
      color: var(--text-secondary);
      font-size: 0.9rem;
    }
    .modal-meta {
      font-family: var(--font-display);
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--accent);
      margin: 0;
    }
  `;
  document.head.appendChild(style);
}


// ============================================================
// 8. GLOBALE REGISTRIERUNG
// Muss nach allen Funktionsdefinitionen stehen.
// ============================================================
window.TrainingModel = { generatePlan, renderPlan, openModal, closeModal };