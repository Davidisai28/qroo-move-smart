import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Navigation, Clock, Bus } from "lucide-react";
import { Card } from "@/components/ui/card";

const TripPlanner = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");

  const suggestedRoutes = [
    { route: "Ruta 1", type: "Autobús", eta: "5 min", occupancy: 45 },
    { route: "Ruta 15", type: "Combi", eta: "8 min", occupancy: 72 },
    { route: "Ruta 23", type: "Autobús", eta: "12 min", occupancy: 30 },
  ];

  return (
    <div className="w-full lg:w-80 bg-card shadow-institutional rounded-lg p-6 animate-slide-in">
      <h2 className="font-poppins font-semibold text-xl mb-4 text-primary">
        Planifica tu viaje
      </h2>

      <div className="space-y-4">
        <div>
          <Label htmlFor="origin" className="flex items-center gap-2 mb-2">
            <MapPin className="w-4 h-4 text-primary" />
            Origen
          </Label>
          <Input
            id="origin"
            placeholder="Tu ubicación actual"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            className="w-full"
          />
        </div>

        <div>
          <Label htmlFor="destination" className="flex items-center gap-2 mb-2">
            <Navigation className="w-4 h-4 text-primary" />
            Destino
          </Label>
          <Input
            id="destination"
            placeholder="¿A dónde vas?"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full"
          />
        </div>

        <Button className="w-full bg-primary hover:bg-primary/90">
          Buscar rutas
        </Button>

        {origin && destination && (
          <div className="mt-6 space-y-3 animate-fade-in">
            <h3 className="font-poppins font-medium text-sm text-muted-foreground">
              Rutas sugeridas
            </h3>
            
            {suggestedRoutes.map((route, index) => (
              <Card key={index} className="p-3 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Bus className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{route.route}</p>
                      <p className="text-xs text-muted-foreground">{route.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-sm font-medium text-accent">
                      <Clock className="w-3 h-3" />
                      {route.eta}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {route.occupancy}% ocupado
                    </p>
                  </div>
                </div>
                <div className="mt-2 h-1 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full transition-all"
                    style={{ 
                      width: `${route.occupancy}%`,
                      background: route.occupancy < 50 
                        ? "hsl(142, 71%, 45%)" 
                        : route.occupancy < 90 
                        ? "hsl(38, 92%, 50%)" 
                        : "hsl(0, 84%, 60%)"
                    }}
                  />
                </div>
              </Card>
            ))}
          </div>
        )}

        <div className="mt-6 pt-6 border-t space-y-2">
          <h3 className="font-poppins font-medium text-sm text-muted-foreground mb-3">
            Filtrar por
          </h3>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="text-xs">
              <Bus className="w-3 h-3 mr-1" />
              Autobuses
            </Button>
            <Button variant="outline" size="sm" className="text-xs">
              Combis
            </Button>
            <Button variant="outline" size="sm" className="text-xs">
              Ecológicos
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripPlanner;
