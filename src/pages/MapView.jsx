import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

const MapView = ({ properties }) => {
  // Filter out properties without valid coordinates
  const validProperties = properties.filter(
    (home) =>
      home.coordinates &&
      typeof home.coordinates.lat === "number" &&
      typeof home.coordinates.lng === "number"
  );

  // Default to Atlanta if no valid property
  const center = validProperties.length
    ? [validProperties[0].coordinates.lat, validProperties[0].coordinates.lng]
    : [33.749, -84.388];

  return (
    <MapContainer
      center={center}
      zoom={11}
      scrollWheelZoom={false}
      style={{ height: "500px", width: "100%", borderRadius: "1rem" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {validProperties.map((home) => (
        <Marker
          key={home.id}
          position={[home.coordinates.lat, home.coordinates.lng]}
        >
          <Popup>
            <div className="text-sm">
              <strong>{home.planName}</strong>
              <br />
              {home.city}, {home.state}
              <br />
              <span className="text-blue-600 font-semibold">{home.price}</span>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;
