const jokeButton = document.querySelector('.getJoke');
const jokeButtonSpan = jokeButton.querySelector('.jokeText');
const jokeHolder = document.querySelector('.joke p');
const loader = document.querySelector('.loader');

const buttonText = [
  'Ugh.',
  '🤦🏻‍♂️',
  'omg dad.',
  'you are the worst',
  'seriously',
  'stop it.',
  'please stop',
  'that was the worst one',
];

async function fetchJoke() {
  // turn loader on, when fetching
  loader.classList.remove('hidden');
  const jokeButton = document.querySelector('.getJoke');

  // set headers to define what kind of response you want from the server
  const response = await fetch('https://icanhazdadjoke.com', {
    headers: {
      Accept: 'application/json',
    },
  });

  const data = response.json();
  // turn loader off

  loader.classList.add('hidden');

  return data;
  // console.log(response);
}

// make utility functions generalized!
function randomItemFromArray(arr, not) {
  const item = arr[Math.floor(Math.random() * arr.length)];
  if (item === not) {
    console.log('already used!');
    return randomItemFromArray(arr, not);
  }
  return item;
}

async function handleClick() {
  // data returned here will have other props but we just want joke,
  // so, use DESTRUCTURING
  const { joke } = await fetchJoke();
  jokeHolder.textContent = joke;
  jokeButtonSpan.textContent = randomItemFromArray(
    buttonText,
    jokeButtonSpan.textContent
  );
}

jokeButton.addEventListener('click', handleClick);
