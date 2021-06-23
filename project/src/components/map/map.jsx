import React, { useEffect } from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useRef } from 'react';
import useMap from '../../hooks/use-map/use-map';

function Map(props) {
  const { cardsDescription } = props;
  const mapRef = useRef(null);
  const map = useMap(mapRef, cardsDescription);

  const icon = leaflet.icon({
    iconUrl: 'img/pin.svg',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  });

  useEffect(() => {
    if (map) {
      cardsDescription.forEach((point) => {
        leaflet
          .marker({
            lat: point.lat,
            lng: point.lng,
          }, {
            icon: icon,
          })
          .addTo(map);
      });
    }
  }, [map, cardsDescription]);
  return (
    <div id="map"
      style={{height: '100%'}}
      ref={mapRef}
    >
    </div>
  );
}

// Map.propTypes = {
//   // city: propType.city.isRequired,
//   cardsDescription: PropTypes.array.isRequired,
// };

export default Map;
