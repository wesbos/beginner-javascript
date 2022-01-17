/* eslint-disable */

console.log('It works');

const stringUno = 'Titulo';
const stringDos = "Ariel";
const stringTres = `Este es un parrafo de ${stringDos}.`;

const htmlConst = `
    <div>
        <h2>${stringUno}</h2>
        <p>${stringTres}</p>
    </div>
`;

document.body.innerHTML = htmlConst;

