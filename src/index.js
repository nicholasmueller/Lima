// Lima API (class based)
import Component from './component';
import createElement from './createElement';
import renderDOM from './render';
import { initialize } from './helpers';

// Limux API
import { createStore, LimuxStore } from './limux';

// Router API
// import { Route } from './router';

// API export
export const Lima = {
  Component,
  createElement,
  renderDOM,
  initialize,
  createStore,
  LimuxStore,
  // Route
}
