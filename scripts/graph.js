import { addMarker } from './marker.js';
import { addLine } from './line.js';
import { drawMap } from './map.js';

export function grawGraph(graphData) {
    const edges = graphData['edges'];
    const crossings = graphData['crossings'];
    let features = [];
    let mapCenterCoords;

    edges.forEach(edge => {
        const edgeCrossings = edge['crossings'];

        const firstCrossing = edgeCrossings[0];
        const firstCrossingCoords = mapCenterCoords = [firstCrossing['lon'], firstCrossing['lat']];
        addMarker(features, firstCrossingCoords);

        for (let i = 1; i < edgeCrossings.length; ++i) {
            const crossingFrom = edgeCrossings[i - 1];
            const crossingFromCoords = [crossingFrom['lon'], crossingFrom['lat']];
            const crossingTo = edgeCrossings[i];
            const crossingToCoords = [crossingTo['lon'], crossingTo['lat']];
            addLine(features, crossingFromCoords, crossingToCoords);
            addMarker(features, crossingToCoords);
        }
    });

    drawMap(features, mapCenterCoords);
}
