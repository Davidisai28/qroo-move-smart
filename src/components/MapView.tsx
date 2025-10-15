import { useEffect, useState } from "react";
import { Bus, Users } from "lucide-react";
import { ROUTES, getPositionOnRoute } from "@/data/routes";

interface Vehicle {
  id: string;
  type: "bus" | "combi";
  routeId: number;
  routeName: string;
  company: string;
  position: [number, number];
  routeProgress: number; // 0-1 progreso en la ruta
  occupancy: number;
  capacity: number;
  km: number;
  hours: number;
}

const MapView = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const cancunCenter: [number, number] = [21.1619, -86.8515];

  useEffect(() => {
    // Simulated vehicles data with assigned routes
    const mockVehicles: Vehicle[] = Array.from({ length: 30 }, (_, i) => {
      const route = ROUTES[i % ROUTES.length];
      const initialProgress = Math.random();
      return {
        id: `VEH-${i + 1}`,
        type: i % 3 === 0 ? "combi" : "bus",
        routeId: route.id,
        routeName: route.name,
        company: `Empresa ${(i % 8) + 1}`,
        position: getPositionOnRoute(route, initialProgress),
        routeProgress: initialProgress,
        occupancy: Math.floor(Math.random() * 100),
        capacity: i % 3 === 0 ? 25 : 47,
        km: Math.floor(Math.random() * 200) + 50,
        hours: Math.floor(Math.random() * 12) + 1,
      };
    });
    setVehicles(mockVehicles);

    // Simulate real-time updates - vehicles move along their routes
    const interval = setInterval(() => {
      setVehicles((prev) =>
        prev.map((v) => {
          const route = ROUTES.find(r => r.id === v.routeId);
          if (!route) return v;
          
          // Advance progress (loop back to 0 when reaching 1)
          const newProgress = (v.routeProgress + 0.005) % 1;
          const newPosition = getPositionOnRoute(route, newProgress);
          
          return {
            ...v,
            routeProgress: newProgress,
            position: newPosition,
            occupancy: Math.max(0, Math.min(100, v.occupancy + (Math.random() - 0.5) * 10)),
          };
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getOccupancyColor = (percentage: number) => {
    if (percentage < 50) return "hsl(142, 71%, 45%)";
    if (percentage < 90) return "hsl(38, 92%, 50%)";
    return "hsl(0, 84%, 60%)";
  };

  // Convert lat/lng to pixel position (approximate for Cancún area)
  const latLngToPixel = (lat: number, lng: number) => {
    const mapCenter = { lat: 21.1619, lng: -86.8515 };
    const scale = 8000; // Ajusta según sea necesario
    
    const x = ((lng - mapCenter.lng) * scale) + 50;
    const y = ((mapCenter.lat - lat) * scale) + 50;
    
    return { x: `${x}%`, y: `${y}%` };
  };

  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Google Maps iframe de fondo */}
      <iframe 
        src="https://www.google.com/maps/d/u/2/embed?mid=1UhpyGzDJyrttUoOh9tzaU6CkYcdgToM&ehbc=2E312F"
        className="w-full h-full rounded-lg border-0"
        style={{ minHeight: "500px" }}
        loading="lazy"
        title="Rutas de Transporte Público Cancún"
      />

      {/* Capa de marcadores de vehículos */}
      <div className="absolute inset-0 pointer-events-none">
        {vehicles.map((vehicle) => {
          const pos = latLngToPixel(vehicle.position[0], vehicle.position[1]);
          const route = ROUTES.find(r => r.id === vehicle.routeId);
          const color = vehicle.type === "bus" ? "#9C1C3B" : "#3C3C3C";
          const occupancyColor = getOccupancyColor(vehicle.occupancy);
          
          return (
            <div
              key={vehicle.id}
              className="absolute pointer-events-auto cursor-pointer transition-all duration-300 hover:scale-110"
              style={{
                left: pos.x,
                top: pos.y,
                transform: 'translate(-50%, -50%)',
              }}
              onClick={() => setSelectedVehicle(vehicle)}
            >
              <div
                style={{
                  background: color,
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: `3px solid ${occupancyColor}`,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                }}
              >
                <Bus className="w-4 h-4 text-white" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Popup de información del vehículo */}
      {selectedVehicle && (
        <div 
          className="absolute top-4 right-4 bg-card shadow-institutional rounded-lg p-4 max-w-sm pointer-events-auto z-10"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => setSelectedVehicle(null)}
            className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
          >
            ✕
          </button>
          <h3 className="font-poppins font-semibold text-base mb-2 text-primary">
            Ruta: {selectedVehicle.routeName}
          </h3>
          <div className="space-y-1 text-sm">
            <div className="flex items-center gap-2">
              <Bus className="w-4 h-4 text-primary" />
              <span className="font-medium">
                {selectedVehicle.type === "bus" ? "Autobús" : "Combi"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              <span>
                Ocupación: {selectedVehicle.occupancy.toFixed(0)}% ({Math.floor((selectedVehicle.occupancy / 100) * selectedVehicle.capacity)}/{selectedVehicle.capacity})
              </span>
            </div>
            <div className="text-muted-foreground">
              <p>Empresa: {selectedVehicle.company}</p>
              <p>Kilómetros: {selectedVehicle.km} km</p>
              <p>Horas laboradas: {selectedVehicle.hours}h</p>
            </div>
            <div className="mt-2 pt-2 border-t">
              <div 
                className="h-2 rounded-full"
                style={{ 
                  background: getOccupancyColor(selectedVehicle.occupancy),
                  width: `${selectedVehicle.occupancy}%`
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Status Bar */}
      <div className="absolute bottom-4 left-4 right-4 bg-card shadow-institutional rounded-lg p-4 backdrop-blur-sm bg-opacity-95 pointer-events-auto">
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
