import configJson from "./config.json";

export function getCityDataUri(city) {
    const cityDataEndpointPath = getCityDataEndpointPath();
    return encodeQuerySingleParam(cityDataEndpointPath, 'city', city);
}

export function getCityGraphUri(city) {
    const cityGraphEndpointPath = getCityGraphEndpointPath();
    return encodeQuerySingleParam(cityGraphEndpointPath, 'city', city);
}

function getCityDataEndpointPath() {
    const dataCollectorBaseUrl = getDataCollectorBaseUrl();
    const cityDataEndpoint = configJson['urls']['dataCollector']['endpoints']['getCityData'];
    return dataCollectorBaseUrl + cityDataEndpoint;
}

function getCityGraphEndpointPath() {
    const dataCollectorBaseUrl = getDataCollectorBaseUrl();
    const cityGraphEndpoint = configJson['urls']['dataCollector']['endpoints']['getCityGraph'];
    return dataCollectorBaseUrl + cityGraphEndpoint;
}

function getAlgorithmEndpointPath() {
    const algorithmBaseUrl = getAlgorithmBaseUrl();
    const algorithmEndpoint = configJson['urls']['algorithm']['endpoints']['algorithm'];
    return algorithmBaseUrl + algorithmEndpoint;
}

function getDataCollectorBaseUrl() {
    return configJson['urls']['dataCollector']['baseUrl'];
}

function getAlgorithmBaseUrl() {
    return configJson['urls']['algorithm']['baseUrl'];
}

function encodeQuerySingleParam(url, paramName, paramValue) {
    return url + '?' + paramName + '=' + paramValue;
}