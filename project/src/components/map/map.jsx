import React, { useEffect } from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useRef } from 'react';
import useMap from '../../hooks/use-map/use-map';
import PropTypes from 'prop-types';

function Map(props) {
  const {cardsDescription} = props;
  const mapRef = useRef(null);
  const map = useMap(mapRef, cardsDescription[0].city);

  const icon = leaflet.icon({
    iconUrl: 'img/pin.svg',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  });

  useEffect(() => {
    if (map) {
      const markers = cardsDescription.map(({location}) =>
        leaflet
          .marker(
            [location.latitude, location.longitude],
            {icon: icon},
          ));
      markers.forEach((marker) => marker.addTo(map));
      return () => {
        markers.forEach((marker) => marker.removeFrom(map));
      }
    }
  }, [map, icon, cardsDescription]);
  return (
    <div
      style={{height: '100%'}}
      ref={mapRef}
    >
    </div>
  );
}

Map.propTypes = {
  cardsDescription: PropTypes.array.isRequired,
};

export default Map;
