import { isArray, forOwn } from 'lodash';
import { instantiateComponent } from './render';

class DOMComponent {
  constructor(element) {
    this.currentElement = element;
    this.internalInstances = [];
    this.node = null;
  }

  getPublicInstance() {
    return this.node;
  }

  mount(newJsx) {
    // ignore undefined elements that creep in
    if (typeof this.currentElement.type === 'undefined') {
      return;
    }

    // convenience flag to signal if an update mount
    let initialMount = (typeof newJsx === 'undefined');

    if (initialMount) {
      this.node = document.createElement(this.currentElement.type)
    } else {
      // use already created node
      this.currentElement = newJsx;
      this.internalInstances = [];
    }

    const children = this.currentElement.props.children || [];
    if(!isArray(children)) {
      children = [children];
    }

    // add event listeners and/or set attributes on node
    forOwn(this.currentElement.props, (value, key) => {
      if (key.startsWith('on') && initialMount) {
        // we do NOT re-add event listeners on state updates
        const eventType = key.toLowerCase().substring(2);
        this.node.addEventListener(eventType, value);
      }
      if (key === 'style') {
        forOwn(value, (_value, key) => {
          this.node.style[key] = _value;
        });
      }
      if (
        key !== 'children'
        && !key.startsWith('on')
        && key !== 'style'
      ) {
        this.node.setAttribute(key, value);
      }
      if (key === 'children') {
        value.forEach(child => {
          if (typeof child === 'string' || typeof child === 'number') {
            this.node.textContent = child;
          } else if ('type' in child) {
            const internalInstance = instantiateComponent(child);
            this.internalInstances.push(internalInstance);
          } else {
            errors.invalidObjectChild(child);
          }
        });

        const childNodes = [];
        this.internalInstances.forEach(instance => {
          // mount pushes another recursive call onto the stack
          const node = instance.mount();
          typeof node !== 'undefined' && childNodes.push(node);
        });

        // replace child node if type/attributes/etc are different on state update
        if (!initialMount && this.node.hasChildNodes()) {
          const currentChildren = this.node.childNodes;
          currentChildren.forEach((currentChild, index) => {
            if (!currentChild.isEqualNode(childNodes[index])) {
              // componentwillupdate somehow needs to be hooked here...
              currentChild.replaceWith(childNodes[index])
            }
          })
        } else {
          childNodes.forEach(node => {
            this.node.appendChild(node);
          });
        }
      }
    });
    // if this returns, we can pop down the recursive stack
    return this.node;
  }

  // TODO: implement unmount
  unmount() {
    // recursive if instance is a DOMComponent
    this.internalInstances.forEach(instance => {
      // doesnt do anything usefull here...
      instance.unmount()
    });
  }
}

export default DOMComponent;
