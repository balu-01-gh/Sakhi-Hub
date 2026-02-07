import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, Navigation } from 'lucide-react';
import L from 'leaflet';

// Fix for default marker icon in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Component to handle map view updates
function LocationMarker({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.flyTo(position, 16);
    }
  }, [position, map]);

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
}

const MapComponent = ({ emergencyMode = false, onLocationUpdate }) => {
  const [position, setPosition] = useState(null); // [lat, lng]
  const [error, setError] = useState(null);

  // Safe spaces demo data (simulated around a central point)
  const safeSpaces = [
    { id: 1, name: "Village Panchayat Hall", pos: [20.5937, 78.9629], type: "Government" },
    { id: 2, name: "Anganwadi Center", pos: [20.5950, 78.9640], type: "Health" }, 
    { id: 3, name: "Police Station", pos: [20.5910, 78.9610], type: "Police" }
  ];

  // Default to India center if no location
  const defaultPos = [20.5937, 78.9629]; 

  const getLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const newPos = [latitude, longitude];
        setPosition(newPos);
        if (onLocationUpdate) onLocationUpdate({ lat: latitude, lng: longitude });
        
        // Update safe spaces relative to user (demo trigger)
        // In real app, fetch from backend based on lat/lng
      },
      (err) => {
        setError('Unable to retrieve your location');
        console.error(err);
      },
      { enableHighAccuracy: true }
    );
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <div className="w-full h-[400px] rounded-3xl overflow-hidden shadow-xl border border-gray-200 relative">
      <MapContainer 
        center={defaultPos} 
        zoom={13} 
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {position && <LocationMarker position={position} />}

        {safeSpaces.map(space => (
            // Offset demo safe spaces relative to user if available
            <Marker 
                key={space.id} 
                position={position ? [position[0] + (Math.random() - 0.5) * 0.01, position[1] + (Math.random() - 0.5) * 0.01] : space.pos}
            >
                <Popup>
                    <div className="font-bold">{space.name}</div>
                    <div className="text-xs text-gray-500">{space.type}</div>
                </Popup>
            </Marker>
        ))}
        
      </MapContainer>
      
      <button 
        onClick={getLocation}
        className="absolute bottom-4 right-4 bg-white p-3 rounded-full shadow-lg z-[1000] hover:bg-gray-50 text-blue-600"
        title="My Location"
      >
        <Navigation size={24} className={position ? "text-blue-600 fill-current" : "text-gray-400"} />
      </button>

      {error && (
        <div className="absolute top-4 left-4 bg-red-100 text-red-700 px-4 py-2 rounded-lg z-[1000] text-sm font-bold">
          {error}
        </div>
      )}
    </div>
  );
};

export default MapComponent;
