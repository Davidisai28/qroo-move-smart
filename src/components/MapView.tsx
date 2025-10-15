import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Bus, Users } from "lucide-react";

// Fix for default marker icon in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface Vehicle {
  id: string;
  type: "bus" | "combi";
  route: string;
  company: string;
  position: [number, number];
  occupancy: number;
  capacity: number;
  km: number;
  hours: number;
}

const MapView = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const cancunCenter: [number, number] = [21.1619, -86.8515];

  useEffect(() => {
    // Simulated vehicles data
    const mockVehicles: Vehicle[] = Array.from({ length: 30 }, (_, i) => ({
      id: `VEH-${i + 1}`,
      type: i % 3 === 0 ? "combi" : "bus",
      route: `Ruta ${(i % 87) + 1}`,
      company: `Empresa ${(i % 8) + 1}`,
      position: [
        21.1619 + (Math.random() - 0.5) * 0.1,
        -86.8515 + (Math.random() - 0.5) * 0.1,
      ] as [number, number],
      occupancy: Math.floor(Math.random() * 100),
      capacity: i % 3 === 0 ? 25 : 47,
      km: Math.floor(Math.random() * 200) + 50,
      hours: Math.floor(Math.random() * 12) + 1,
    }));
    setVehicles(mockVehicles);

    // Simulate real-time updates
    const interval = setInterval(() => {
      setVehicles((prev) =>
        prev.map((v) => ({
          ...v,
          position: [
            v.position[0] + (Math.random() - 0.5) * 0.001,
            v.position[1] + (Math.random() - 0.5) * 0.001,
          ] as [number, number],
          occupancy: Math.max(0, Math.min(100, v.occupancy + (Math.random() - 0.5) * 10)),
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getOccupancyColor = (percentage: number) => {
    if (percentage < 50) return "hsl(142, 71%, 45%)";
    if (percentage < 90) return "hsl(38, 92%, 50%)";
    return "hsl(0, 84%, 60%)";
  };

  const createCustomIcon = (type: string, occupancy: number) => {
    const color = type === "bus" ? "#9C1C3B" : "#3C3C3C";
    const occupancyColor = getOccupancyColor(occupancy);
    
    return L.divIcon({
      className: "custom-marker",
      html: `
        <div style="
          background: ${color};
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 3px solid ${occupancyColor};
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        ">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
            <path d="M5 11a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H5zM17 11a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1h-1zM5 6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v2h2v8h-2v2a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-2H3V8h2V6z"/>
          </svg>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });
  };

  return (
    <div className="relative w-full h-full">
      <MapContainer
        center={cancunCenter}
        zoom={13}
        className="w-full h-full rounded-lg"
        style={{ minHeight: "500px" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {vehicles.map((vehicle) => (
          <Marker
            key={vehicle.id}
            position={vehicle.position}
            icon={createCustomIcon(vehicle.type, vehicle.occupancy)}
          >
            <Popup>
              <div className="p-2 min-w-[200px]">
                <h3 className="font-poppins font-semibold text-base mb-2 text-primary">
                  {vehicle.route}
                </h3>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center gap-2">
                    <Bus className="w-4 h-4 text-primary" />
                    <span className="font-medium">
                      {vehicle.type === "bus" ? "Autobús" : "Combi"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary" />
                    <span>
                      Ocupación: {vehicle.occupancy.toFixed(0)}% ({Math.floor((vehicle.occupancy / 100) * vehicle.capacity)}/{vehicle.capacity})
                    </span>
                  </div>
                  <div className="text-muted-foreground">
                    <p>Empresa: {vehicle.company}</p>
                    <p>Kilómetros: {vehicle.km} km</p>
                    <p>Horas laboradas: {vehicle.hours}h</p>
                  </div>
                  <div className="mt-2 pt-2 border-t">
                    <div 
                      className="h-2 rounded-full"
                      style={{ 
                        background: getOccupancyColor(vehicle.occupancy),
                        width: `${vehicle.occupancy}%`
                      }}
                    />
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
        
        {/* Example coverage area */}
        <Circle
          center={cancunCenter}
          radius={5000}
          pathOptions={{ 
            color: "#9C1C3B", 
            fillColor: "#9C1C3B", 
            fillOpacity: 0.1 
          }}
        />
      </MapContainer>

      {/* Status Bar */}
      <div className="absolute bottom-4 left-4 right-4 bg-card shadow-institutional rounded-lg p-4 backdrop-blur-sm bg-opacity-95">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="text-center">
            <p className="font-poppins font-semibold text-lg text-primary">
              {vehicles.filter(v => v.type === "bus").length}
            </p>
            <p className="text-muted-foreground">Autobuses activos</p>
          </div>
          <div className="text-center">
            <p className="font-poppins font-semibold text-lg text-primary">
              {vehicles.filter(v => v.type === "combi").length}
            </p>
            <p className="text-muted-foreground">Combis activas</p>
          </div>
          <div className="text-center">
            <p className="font-poppins font-semibold text-lg text-accent">87</p>
            <p className="text-muted-foreground">Rutas totales</p>
          </div>
          <div className="text-center">
            <p className="font-poppins font-semibold text-lg text-accent">8</p>
            <p className="text-muted-foreground">Empresas</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;
