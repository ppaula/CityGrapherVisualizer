import 'ol/ol.css';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import {Map, View} from 'ol';
import {fromLonLat} from 'ol/proj';
import {getStyles} from './styles.js';
import {addMarker} from './marker.js';
import {addLine} from './line.js';

const cracowCenterCoords = [19.937398, 50.061696];
const cracowRandomCoords = [19.887398, 50.081696];
 
const styles = getStyles();

var features = [];

addMarker(features, cracowCenterCoords);
addLine(features, cracowCenterCoords, cracowRandomCoords);

const vectorSource = new VectorSource({features: features});

const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: function(feature) {
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
    center: fromLonLat([19.937398, 50.061696]),
    zoom: 13
  })
});
