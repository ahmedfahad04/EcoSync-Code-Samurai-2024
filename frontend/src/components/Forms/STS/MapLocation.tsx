import "leaflet/dist/leaflet.css";
import React from "react";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";

interface MapProp {
  formData?: any;
  setFormData?: any;
}

const LocationMap: React.FC<MapProp> = ({ formData, setFormData }) => {
  const LocationFinderDummy = () => {
    const map = useMapEvents({
      click(e: { latlng: { lat: number; lng: number } }) {
        console.log(e.latlng);
        setFormData({
          ...formData,
          latitude: e.latlng.lat,
          longitude: e.latlng.lng,
        });
      },
    });

    return null;
  };

  return (
    <MapContainer
      style={{ height: "300px", width: "100%", cursor: "pointer" }} // Corrected width
      center={[23.777176, 90.399452]}
      zoom={13}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <LocationFinderDummy />
    </MapContainer>
  );
};

export default LocationMap;
