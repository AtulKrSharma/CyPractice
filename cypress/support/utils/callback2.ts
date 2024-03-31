function SuccessCallback(result) {
  console.log('Resource found', result);
}

function failureCallback(error) {
  console.log('Ooops. Something went wrong', error);
}

function managerOrder(cbFunc) {
  setTimeout(() => {
    console.log('managerOrder');
    cbFunc(false); // result of the time consuming function
  }, 5000);
}

function workerReplyBack(valBool) {
  console.log('workerReplyBack');
  if (valBool) SuccessCallback(valBool);
  else failureCallback(valBool);
}

managerOrder(workerReplyBack);
