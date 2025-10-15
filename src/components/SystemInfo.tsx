import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Users, MapPin, AlertTriangle } from "lucide-react";

const SystemInfo = () => {
  const demandZones = [
    { zone: "Zona Hotelera", demand: "Alta", vehicles: 45, trend: "up" },
    { zone: "Centro", demand: "Media", vehicles: 32, trend: "stable" },
    { zone: "SM 510", demand: "Alta", vehicles: 28, trend: "up" },
    { zone: "SM 21", demand: "Baja", vehicles: 15, trend: "down" },
  ];

  const alerts = [
    { route: "Ruta 5", message: "Saturación detectada", severity: "high" },
    { route: "Ruta 12", message: "Mayor demanda de lo usual", severity: "medium" },
  ];

  return (
    <div className="w-full lg:w-80 bg-card shadow-institutional rounded-lg p-6">
      <h2 className="font-poppins font-semibold text-xl mb-4 text-primary">
        Información del Sistema
      </h2>

      <Tabs defaultValue="demand" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="demand">Demanda</TabsTrigger>
          <TabsTrigger value="alerts">Alertas</TabsTrigger>
        </TabsList>

        <TabsContent value="demand" className="space-y-3 mt-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
            <TrendingUp className="w-4 h-4" />
            <span>Actualizado hace 2 min</span>
          </div>

          {demandZones.map((zone, index) => (
            <Card key={index} className="p-3">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                    <MapPin className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{zone.zone}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span 
                        className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                          zone.demand === "Alta" 
                            ? "bg-red-100 text-red-700" 
                            : zone.demand === "Media"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {zone.demand}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        <Users className="w-3 h-3 inline mr-1" />
                        {zone.vehicles} unidades
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  {zone.trend === "up" && (
                    <TrendingUp className="w-4 h-4 text-red-500" />
                  )}
                  {zone.trend === "down" && (
                    <TrendingUp className="w-4 h-4 text-green-500 rotate-180" />
                  )}
                </div>
              </div>
            </Card>
          ))}

          <div className="mt-4 p-4 bg-muted rounded-lg">
            <h3 className="font-poppins font-medium text-sm mb-2">
              Estadísticas en tiempo real
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Pasajeros/hora:</span>
                <span className="font-medium">~12,450</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Ocupación promedio:</span>
                <span className="font-medium">67%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Velocidad promedio:</span>
                <span className="font-medium">32 km/h</span>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-3 mt-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
            <AlertTriangle className="w-4 h-4" />
            <span>{alerts.length} alertas activas</span>
          </div>

          {alerts.map((alert, index) => (
            <Card 
              key={index} 
              className={`p-4 border-l-4 ${
                alert.severity === "high" 
                  ? "border-l-red-500 bg-red-50" 
                  : "border-l-yellow-500 bg-yellow-50"
              }`}
            >
              <div className="flex items-start gap-3">
                <AlertTriangle 
                  className={`w-5 h-5 mt-0.5 ${
                    alert.severity === "high" ? "text-red-600" : "text-yellow-600"
                  }`} 
                />
                <div>
                  <p className="font-medium text-sm">{alert.route}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {alert.message}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Hace 5 minutos
                  </p>
                </div>
              </div>
            </Card>
          ))}

          <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
            <p className="text-sm text-green-800">
              <strong>Sistema estable:</strong> 85% de las rutas operando en parámetros normales
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SystemInfo;
