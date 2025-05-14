import introJs from 'intro.js';
import 'intro.js/minified/introjs.min.css';

export function startPlannerTour() {
  introJs().setOptions({
    steps: [
      { intro: "👋 Welcome to your Study Planner!" },
      {
        element: '.study-planner',
        intro: "Enter your study project, select pace and start - and end date. Then click 'Calculate Study Plan' to generate study hours!."
      },
      {
        element: '.study-and-file-selector-container',
        intro: " Optional, find you school, select program & year. This will help you to find the right courses for your study plan."
      },
      {
        element: '.save-button',
        intro: "Click here to save your study plan after generating it."
      },
      {
        element: '.week-controls',
        intro: "Use these to navigate between weeks in your schedule."
      }
    ],
    showProgress: true,
    showBullets: false,
    exitOnOverlayClick: true,
    doneLabel: 'Got it!',
    nextLabel: 'Next →',
    prevLabel: '← Back'
  }).start();
}