// NusaStat router: a hash-routed single-page portal. Each route renders one view from views.js
// into the shell, marks the matching nav link, and wires that page's controls. Unknown routes
// fall back to the overview so no link on the site is ever dead.

import { homeView, economyView, peopleView, provincesView, wellbeingView, wireProvincesPage } from './views.js';

const routes = {
  '/': { render: homeView, wire: null },
  '/economy': { render: economyView, wire: null },
  '/people': { render: peopleView, wire: null },
  '/provinces': { render: provincesView, wire: wireProvincesPage },
  '/wellbeing': { render: wellbeingView, wire: null },
};

function currentRoute() {
  const hash = window.location.hash.replace(/^#/, '');
  return routes[hash] ? hash : '/';
}

function renderRoute() {
  const route = routes[currentRoute()];
  const app = document.getElementById('app');
  app.innerHTML = route.render();
  document.querySelectorAll('.site-nav a').forEach((link) => {
    link.classList.toggle('is-active', link.dataset.route === currentRoute());
  });
  if (route.wire) route.wire();
  window.scrollTo(0, 0);
}

window.addEventListener('hashchange', renderRoute);
renderRoute();
