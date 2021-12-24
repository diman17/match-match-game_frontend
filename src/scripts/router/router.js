import { AboutGamePageComponent } from '../components/about-game-page-component';
import { render } from '../utils/render';

const routes = {
  ABOUT_GAME: {
    path: '#about-game',
    component: new AboutGamePageComponent(),
  },
  BEST_SCORE: {
    path: '#best-score',
    component: {},
  },
  GAME_SETTINGS: {
    path: '#game-settings',
    component: {},
  },
};

export class Router {
  constructor() {
    this.routes = routes;
    this.pageLinkElements = [];

    this._handleHashChange = this._handleHashChange.bind(this);
  }

  init() {
    this._renderRoute();
    this._hashChangeHandler(this._handleHashChange);
  }

  _renderRoute() {
    const path = window.location.hash;
    this._defineActivePageLink(path, this.pageLinkElements);
    const component = this._findComponentByPath(path, this.routes);
    render(document.body, component);
  }

  _findComponentByPath(path, routesList) {
    if (!path) {
      return routesList.ABOUT_GAME.component;
    }

    return Object.values(routesList).find((route) => route.path === path).component;
  }

  _defineActivePageLink(path, pagelinks) {
    pagelinks.forEach((pageLink) => {
      if (!path) {
        pagelinks.forEach((link) => {
          link.classList.remove('page-navigation__link--active');
          if (link.getAttribute('href') === this.routes.ABOUT_GAME.path) {
            link.classList.add('page-navigation__link--active');
          }
        });
      }

      if (path === pageLink.getAttribute('href')) {
        pagelinks.forEach((link) => link.classList.remove('page-navigation__link--active'));
        pageLink.classList.add('page-navigation__link--active');
      }
    });
  }

  _handleHashChange() {
    this._renderRoute();

    const path = window.location.hash;
    this._defineActivePageLink(path, this.pageLinkElements);
  }

  _hashChangeHandler(handler) {
    window.addEventListener('hashchange', handler);
  }
}
