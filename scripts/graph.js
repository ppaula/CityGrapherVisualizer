import { getCityDataUri } from './config/config.js';

export function drawGraph(city) {
    callEndpoint(city);
}

function callEndpoint(city) {
    const cityDataUri = getCityDataUri('Bochnia');
    //TODO impl
}