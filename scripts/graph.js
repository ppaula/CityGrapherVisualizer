import { getCityGraphUri } from './config/config.js';
import { getJsonData } from './rest/get.js';
import { addMarker } from './marker.js';
import { addLine } from './line.js';
import { drawMap } from './map.js';

//TODO trigger this function somewhere else (for examole some button onClick acion etc)
draw('Bochnia');

export function draw(city) {
    const cityGraphDataUri = getCityGraphUri(city);
    getJsonData(cityGraphDataUri)
        .then(result => drawDataAsGraph(result))
        .catch(error => console.log(error));

}

function drawDataAsGraph(graphData) {
    const ways = graphData['ways'];
    const nodes = graphData['nodes'];
    let features = [];
    let mapCenterCoords;

    ways.forEach(way => {
        const wayNodesIds = way['nodes'];

        const firstNode = getNodeById(nodes, wayNodesIds[0]);
        const firstNodeCoords = mapCenterCoords = [firstNode['lon'], firstNode['lat']];
        addMarker(features, firstNodeCoords);

        for (let i = 1; i < wayNodesIds.length; ++i) {
            const nodeFrom = getNodeById(nodes, wayNodesIds[i - 1]);
            const nodeFromCoords = [nodeFrom['lon'], nodeFrom['lat']];
            const nodeTo = getNodeById(nodes, wayNodesIds[i]);
            const nodeToCoords = [nodeTo['lon'], nodeTo['lat']];
            addLine(features, nodeFromCoords, nodeToCoords);
            addMarker(features, nodeToCoords);
        }
    });

    drawMap(features, mapCenterCoords);
}

function getNodeById(nodes, id) {
    let matchingNode;
    nodes.forEach(node => {
        if (node['id'] == id) {
            matchingNode = node;
        }
    });

    return matchingNode;
}