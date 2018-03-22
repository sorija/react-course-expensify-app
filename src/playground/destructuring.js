// const person = {
//   name: 'Laura',
//   age: 26,
//   location: {
//     city: 'Espoo',
//     temp: -10
//   }
// };

// const { name, age } = person;
// console.log(`${name} is ${age}.`);


//old syntax:
// if (person.location.city && person.location.temp) {
//   console.log(`It's ${person.location.temp} in ${person.location.city}.`);
// };

// const { city, temp } = person.location;
// if (city && temp) {
//   console.log(`It's ${temp} in ${city}.`);
// };

//renaming:
// const { city, temp: temperature } = person.location;
// console.log(`It's ${temperature} degrees.`);

//default fallback value:
// const { name = 'Anonymous'} = person;

//combine rename & defaul
// const { name: firstName = 'Anonymous' } = person;


// Exercise

const book = {
  title: 'Ego is the Enemy',
  author: 'Ryan Holiday',
  publisher: {
    name: 'Penguin'
  }
};
const { name: publisherName = 'Self-Published' } = book.publisher;

console.log(publisherName);

//===================================//

//
// Array destructuring
//

// const address = ['1299 S Juniper Street', 'Philadelphia', 'Pennsylvania', '19147'];
// console.log(`You are in ${address[1]} ${address[2]}.`);

//ed6 syntax:
//it matches up by the POSTION
// const [ street, city, state, zip] = address;
// console.log(`You are in ${city} ${state}.`);

//skip items:
// const [, , state ] = address;

//default value:
// const [, , state = 'New York' ] = address;


// Exercise:
const item = ['Coffee (hot)', '$2.00', '$2.50', '$2.75'];
const [ itemName, , mediumPrice ] = item;
console.log(`A medium ${itemName} costs ${mediumPrice}.`);