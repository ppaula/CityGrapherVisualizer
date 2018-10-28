import {Feature} from 'ol';
import {Point} from 'ol/geom';
import {transform} from 'ol/proj';

export function addMarker(features, coords) {
	const marker = new Feature({
	    type: 'marker',
	    geometry: new Point(coords).transform('EPSG:4326', 'EPSG:3857')
  	});

  	features.push(marker);
} 
