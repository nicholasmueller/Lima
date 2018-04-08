(() => {
  function createElement(el, props, ...children){
    console.log('hello world');
  }

  window.Lima = {
    createElement
  };
  window.LimaDOM = {
    render: () => console.log('render from lima')
  }
})();
