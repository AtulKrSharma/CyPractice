function fetchEmpDataFromApi(FE, callb, BE) {
  console.log(`fetching for ${callb.name}`);
  setTimeout(() => {
    console.log(`data fetched for ${callb.name}`);
    callb(FE, BE);
  }, 5000);
}

function showEmpDataOnGUI(frontend, backend) {
  console.log(`showEmpDataOnGUI with ${frontend} & ${backend}`);
}

function showEmpDataOnaAPI(frontend, backend) {
  console.log(`showEmpDataOnaAPI with ${frontend} & ${backend}`);
}

fetchEmpDataFromApi('fe', showEmpDataOnGUI, 'be');
fetchEmpDataFromApi('fe', showEmpDataOnaAPI, 'be');
