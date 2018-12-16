import { validate } from './formValidator.js';
import { getCityGraphUri } from './config/config.js';
import { getUriForAlgorithmTaskResult } from './config/config.js';
import { getJsonData } from './rest/get.js';
import { deleteForUri } from './rest/delete.js';
import { drawGraph } from './graph.js';

const algorithmStartButton = document.getElementById("algorithmStartButton");
const algorithmCancelButton = document.getElementById("algorithmCancelButton");

const maxNumberOfRequestForCalculationStatus = 500;
const millisecondsToWaitBetweenRequests = 1000;

algorithmStartButton.onclick = function() {
    if (validate()) {
        const cityInput = document.getElementById("cityInput");
        const cityName = cityInput.value;
        const cityGraphDataUri = getCityGraphUri(cityName);
        getJsonData(cityGraphDataUri)
        .then(result => {
            algorithmCancelButton.style.visibility = "visible";
            sessionStorage.setItem('uri', result['uri']);
            getResultsFromAlgorithm(0, sessionStorage.getItem('uri'));
        })
        .catch(error => console.log(error));
    } else {
        // TODO call here errorPrinter or sth else, most probably in another script file
    }
}

algorithmCancelButton.onclick = function() {
    const uri = sessionStorage.getItem('uri');
    deleteForUri(uri).then(result => {
        // TODO handle here successfully cancelled task or in elseif in getResultsFromAlgorithm method
        console.log(result);
    })
    .catch(error => console.log(error));
}

function getResultsFromAlgorithm(requestCounter, uri) {
    getJsonData(uri).then(result => {
        const calculationStatus = result['status'];
        if (calculationStatus == "SUCCESS") {
            getPositiveResultFromAlgorithm(result['taskId']);
        } else if (calculationStatus == "CANCELED") {
            console.log("Cancelled!");
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
        algorithmCancelButton.style.visibility = "collapse";
        drawGraph(algorithmResult);
    })
    .catch(error => console.log(error));
}
