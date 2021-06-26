const last = 'fublingar';
const middle = 'sonsonsonson';
export function returnHi(name) {
  return `hi ${name} ${middle} ${last}`;
}

// this variable is scoped to the module

// NAMED exports are defined with curly brackets
// can have as many as you want
export { last, middle };

const first = 'ben';
// DEFAULT exports

export default first;
