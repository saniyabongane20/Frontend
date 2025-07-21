import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import L from "leaflet";
import "../leaflet-icon-fix";


const route = [
  [19.0760, 72.8777],
  [19.0822, 72.7411],
  [19.0900, 72.8570],
  [19.1000, 72.8700],
  [19.1200, 72.8800],
];

export default function VehicleMap() {
  const [index, setIndex] = useState(0);
  const [position, setPosition] = useState(route[0]);
  const [path, setPath] = useState([route[0]]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => {
        const nextIndex = (prev + 1) % route.length;
        setPosition(route[nextIndex]);
        setPath((prevPath) => [...prevPath, route[nextIndex]]);
        return nextIndex;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <MapContainer center={route[0]} zoom={13} style={{ height: "100vh", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={position} />
      <Polyline positions={path} color="blue" />
    </MapContainer>
  );
}