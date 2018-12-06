import { addMarker } from './marker.js';
import { addLine } from './line.js';
import { drawMap } from './map.js';

export function drawDataAsGraph(graphData) {
    const ways = graphData['ways'];
    const nodes = graphData['nodes'];
    let features = [];
    let mapCenterCoords;

    ways.forEach(way => {
        const wayNodes = way['nodes'];

        const firstNode = wayNodes[0];
        const firstNodeCoords = mapCenterCoords = [firstNode['lon'], firstNode['lat']];
        addMarker(features, firstNodeCoords);

        for (let i = 1; i < wayNodes.length; ++i) {
            const nodeFrom = wayNodes[i - 1];
            const nodeFromCoords = [nodeFrom['lon'], nodeFrom['lat']];
            const nodeTo = wayNodes[i];
            const nodeToCoords = [nodeTo['lon'], nodeTo['lat']];
            addLine(features, nodeFromCoords, nodeToCoords);
            addMarker(features, nodeToCoords);
        }
    });

    drawMap(features, mapCenterCoords);
}
