export const errors = {
  invalidObjectChild: (child) => {
    console.warn(`Lima Warning! Objects cannot be passed as element children.
    Please transform data type before presenting it to the DOM.\n`, child)
  },
  invalidSetState: (stateFunc) => {
    console.warn(`Lima Warning! Lima can only set state through functions.
    You passed a ${typeof stateFunc}. Please pass a function to setState, passing
    in the previous state and previous props as the first 2 arguments.
    Return the object you want merged into your state object.`)
  },
  invalidMatch: (matchedInstance, elementToUpdate) => {
    console.warn(`Lima Warning! Something went wrong when trying to find the
    correct internal instance. ${elementToUpdate} does not match ${matchedInstance}!
    Check the walkTree() method defined in render.js`)
  },
  noInternalInstance: () => {
    console.warn(`Lima Warning! No internal instance found recursing the internal tree.
    Check the walkTree() method defined in render.js`)
  },
  invalidContext: (incomingContext) => {
    console.warn(`Lima Warning! Context is required to be of type object.`)
  },
};
