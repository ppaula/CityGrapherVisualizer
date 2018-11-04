import { getCityDataUri } from './config/config.js';
import { getJsonData } from './rest/get.js';

export function drawGraph(city) {
    const cityDataUri = getCityDataUri(city);
    getJsonData(cityDataUri)
        .then(result => drawDataAsGraph(result))
        .catch(error => console.log(error));
}

function drawDataAsGraph(data) {
    //TODO impl  
}