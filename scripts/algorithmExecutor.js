import { validate } from './formValidator.js';
import { showMixin } from './alertViewer.js';
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
        const numberOfResultsInput = document.getElementById("numberOfResultsInput");
        const cityName = cityInput.value;
        const numberOfResults = numberOfResultsInput.value;
        
        const cityGraphDataUri = getCityGraphUri(cityName, numberOfResults);
        
        showMixin("Started collecting data for city " + cityName);        

        getJsonData(cityGraphDataUri).then(result => {
            showMixin("Started algorithm for city " + cityName);            
            algorithmCancelButton.style.visibility = "visible";
            sessionStorage.setItem('uri', result['uri']);
            getResultsFromAlgorithm(0, sessionStorage.getItem('uri'));
        })
        .catch(error => console.log(error));
    }
}

algorithmCancelButton.onclick = function() {
    const uri = sessionStorage.getItem('uri');
    deleteForUri(uri).then(result => {
        console.log(result);
    })
    .catch(error => console.log(error));
}

function getResultsFromAlgorithm(requestCounter, uri) {
    getJsonData(uri).then(result => {
        const calculationStatus = result['status'];
        if (calculationStatus == "SUCCESS") {
            getPositiveResultFromAlgorithm(result['taskId']);
        } else if (calculationStatus == "CANCELLED") {
            hideCancelButton();
        } else if (requestCounter < maxNumberOfRequestForCalculationStatus) {
            requestCounter++;
            setTimeout(getResultsFromAlgorithm, millisecondsToWaitBetweenRequests, requestCounter, uri);
        } else {
            console.log('time exceeded');
        }
    })
    .catch(error => {
        hideCancelButton();
        showMixin("An internal server error occured", "error");
        console.log(error);
    });
}

function getPositiveResultFromAlgorithm(taskId) {
    const uri = getUriForAlgorithmTaskResult(taskId);
    
    getJsonData(uri).then(algorithmResult => {
        hideCancelButton();
        drawGraph(algorithmResult);
    })
    .catch(error => {
        hideCancelButton();
        showMixin("An internal server error occured", "error");
        console.log(error);
    });
}

function hideCancelButton() {
    algorithmCancelButton.style.visibility = "collapse";    
}
