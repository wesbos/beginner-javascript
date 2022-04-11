console.log('it works');
/* eslint-disable */
/*

SNOBUSN == bonnuss 
String - są uywane do przetrzymywania tekstów;
Są trzy sposoby na towrzenie stringów w JS: '', "", ``

const name = 'wes';
const middle = "topher";
const last = `bos`;

const sentence = "shes\'s so cool";
const sentence1 = "shes's so \"cool\"";
const sentence2 = `shes's so "cool"`;

const song = `Ohhh

ya

I like
pizza`;

konkatenacja - łącznie stringów w jeden 
interpolacja - uzycie zmiennej w stringu

const hello = 'hello my name is ' + name + ". Nice to meet you";

let hello2 = 'hello my name is ';
hello2 = hello2 + name;
hello2 = hello2 + ' Nice to meet you';

Zamiast uywania konkatencji mozemy uzyc ${nazwa_zmiennej} - ta forma moe być uzytka tylko z `` 
const hello = `hello my name is ${name}. Nice to meet you. I am ${1 + 100} years old`;

const html = `
  <div>
    <h2>${name}</h2>
    <p>${hello}</p>
  </div>
`;

document.body.innerHTML = html;

*/

const age = 100;
const name = 'wes';

/*
typeof nazwa_zmiennej czy wartość to powie jaki to typ zmiennej - w konsoli
typ number odpowiada wszelkim rodzajom wartości numerczyych
 */

const a = 10;
const b = 20; 

/*
+ moze byc uzyty jako dodawanie ale tez konkatenacja, więc dodanie stringa do numba -> kowertuje numer do stringa 
devTools -> console -> e.g. Math.... (lita dostępnych metod) e.g Math.round(20.5) -> 21
Math.random() -> randomowa wartosc 
*/

const smarties = 20;
const kids = 3; 
const eachKidsGets = Math.floor(smarties/kids); //6
const dadGetSmarities = smarties % kids; //2 - reszta z dzielenia %

console.log(`Each kid gets ${eachKidsGets}`)

/*
0.1 + 0.2 -> 0.3000000..04 -> ten problem zdarza się nie tylko w JS
koleś mial taki sam problem z cenami więc teraz trzyma wszystko w postaci centów
dzięki czemu jest to pełna liczba

potęga - ** e.g 10^2 -> zapiszemy jako 10 ** 2 -> 100
NaN - Not a Number e.g. 10/'dog' -> NaN * typeof NaN => number
 */

/*
objects- największa składowa; wszystko w JS jest obiektem
  obiekty- kolekcja danych/kolekcje funkcjonalności(?)
    kiedy chcemy zgrupować rzeczy razem;
    składa się z {} i  key(properties) value
*/

const person = {
  first: 'wes',
  last: 'bos',
  age: 29
};
/*
jeśli w konsoli zapytam się o obiekt person dostaniemy w odpowiedzi ten obiekt
ale będzie on w innej kolejności - kolejność propertisów w obiekcie nie ma znaczenia.
Natomiast jeśli potrzebujemy mieć uporządkowane w określony sposób to nalezy 
uzyć Array
Aby dostać się do konkretnych propercji nalezy:
person.first - dot notation
*/


/*
W JSie mamy dwa sposoby na określenie niczego: null i undefined
Jeśli zadeklarujemy zmienną i nie przypiszemy do niej wartości to zobaczymy 'undefined'
Undefined - np. zmienna powstała, ale nie jest zdefiniowana;
*/
let dog;
console.log(dog);

/*
Null - przypisujemy tę wartość do zmiennej, aby było określone jako null
Null - ma wartość NIC, a undefined nie ma określonej wartości
 */

let somethingUndefined;
const somethingNull = null;

//przykład rozróznienia null/undefined

const cher = {
  first: 'cher'
};


const teller = {
  first: 'Raymond',
  last: 'Teller'
};

teller.first = 'Teller';
teller.last = null;

/*
Jeśli zapytamy cher.last == undefined, natomiast teller.last == null
 */

/*
Boolean- true/false
 */

let isDrawing = false;
let age2 = 18;
const ofAge = age2 > 19;
console.log(ofAge);

age2 = 100;


/*
Poleca uywać ===
== - sprawdza czy wartość jest taka sama
=== - czy wartość i type są takie same

'10' == 10 => true
'10' === 10 => false
 */