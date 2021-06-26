import wait from 'waait';
import { name } from 'faker';
import { formatDistance, format } from 'date-fns';
import axios from 'axios';
import { intersection } from 'lodash';
import to from 'await-to-js';
import { reject } from 'q';

async function go() {
  console.log('Going!');
  console.log(`Hello ${name.firstName()}`);
  // generate array of 10 fake names, first and last with a callback
  const fakeNames = Array.from(
    { length: 10 },
    () => `${name.firstName()} ${name.lastName()}`
  );
  console.log(fakeNames);
  await wait(200);
  console.log('ending!');
}

// Get a nice text description of time distances
// i.e. "in about 1 hour" or " about 1 hour ago" etc.
const diff = formatDistance(
  new Date(2022, 2, 22, 10, 32, 0),
  new Date(2022, 2, 22, 11, 32, 0),
  { addSuffix: true }
);

const date = new Date();

console.log(diff);

// Nice clean detailed, text based date description
const formatted = format(date, `LLLL 'the' do y`);
console.log(formatted);

async function getJoke() {
  const { data } = await axios.get('https://icanhazdadjoke.com', {
    headers: {
      Accept: 'application/json',
    },
  });
  console.log(data);
}

go();
getJoke();

// lodash is super handy for specific array operations

const a = [2, 4, 8, 16];
const b = [1, 2, 3, 4, 5, 6, 7, 8];

const sameVals = intersection(a, b);
console.log(sameVals);

// clone Deep to clone nested arrays
// cloneDeep

function checkIfNameIsCool(firstName) {
  return new Promise(function (resolve, reject) {
    if (firstName === 'ben') {
      resolve('cool name');
      return;
    }
    reject(new Error('not a cool name'));
  });
}

async function checkName() {
  const [err, successValue] = await to(checkIfNameIsCool('benn'));
  if (err) {
    console.log(err);
  } else {
    console.log(successValue);
  }
}

checkName();
