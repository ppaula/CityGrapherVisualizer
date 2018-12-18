import configJson from "./config.json";

const queryParamNameForCity = "city";
const queryParamNameForNumberOfResults = "numberOfResults";

export function getCityGraphUri(city, numberOfResults) {
    const cityGraphEndpointPath = getCityGraphEndpointPath();
    const params = { }
    params[queryParamNameForCity] = city;
    params[queryParamNameForNumberOfResults] = numberOfResults;
    return encodeQueryParams(cityGraphEndpointPath, params);
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

function encodeQueryParams(url, params) {
    const keys = Object.keys(params);
    url = url + '?' + keys[0] + '=' + params[keys[0]];
    for (let i = 1; i < keys.length; ++i) {
        url += '&' + keys[i] + '=' + params[keys[i]];
    }
    return url;
}
