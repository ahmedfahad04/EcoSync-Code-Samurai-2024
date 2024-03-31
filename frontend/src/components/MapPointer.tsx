import { API_END_POINTS, BASE_URL } from "@/constants/Service";
import { ISTS } from "@/models/STS";
import L from "leaflet"; // Import Leaflet library
import "leaflet/dist/leaflet.css";
import React from "react";
import { MapContainer, Marker, TileLayer, Tooltip } from "react-leaflet";
import useSWR from "swr";

interface MapProp {
  places?: { sts_name: string; gps_coordinate: [number, number] }[];
}

const fetcher = (url: string) =>
  fetch(url, { credentials: "include" }).then((res) => res.json()); // Fetcher function for SWR

const MapPointer: React.FC<MapProp> = ({ places }) => {
  const knownLocation = [23.777176, 90.399452]; // Known latitude and longitude

  const { data: sts } = useSWR<ISTS[]>(
    `${BASE_URL}${API_END_POINTS.STS}`,
    fetcher
  );

  // Define the marker icon
  const markerIcon = L.icon({
    iconUrl: "../../public/mapMarker.png", // Path to your marker icon image
    iconSize: [25, 41], // Size of the icon
    iconAnchor: [12, 41], // Position of the icon relative to its container
    popupAnchor: [1, -34], // Position of the popup relative to the icon
    // Specify any additional properties for the marker icon if needed
  });

  const CenterMapButton = () => {
    const map = useMap(); // Hook to access the map instance

    const handleCenterMap = () => {
      map.setView(knownLocation, 13); // Set the view to the known location
    };

    return (
      <button
        onClick={handleCenterMap}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          zIndex: 1000,
        }}
      >
        Center Map
      </button>
    );
  };

  return (
    <MapContainer
      style={{ height: "300px", width: "100%", cursor: "pointer" }}
      center={knownLocation}
      zoom={13}
    >
      {/* <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={knownLocation} icon={markerIcon}>
        <Tooltip direction="top" offset={[0, -38]} opacity={1} permanent>
          Your Marker Name
        </Tooltip>
      </Marker> */}

      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      
      {sts?.map((place) => (
        <Marker
          key={place.sts_id}
          position={place.gps_coordinate}
          icon={markerIcon}
        >
          <Tooltip direction="top" offset={[0, -20]} opacity={1} permanent>
            {place.sts_name}
          </Tooltip>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapPointer;
