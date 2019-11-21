const input = document.querySelector('[name="input"]');
const output = document.querySelector('.output');

input.addEventListener('input', () => {
  output.innerHTML = input.value.replace(/\n/g, '<br>');
});

// trigger an input even on page load
input.dispatchEvent(new Event('input'));
