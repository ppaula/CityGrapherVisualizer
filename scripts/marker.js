import { Feature } from 'ol';
import { Point } from 'ol/geom';
import { transform } from 'ol/proj';
import { getHospitalMarkerStyle } from './styles.js';

export function addMarker(features, coords, hospital) {
	const marker = new Feature({
		type: 'marker',
		geometry: new Point(coords).transform('EPSG:4326', 'EPSG:3857')
	});

	if (hospital) {
		var style = getHospitalMarkerStyle();
		marker.setStyle(style);
	}

	features.push(marker);
} 
