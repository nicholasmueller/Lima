// (() => {
//   function createElement(el, props, ...children){
//     console.log(children);
//   }

//   window.Lima = {
//     createElement
//   };

//   // todo: create as seperate module
//   window.LimaDOM = {
//     render: (el, domEl) => {
//       domEl.appendChild(el);
//     }
//   }
// })();

class Lima {
  createElement = (type, params, string) => {
    console.log('hello', type);
  }
}

class LimaDOM {
  render = () => {
    console.log('render called');
  }
}

export default Lima;
