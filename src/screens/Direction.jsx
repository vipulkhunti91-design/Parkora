import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PhoneShell from '../components/PhoneShell';
import { parkingSpots } from '../data/mockData';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Coordinates for parking spots (Ahmedabad, Gujarat area matching mock addresses)
const SPOT_COORDINATES = {
  p_mk: [23.0489, 72.5321],
  p_rbmehta: [23.0512, 72.492],
  p_atal: [23.0258, 72.5768],
  p_amc: [23.027, 72.583],
};

// Default user starting location (nearby in Ahmedabad)
const USER_LOCATION = [23.0338, 72.565];

export default function Direction() {
  const { id } = useParams();
  const navigate = useNavigate();
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [routeInfo, setRouteInfo] = useState({ distance: '2.4 km', time: '8 min' });

  const spot = parkingSpots.find((s) => s.id === id) || parkingSpots[0];
  const destCoords = useMemo(
    () => SPOT_COORDINATES[spot.id] || [23.0489, 72.5321],
    [spot.id]
  );

  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    // Create interactive Leaflet map
    const map = L.map(mapContainerRef.current, {
      center: USER_LOCATION,
      zoom: 14,
      zoomControl: false, // Custom placed zoom controls
    });

    mapInstanceRef.current = map;

    // OpenStreetMap high-contrast / clean tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    // Custom Current Location Marker (blue pulsing GPS marker)
    const userMarkerIcon = L.divIcon({
      className: 'custom-gps-marker',
      html: `
        <div style="position: relative; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center;">
          <div style="position: absolute; width: 30px; height: 30px; background: rgba(37, 99, 235, 0.35); border-radius: 50%; animation: pulse 2s infinite;"></div>
          <div style="width: 14px; height: 14px; background: #2563eb; border: 2.5px solid #ffffff; border-radius: 50%; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>
        </div>
      `,
      iconSize: [30, 30],
      iconAnchor: [15, 15],
    });

    L.marker(USER_LOCATION, { icon: userMarkerIcon })
      .addTo(map)
      .bindPopup('<b>Your Current Location</b>');

    // Custom Destination Parking Marker ('P' badge)
    const destMarkerIcon = L.divIcon({
      className: 'custom-dest-marker',
      html: `
        <div style="background: #1e40af; border: 2.5px solid #ffffff; border-radius: 12px; width: 34px; height: 34px; display: flex; align-items: center; justify-content: center; color: #ffffff; font-weight: bold; font-size: 15px; box-shadow: 0 4px 10px rgba(0,0,0,0.35);">
          P
        </div>
      `,
      iconSize: [34, 34],
      iconAnchor: [17, 17],
    });

    L.marker(destCoords, { icon: destMarkerIcon })
      .addTo(map)
      .bindPopup(`<b>${spot.name}</b><br/>${spot.shortAddress}`)
      .openPopup();

    // Intermediate realistic waypoint route between user and parking
    const midPoint = [
      (USER_LOCATION[0] + destCoords[0]) / 2 + 0.003,
      (USER_LOCATION[1] + destCoords[1]) / 2 - 0.002,
    ];
    const midPoint2 = [
      (USER_LOCATION[0] * 0.3 + destCoords[0] * 0.7),
      (USER_LOCATION[1] * 0.3 + destCoords[1] * 0.7) + 0.001,
    ];

    const routePoints = [USER_LOCATION, midPoint, midPoint2, destCoords];

    // Casing road line
    L.polyline(routePoints, {
      color: '#1e3a8a',
      weight: 8,
      opacity: 0.9,
      lineCap: 'round',
      lineJoin: 'round',
    }).addTo(map);

    // Inner bright navigation polyline
    L.polyline(routePoints, {
      color: '#3b82f6',
      weight: 5,
      opacity: 1,
      lineCap: 'round',
      lineJoin: 'round',
    }).addTo(map);

    // Fit map view to show both points with padding
    const bounds = L.latLngBounds([USER_LOCATION, destCoords]);
    map.fitBounds(bounds, { padding: [60, 60] });

    setRouteInfo({
      distance: spot.distance || '2.4 km',
      time: spot.time || '10 min',
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [destCoords, spot]);

  const handleRecenter = () => {
    if (mapInstanceRef.current) {
      const bounds = L.latLngBounds([USER_LOCATION, destCoords]);
      mapInstanceRef.current.fitBounds(bounds, { padding: [50, 50] });
    }
  };

  const handleZoomIn = () => {
    if (mapInstanceRef.current) mapInstanceRef.current.zoomIn();
  };

  const handleZoomOut = () => {
    if (mapInstanceRef.current) mapInstanceRef.current.zoomOut();
  };

  return (
    <PhoneShell bg={false} className="relative overflow-hidden bg-[#e5e7eb]">
      {/* Interactive OpenStreetMap Container */}
      <div ref={mapContainerRef} className="absolute inset-0 w-full h-full z-0" />

      {/* Top Banner — Head East (Turn-by-turn Navigation matching Figma) */}
      <div className="absolute top-12 left-4 right-4 z-20">
        <div
          className="rounded-2xl p-3.5 text-white shadow-xl flex items-center justify-between"
          style={{ background: '#0a5c36' }}
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl font-black">⬆</span>
            <div>
              <h2 className="text-sm font-bold leading-tight">Head towards destination</h2>
              <p className="text-[11px] text-white/80 truncate max-w-[200px]">{spot.name}</p>
            </div>
          </div>
          <div className="rounded-xl px-2.5 py-1 bg-[#064226] flex items-center gap-1 text-[11px] font-semibold">
            <span>Then</span>
            <span className="text-sm">↰</span>
          </div>
        </div>
      </div>

      {/* Map Interactive Controls (Recenter, Zoom In, Zoom Out) */}
      <div className="absolute right-4 top-36 z-20 flex flex-col gap-2">
        <button
          type="button"
          onClick={handleRecenter}
          aria-label="Recenter route"
          className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-sm font-bold text-gray-800 transition active:scale-95"
        >
          🎯
        </button>
        <button
          type="button"
          onClick={handleZoomIn}
          aria-label="Zoom in"
          className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-lg font-bold text-gray-800 transition active:scale-95"
        >
          +
        </button>
        <button
          type="button"
          onClick={handleZoomOut}
          aria-label="Zoom out"
          className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-lg font-bold text-gray-800 transition active:scale-95"
        >
          −
        </button>
      </div>

      {/* Bottom Floating Navigation Card */}
      <div className="absolute left-4 right-4 bottom-6 z-20">
        <div className="rounded-3xl bg-white p-4 shadow-2xl border border-gray-100 flex items-center justify-between">
          {/* Close / Back button */}
          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="Exit directions"
            className="w-11 h-11 rounded-full bg-gray-100 hover:bg-gray-200 transition flex items-center justify-center text-gray-700 text-base font-bold active:scale-95"
          >
            ✕
          </button>

          {/* Time & Distance Details */}
          <div className="text-center px-2">
            <p className="text-xl font-black text-[#16a34a] leading-tight">
              {routeInfo.time}
            </p>
            <p className="text-xs text-gray-500 font-medium mt-0.5">
              {routeInfo.distance} · {spot.name.slice(0, 18)}…
            </p>
          </div>

          {/* Book parking slot button */}
          <button
            type="button"
            onClick={() => navigate(`/booking/${spot.id}`)}
            className="px-4 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md transition active:scale-95"
          >
            Book Slot
          </button>
        </div>
      </div>
    </PhoneShell>
  );
}
