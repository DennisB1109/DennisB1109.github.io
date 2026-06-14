/**
 * main.js — Trainingsplan Generator
 *
 * Architektur: Namespace-Modul (App)
 * Alle UI-Interaktionen laufen über das `App`-Objekt,
 * um globale Namenskonflikte zu vermeiden.
 *
 * Abhängigkeit: model.js (wird als ES-Modul geladen)
 * Da main.js als klassisches Script eingebunden ist, kommuniziert
 * es mit model.js über window.TrainingModel (siehe unten).
 */

const App = (() => {

  // ============================================================
  // KONFIGURATION
  // ============================================================

  /** Geordnete Liste aller Frage-Schritte (IDs der Sektionen) */
  const STEPS = [
    'step-intro',
    'step-gender',
    'step-age',
    'step-fitness',
    'step-injuries',
    'step-goals',
    'step-schedule',
  ];

  /** Gesamtanzahl der Frage-Schritte (ohne Intro) */
  const TOTAL_QUESTION_STEPS = STEPS.length - 1;


  // ============================================================
  // STATE
  // ============================================================

  const state = {
    currentStep: 0,   // Index in STEPS[]
  };


  // ============================================================
  // DOM-REFERENZEN (einmalig cachen)
  // ============================================================

  const DOM = {
    progressWrapper: document.getElementById('progress-bar-wrapper'),
    progressBar:     document.getElementById('progress-bar'),
    navFooter:       document.getElementById('nav-footer'),
    btnPrev:         document.getElementById('btn-prev'),
    btnNext:         document.getElementById('btn-next'),
    toggle:          document.getElementById('toggle'),
    body:            document.body,
  };


  // ============================================================
  // SCHRITT-NAVIGATION
  // ============================================================

  /**
   * Zeigt einen Schritt an, versteckt alle anderen.
   * @param {number} index - Index in STEPS[]
   */
  function showStep(index) {
    // Alle Sektionen ausblenden
    STEPS.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.remove('visible');
    });

    // Ziel-Sektion einblenden
    const target = document.getElementById(STEPS[index]);
    if (target) target.classList.add('visible');

    state.currentStep = index;
    updateUI();
  }

  /**
   * Aktualisiert Progress-Bar und Nav-Buttons je nach aktuellem Schritt.
   */
  function updateUI() {
    const isIntro          = state.currentStep === 0;
    const isLastStep       = state.currentStep === STEPS.length - 1;
    const questionProgress = state.currentStep; // 0 wenn Intro

    // Progress-Bar
    DOM.progressWrapper.style.display = isIntro ? 'none' : 'block';
    DOM.progressBar.style.width = `${(questionProgress / TOTAL_QUESTION_STEPS) * 100}%`;

    // Nav-Footer
    DOM.navFooter.style.display = isIntro ? 'none' : 'flex';
    DOM.btnPrev.style.visibility = state.currentStep <= 1 ? 'hidden' : 'visible';
    DOM.btnNext.textContent = isLastStep ? 'Fertig ✓' : 'Weiter →';
  }

  /** Startet den Fragebogen (von Intro zu Schritt 1) */
  function startQuestions() {
    showStep(1);
  }

  /** Geht einen Schritt zurück */
  function showPrev() {
    if (state.currentStep > 1) {
      showStep(state.currentStep - 1);
    }
  }

  /** Geht einen Schritt vor oder beendet den Fragebogen */
  function showNext() {
    if (state.currentStep < STEPS.length - 1) {
      showStep(state.currentStep + 1);
    } else {
      finishQuestionnaire();
    }
  }


  // ============================================================
  // SLIDER
  // ============================================================

  /**
   * Aktualisiert die angezeigte Alterszahl beim Bewegen des Sliders.
   * @param {HTMLInputElement} sliderEl
   */
  function updateSlider(sliderEl) {
    const display = document.getElementById('age-display');
    if (display) display.textContent = sliderEl.value;
  }


  // ============================================================
  // DARK MODE TOGGLE
  // ============================================================

  function initDarkModeToggle() {
    DOM.toggle.addEventListener('click', () => {
      DOM.body.classList.toggle('dark');
      DOM.toggle.classList.toggle('active');
    });
  }


  // ============================================================
  // ABSCHLUSS
  // ============================================================

  /**
   * Sammelt alle Nutzer-Eingaben und übergibt sie an model.js.
   * Zeigt anschließend die Ergebnis-Tabellen an.
   */
  function finishQuestionnaire() {
    const data = collectFormData();
    console.log('[App] Fragebogen abgeschlossen:', data);

    // Hauptkarte und Navigation ausblenden
    document.getElementById('main-card').style.display = 'none';
    DOM.navFooter.style.display = 'none';
    DOM.progressWrapper.style.display = 'none';

    // Trainingsplan generieren und rendern (via model.js)
    // model.js registriert sich als window.TrainingModel sobald es geladen ist
    if (window.TrainingModel) {
      const plan = window.TrainingModel.generatePlan(data);
      window.TrainingModel.renderPlan(plan);
    } else {
      console.error('[App] model.js nicht geladen – window.TrainingModel fehlt');
    }
  }

  /**
   * Liest alle Formular-Inputs aus und gibt ein strukturiertes Objekt zurück.
   * @returns {object} Nutzerdaten
   */
  function collectFormData() {
    return {
      gender:     getCheckedRadio('gender'),
      age:        document.getElementById('age-slider')?.value,
      fitnessLevel: getCheckedRadio('fitnessLevel'),
      injuries:   getCheckedCheckboxes('injuries'),
      goals:      getCheckedCheckboxes('goals'),
      location:   getCheckedRadio('location'),
      schedule:   getCheckedCheckboxes('schedule'),
    };
  }

  /**
   * Gibt den Wert des ausgewählten Radio-Inputs zurück.
   * @param {string} name - name-Attribut der Radio-Gruppe
   * @returns {string|null}
   */
  function getCheckedRadio(name) {
    const el = document.querySelector(`input[name="${name}"]:checked`);
    return el ? el.value : null;
  }

  /**
   * Gibt die Werte aller ausgewählten Checkboxen einer Gruppe zurück.
   * @param {string} name - name-Attribut der Checkbox-Gruppe
   * @returns {string[]}
   */
  function getCheckedCheckboxes(name) {
    return [...document.querySelectorAll(`input[name="${name}"]:checked`)]
      .map(el => el.value);
  }


  // ============================================================
  // INITIALISIERUNG
  // ============================================================

  function init() {
    initDarkModeToggle();
    showStep(0); // Startbildschirm anzeigen
  }

  // Bei DOM-Bereitschaft initialisieren
  document.addEventListener('DOMContentLoaded', init);


  // ============================================================
  // PUBLIC API
  // ============================================================
  return {
    startQuestions,
    showPrev,
    showNext,
    updateSlider,
  };

})();