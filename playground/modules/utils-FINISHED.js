const last = "bos";
const middle = "slam dunk";

export function returnHi(name) {
  return `hi ${name} ${last}`;
}
const first = "wes";
// NAMED exports - we can have as many as we want
export { last, middle };
export default first;
