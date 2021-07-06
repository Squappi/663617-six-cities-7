import React, { useEffect } from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useRef } from 'react';
import useMap from '../../hooks/use-map/use-map';
import PropTypes from 'prop-types';

function Map(props) {
  const {cardsDescription, activeCard} = props;
  const mapRef = useRef(null);
  const map = useMap(mapRef, cardsDescription[0]?.city);

  const icon = leaflet.icon({
    iconUrl: 'img/pin.svg',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  });

  const activeIcon = leaflet.icon({
    iconUrl: 'img/pin-active.svg',
    iconSize: [30,30],
    iconAnchor: [15,30],
  });

  useEffect(() => {
    if (map) {
      const markers = cardsDescription.map(({location, id}) =>
        leaflet
          .marker(
            [location.latitude, location.longitude],
            {icon: (id === activeCard ? activeIcon : icon)},
          ));
      markers.forEach((marker) => marker.addTo(map));
      return () => {
        markers.forEach((marker) => marker.removeFrom(map));
      };
    }
  }, [map, icon, cardsDescription, activeCard, activeIcon]);
  return (
    <div
      style={{height: '100%'}}
      ref={mapRef}
    >
    </div>
  );
}

Map.propTypes = {
  activeCard: PropTypes.number,
  cardsDescription: PropTypes.array.isRequired,
};

export default Map;
