//a callback function is like a Worker who "calls back" to his Manager when he has completed a Task.
// a callback function is the function which is passed a parameter to other function
// its used in async programming to get things done in certain sequence

// function pizzaReady() {
//   console.log('pizzaReady');
// }

// function pizzaOrder(cbFunc) {
//   setTimeout(() => {
//     console.log('pizzaOrder');
//     cbFunc();
//   }, 10000);
// }

// pizzaOrder(pizzaReady);

function managerOrders(what, where, callMeOnceDone) {
  setTimeout(() => {
    console.log(`Manager: Do this job with ${what} and ${where}`);
    callMeOnceDone(what, where);
  }, 5000);
}

function workerCallback(noun, verb) {
  console.log(`Worker: Job is done with ${noun} and ${verb}`);
}

managerOrders('axe', 'cut tree', workerCallback);
managerOrders('spoon', 'make tea', workerCallback);

// 1. **Function `managerOrders`:**
//    ```javascript
//    function managerOrders(what, where, callMeOnceDone) {
//      setTimeout(() => {
//        console.log(`Manager: Do this job with ${what} and ${where}`);
//        callMeOnceDone(what, where);
//      }, 5000);
//    }
//    ```
//    - This function `managerOrders` takes three parameters: `what`, `where`, and `callMeOnceDone`.
//    - It uses `setTimeout` to simulate a delay of 5000 milliseconds (5 seconds).
//    - Inside the timeout callback, it logs a message indicating what task needs to be done and where.
//    - After logging the message, it calls the `callMeOnceDone` function and passes `what` and `where` as arguments.

// 2. **Function `workerCallback`:**
//    ```javascript
//    function workerCallback(noun, verb) {
//      console.log(`Worker: Job is done with ${noun} and ${verb}`);
//    }
//    ```
//    - This function `workerCallback` is called when a task is done.
//    - It takes two parameters: `noun` and `verb`.
//    - It logs a message indicating that the job is done with the provided `noun` and `verb`.

// 3. **Calling `managerOrders` Function:**
//    ```javascript
//    managerOrders('axe', 'cut tree', workerCallback);
//    managerOrders('spoon', 'make tea', workerCallback);
//    ```
//    - These lines call the `managerOrders` function twice with different arguments.
//    - The first call requests the manager to perform a task with an axe to cut a tree.
//    - The second call requests another task with a spoon to make tea.
//    - Both calls also provide `workerCallback` as the callback function to be executed once the tasks are done.

// Now, let's see how the execution flows:

// - The `managerOrders` function is called twice with different tasks.
// - Each call sets a timeout of 5 seconds.
// - After 5 seconds, the timeout callback is triggered.
// - Inside the callback, a message is logged indicating the task and location.
// - Then, the `workerCallback` function is called with the task details.
// - `workerCallback` logs a message indicating that the job is done.

// This process is repeated for each call to `managerOrders`, simulating a manager assigning tasks and workers completing them asynchronously.
