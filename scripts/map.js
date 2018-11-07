import 'ol/ol.css';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Map, View } from 'ol';
import { fromLonLat } from 'ol/proj';
import { getStyles } from './styles.js';

export function drawMap(features, mapCenterCoords) {
  const styles = getStyles();

  const vectorSource = new VectorSource({ features: features });

  const vectorLayer = new VectorLayer({
    source: vectorSource,
    style: function (feature) {
      return styles[feature.get('type')];
    }
  });

  const map = new Map({
    target: 'OsmMap',
    layers: [
      new TileLayer({
        source: new OSM()
      }),
      vectorLayer
    ],
    view: new View({
      projection: 'EPSG:3857',
      center: fromLonLat(mapCenterCoords),
      zoom: 17
    })
  });
}
