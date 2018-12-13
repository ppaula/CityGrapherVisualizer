import configJson from "./config.json";

const queryParamNameForCity = 'city';

export function getCityDataUri(city) {
    const cityDataEndpointPath = getCityDataEndpointPath();
    return encodeQuerySingleParam(cityDataEndpointPath, queryParamNameForCity, city);
}

export function getCityGraphUri(city) {
    const cityGraphEndpointPath = getCityGraphEndpointPath();
    return encodeQuerySingleParam(cityGraphEndpointPath, queryParamNameForCity, city);
}

export function getUriForAlgorithmTask(taskId) {
    const algorithmBaseUrl = getAlgorithmBaseUrl();
    return algorithmBaseUrl + '/' + taskId;
}

export function getUriForAlgorithmTaskResult(taskId) {
    const dataCollectorBaseUrl = getDataCollectorBaseUrl();
    const algorithmResultEndpoint = getDataCollectorEndpoints()['algorithmResult'];
    return dataCollectorBaseUrl  + algorithmResultEndpoint  + taskId;
}

function getCityDataEndpointPath() {
    const dataCollectorBaseUrl = getDataCollectorBaseUrl();
    const cityDataEndpoint = getDataCollectorEndpoints()['cityData'];
    return dataCollectorBaseUrl + cityDataEndpoint;
}

function getCityGraphEndpointPath() {
    const dataCollectorBaseUrl = getDataCollectorBaseUrl();
    const cityGraphEndpoint = getDataCollectorEndpoints()['cityGraph'];
    return dataCollectorBaseUrl + cityGraphEndpoint;
}

function getDataCollectorBaseUrl() {
    return configJson['urls']['dataCollector']['baseUrl'];
}

function getDataCollectorEndpoints() {
    return configJson['urls']['dataCollector']['endpoints'];
}

function getAlgorithmBaseUrl() {
    return configJson['urls']['algorithm']['baseUrl'];
}

function getAlgorithmEndpoints() {
    return configJson['urls']['algorithm']['endpoints'];
}

function encodeQuerySingleParam(url, paramName, paramValue) {
    return url + '?' + paramName + '=' + paramValue;
}
