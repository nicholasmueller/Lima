export const errors = {
  invalidObjectChild: (child) => {
    console.warn(`Lima Warning! Objects cannot be passed as element children. Please transform data type before presenting it to the DOM.\n`, child)
  },
  invalidSetState: (stateFunc) => {
    console.warn(`Lima can only set state through functions. You passed a ${typeof stateFunc}. Please pass a function to setState, passing in the previous state and previous props as the first 2 arguments. Return the object you want merged into your state object.`)
  }
};
