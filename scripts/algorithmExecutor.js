import { validate } from './formValidator.js';
import { getCityGraphUri } from './config/config.js';
import { getUriForAlgorithmTaskResult } from './config/config.js';
import { getJsonData } from './rest/get.js';
import { grawGraph } from './graph.js';

const algorithmStarterButton = document.getElementById("algorithmStarterButton");

const maxNumberOfRequestForCalculationStatus = 500;
const millisecondsToWaitBetweenRequests = 1000;

algorithmStarterButton.onclick = function() {
    if (validate()) {
        const cityInput = document.getElementById("cityInput");
        const cityName = cityInput.value;
        const cityGraphDataUri = getCityGraphUri(cityName);
        getJsonData(cityGraphDataUri)
        .then(result => {
            getResultsFromAlgorithm(0, result['uri']);
        })
        .catch(error => console.log(error));
    } else {
        // TODO call here errorPrinter or sth else, most probably in another script file
    }
}

function getResultsFromAlgorithm(requestCounter, uri) {
    getJsonData(uri).then(result => {
        const calculationStatus = result['status'];
        if (calculationStatus == "SUCCESS") {
            getPositiveResultFromAlgorithm(result['taskId']);
        } else if (requestCounter < maxNumberOfRequestForCalculationStatus) {
            requestCounter++;
            setTimeout(getResultsFromAlgorithm, millisecondsToWaitBetweenRequests, requestCounter, uri);
        } else {
            console.log('time exceeded');
        }
    })
    .catch(error => console.log(error));
}

function getPositiveResultFromAlgorithm(taskId) {
    const uri = getUriForAlgorithmTaskResult(taskId);
    
    getJsonData(uri).then(algorithmResult => {
        grawGraph(algorithmResult);
    })
    .catch(error => console.log(error));
}