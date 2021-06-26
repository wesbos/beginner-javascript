function wait(ms = 0) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function destroyPopup(popup) {
  // to access this function of 'popup', it must be passed as an argument
  // because it is defined inside the scope of the promise in the ask function
  popup.classList.remove('open');
  await wait(1000);
  popup.remove();
  // .remove() only removes it from the DOM
  // set to null to remove it entirely and avoid memory leaks
  popup = null;
}

// async map

function ask(options) {
  return new Promise(async function (resolve) {
    // first create popup with all fields in it

    // using '' here allows us to add event listeners before it is on the page
    // backticks wont work because its only after page load
    const popup = document.createElement('form');
    popup.classList.add('popup');
    popup.insertAdjacentHTML(
      'afterbegin',
      `<fieldset> 
        <label>${options.title}</label>
        <input type="text" name="input"/>
        <button type="submit">Submit</button>
        </fieldset>
      `
    );

    // check if they want a cancel button
    if (options.cancel) {
      const skipButton = document.createElement('button');
      // must give type of button otherwise it becomes a submit
      skipButton.type = 'button';

      skipButton.textContent = 'Cancel';
      // first child will try to append to even blank space, any node, etc.
      // so, firstElementChild is much better here
      popup.firstElementChild.appendChild(skipButton);

      skipButton.addEventListener(
        'click',
        function () {
          resolve(null);
          destroyPopup(popup);
        },
        { once: true }
      );
    }

    // listen for submit event on inputs

    popup.addEventListener(
      'submit',
      function (e) {
        e.preventDefault();
        console.log('Submitted!');

        resolve(e.target.input.value);
        // remove it from the DOM entirely
        destroyPopup(popup);
      },
      // third arg is options object
      // here you can add once: true so that it can only be submitted once
      { once: true }
    );
    // when someone submits it, resolve the data that was in the input box
    // insert popup into the DOM
    document.body.appendChild(popup);
    // put a small timeout before adding this class, so it doesn't execute..
    // at same time as adding popup
    // this sticks this at the end of the event loop
    popup.classList.add('open');
  });
}

// select all buttons that have a question
async function askQuestion(e) {
  const button = e.currentTarget;
  // IN checks if a property is in an object
  const cancel = 'cancel' in button.dataset;
  const answer = await ask({
    title: button.dataset.question,
    cancel,
  });
  console.log(answer);
}

const buttons = document.querySelectorAll('[data-question]');

// console.log(buttons);

buttons.forEach((button) => button.addEventListener('click', askQuestion));

const questions = [
  { title: 'What is your name?' },
  { title: 'What is your favorite color?', cancel: true },
  { title: 'What is the air speed of a swallow?' },
];

// this fires them all at the same time, so all 3 will be on page.
// we want to do it sequentially

// const answers = Promise.all([
//   ask(questions[0]),
//   ask(questions[1]),
//   ask(questions[2]),
// ]).then((answers) => {
//   console.log(answers);
// });

// EXECUTE SEQUENTIAL PROMISES
// loop over an array and for each one, return a promise

// FOR OF allows you to pause a loop by waiting for an await inside of it

// UTILITY FUNCTION for ASYNC MAP, to get sequential promises
async function asyncMap(array, callback) {
  // make an array to store results
  const results = [];
  for (const item of array) {
    results.push(await callback(item));
  }
  // when done, return
  return results;
}

async function go() {
  const answers = await asyncMap(questions, ask);
  console.log(answers);
}

go();

// async function askMany() {
//   for (question of questions) {
//     const answer = await ask(question);
//     console.log(answer);
//   }
// }

// askMany();

// these both don't work!! they run all at the same time
// Promise.all(questions.map(ask)).then((data) => {
//   console.log(data);
// });

// questions.forEach(async function (question) {
//   console.log('asking a question');
//   const answer = await ask(question);
//   console.log(answer);
// });
