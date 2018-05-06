# Lima :cat2:
- Lima is my (class-based) rewrite of React (at least it's basic API)
  - React's implementation notes served as a guide: https://reactjs.org/docs/implementation-notes.html
  - I wrote this as an attempt to better understand what goes on under the hood.
  - ...and named it after my foster cat

# Files
- example application using Lima in /example/src
- rewrite lives in /src

# Install
- to run example app, run `cd example; npm install; npm start`
- to play around with Lima in your project, run `npm install lima-react --save`
- see example app for build requirements (webpack / babel / jsx transpile, etc)

# Features
- Lima's API is slightly different from React:
  - You can only write class components that extend the Lima.Component base class (for simplicity)
  - Lima requires you to "initialize" your components before RenderDOM is invoked
  For each component, you have to pass a self reference to super in the constructor (to keep track of instances internally as the jsx transpiler loses track of the class references)
  - Lima can't handle self-closing tags on native elements, like input etc. so make sure you explicitly close these tags, ie... <input></input>

# Other & WIP
- If I find the time, include an implementation of react-router and redux
- However, that would require a context api which is another todo
