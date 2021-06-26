// Named export -- we can have lots
export async function fetchJoke(loader) {
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
