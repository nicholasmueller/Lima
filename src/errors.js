export const errors = {
  invalidObjectChild: (child) => {
    console.warn(`Lima Warning! Objects cannot be passed as element children. Please transform data type before presenting it to the DOM.\n`, child)
  }
};
