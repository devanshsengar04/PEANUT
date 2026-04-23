import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';

export default function MapDashboard({ districtsData, onSelectDistrict }) {
  const [geoData, setGeoData] = useState(null);

  useEffect(() => {
    fetch('./india_districts.geojson')
      .then(res => res.json())
      .then(data => setGeoData(data))
      .catch(err => console.error("Could not load GeoJSON", err));
  }, []);

  const getColor = (deficit_pct) => {
    if (deficit_pct > 0.25) return '#ef4444'; // critical
    if (deficit_pct > 0.15) return '#f59e0b'; // warning
    if (deficit_pct > 0.05) return '#10b981'; // ok
    return '#0ea5e9'; // great
  };

  const styleFeature = (feature) => {
    const districtName = feature.properties.NAME_2 ? feature.properties.NAME_2.toLowerCase().trim() : '';
    const dData = districtsData[districtName];
    
    return {
      fillColor: dData ? getColor(dData.greenery_deficit_pct) : '#334155',
      weight: 1,
      opacity: 1,
      color: 'rgba(255,255,255,0.2)',
      dashArray: '3',
      fillOpacity: dData ? 0.7 : 0.2
    };
  };

  const onEachFeature = (feature, layer) => {
    const districtName = feature.properties.NAME_2 ? feature.properties.NAME_2.toLowerCase().trim() : '';
    const stateName = feature.properties.NAME_1 || 'India';
    const dData = districtsData[districtName];

    layer.on({
      mouseover: (e) => {
        const target = e.target;
        target.setStyle({
          weight: 3,
          color: '#fff',
          dashArray: '',
          fillOpacity: 0.9
        });
        target.bringToFront();
      },
      mouseout: (e) => {
        layer.setStyle(styleFeature(feature));
      },
      click: (e) => {
        if(dData) {
           onSelectDistrict(dData);
        } else {
           onSelectDistrict({ district: feature.properties.NAME_2, state: stateName, unknown: true });
        }
      }
    });
    
    if(dData) {
      layer.bindPopup(`<strong>${feature.properties.NAME_2}</strong><br/>Score: ${(dData.deficit_score * 100).toFixed(1)}%`);
    } else {
      layer.bindPopup(`<strong>${feature.properties.NAME_2}</strong><br/>No Data`);
    }
  };

  if (!geoData) {
    return <div style={{display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center'}}>Loading Map Boundaries...</div>;
  }

  return (
    <MapContainer center={[22.5937, 78.9629]} zoom={5} style={{ height: '100%', width: '100%', background: '#0f172a', borderRadius: '1rem' }}>
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      />
      <GeoJSON 
        data={geoData} 
        style={styleFeature} 
        onEachFeature={onEachFeature} 
      />
    </MapContainer>
  );
}
