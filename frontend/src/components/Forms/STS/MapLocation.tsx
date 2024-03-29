import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const LocationMap = () => {
  const LocationFinderDummy = () => {
    const map = useMapEvents({
      click(e) {
        console.log(e.latlng);
      },
    });
    return null;
  };
  return (
    <MapContainer
      style={{ height: "300px", width: "2rem 100%" }}
      center={[23.777176, 90.399452]}
      zoom={13}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <LocationFinderDummy />
    </MapContainer>
  );
};
export default LocationMap;
