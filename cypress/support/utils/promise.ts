// This is a real-life analogy for things we often have in programming:

// A “producing code” that does something and takes time. For instance, some code that loads the data over a network. That’s a “singer”.
// A “consuming code” that wants the result of the “producing code” once it’s ready. Many functions may need that result. These are the “fans”.
// A promise is a special JavaScript object that links the “producing code” and the “consuming code” together. In terms of our analogy: this is the “subscription list”. The “producing code” takes whatever time it needs to produce the promised result, and the “promise” makes that result available to all of the subscribed code when it’s ready.

//To create a promise, you need to create an instance object using the Promise constructor function. The Promise constructor function takes in one parameter. That parameter is a function that defines when to resolve the new promise, and optionally when to reject it.

const dummyPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    const result = false;
    if (result) resolve('dummyPromise');
    else reject('dummy Promise failed');
  }, 3000);
});

dummyPromise.then(myResolve, myReject);

function myResolve(val) {
  console.log(`${val} --Pass`);
}

function myReject(val) {
  console.log(`${val} --Fail`);
}
