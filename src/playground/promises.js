const promise = new Promise((resolve, reject) => {
  // here's where you run the asynchronous js tast (long running task)
  setTimeout(() => {
    resolve('This is my resolved data');
    // reject('SOMETHING WENT TERRIBLY WRONG');
  }, 3000);
});

console.log('before');
// using Promises
// .then lets us register a callback that will fire if and when a promise resolves
// gives access to any data passed to resolve
promise.then((data) => {
  console.log('Have some data', data);
}).then((data) => {
  console.log('this also runs!'); // chained promises
}).catch((error) => {
  console.log('error!!', error);
});

console.log('after');

// order of apperance:
// 1.'before'
// 2.'after'
// 3.'This is my resolved data' -> before our .then function waits for the promise to resolve

// chained promises where we return another promise
promise.then((data) => {
  console.log('Have some data', data);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('This is my other promise');
    }, 3000);
  });
}).then((data) => {
  console.log('this also runs!'); // chained promises
}).catch((error) => {
  console.log('error!!', error);
});
