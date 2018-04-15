# Motivation :cat2:
- Lima is my rewrite of React, in it's simplest form
- I used React's own implementation notes as a guide: https://reactjs.org/docs/implementation-notes.html; however, most of the core features are unique to Lima.

- I wrote this as an attempt to better understand what goes on under the hood in React.
- ...and named it after my foster cat

# Files
- example application using Lima in /example/src
- the rewrite lives in /src

# Install
- Lima written and published to npm in es6
- to run example app, run `cd example; npm install; npm start`
- to play around with Lima in your project, run `npm install lima-react --save`
- see example app for build requirements (webpack / babel / jsx transpile, etc)

# Features & API
- Lima's API is slightly different from React (born out of my own incremental implementation):
  - You can only write class components - that extend the Lima.Component base class (functional components intentionally left out to simplify the code)
  - Lima requires you to "initialize" your components before RenderDOM is invoked. Also for each component, you have to pass a self reference to super in the constructor (this is done so I can keep track of instances internally as the jsx transpiler loses track of class references as they are transformed to strings... so I store the references to a static array on the Component base class.)

# Roadmap & Goals
- 'Bake-in' a react-router rewrite
- 'Bake-in' a redux rewrite
