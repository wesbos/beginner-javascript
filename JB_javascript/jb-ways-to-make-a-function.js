/* Part 1 */
// function nameprint(firstname) {
//   console.log(`My name is ${firstname}`);
//   return firstname;
// }

// const testname = nameprint('John Bright');
// console.log(`this is the log ---> ${testname}`);

/* Part 2*/

// const add = (a, b) => a + b;

(function(age) {
  console.log(`your age is ${age} `);
})(100);

//Methods

const jb = {
  name: 'John BRight',
  agePrint() {
    console.log(`September`);
    console.log(`1993`);
    console.log(`26`);
    return 'Hi JOhn';
  },
};

const wes = {
  name: 'Westopher Bos',
  // Method!
  sayHi: function() {
    console.log(`Hey ${this.name}`);
    return 'Hey Wes';
  },
  // Short hand Method
  yellHi() {
    console.log('HEY WESSSSS');
  },
  // Arrow function
  wisperHi: () => {
    console.log('hii wesss im a mouse');
  },
};

const button = document.querySelector('.clickMe');

button.addEventListener('click', function() {
  console.log('nice work buddy');
});

setTimeout(function() {
  console.log('its time to join the meeting! Done!');
}, 2000);
