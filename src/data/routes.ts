export interface Route {
  id: number;
  name: string;
  color: string;
  // Puntos aproximados de la ruta en Cancún (lat, lng)
  path: [number, number][];
}

export const ROUTES: Route[] = [
  {
    id: 1,
    name: "portillo",
    color: "#FFD700", // Amarillo
    path: [
      [21.1619, -86.8515],
      [21.1650, -86.8480],
      [21.1680, -86.8450],
      [21.1710, -86.8420],
    ]
  },
  {
    id: 2,
    name: "KABAH",
    color: "#0000FF", // Azul
    path: [
      [21.1550, -86.8500],
      [21.1580, -86.8470],
      [21.1610, -86.8440],
      [21.1640, -86.8410],
    ]
  },
  {
    id: 3,
    name: "Línea 3",
    color: "#800080", // Morado
    path: [
      [21.1600, -86.8550],
      [21.1630, -86.8520],
      [21.1660, -86.8490],
      [21.1690, -86.8460],
    ]
  },
  {
    id: 4,
    name: "Arco Norte",
    color: "#FF1493", // Rosa/Magenta
    path: [
      [21.1700, -86.8500],
      [21.1730, -86.8470],
      [21.1760, -86.8440],
      [21.1790, -86.8410],
    ]
  },
  {
    id: 5,
    name: "Leona Vicario 17",
    color: "#FFA500", // Naranja
    path: [
      [21.1580, -86.8530],
      [21.1610, -86.8500],
      [21.1640, -86.8470],
      [21.1670, -86.8440],
    ]
  },
  {
    id: 6,
    name: "20 DE NOV",
    color: "#00CED1", // Turquesa/Cian
    path: [
      [21.1620, -86.8580],
      [21.1650, -86.8550],
      [21.1680, -86.8520],
      [21.1710, -86.8490],
    ]
  },
  {
    id: 7,
    name: "Chacmol-135",
    color: "#808080", // Gris
    path: [
      [21.1560, -86.8560],
      [21.1590, -86.8530],
      [21.1620, -86.8500],
      [21.1650, -86.8470],
    ]
  },
  {
    id: 8,
    name: "nichupte",
    color: "#ADFF2F", // Verde lima
    path: [
      [21.1640, -86.8540],
      [21.1670, -86.8510],
      [21.1700, -86.8480],
      [21.1730, -86.8450],
    ]
  },
  {
    id: 9,
    name: "tules",
    color: "#00FF00", // Verde
    path: [
      [21.1590, -86.8570],
      [21.1620, -86.8540],
      [21.1650, -86.8510],
      [21.1680, -86.8480],
    ]
  },
  {
    id: 10,
    name: "Línea 12",
    color: "#00FFFF", // Cian
    path: [
      [21.1670, -86.8560],
      [21.1700, -86.8530],
      [21.1730, -86.8500],
      [21.1760, -86.8470],
    ]
  },
  {
    id: 11,
    name: "Huayacan",
    color: "#00E5FF", // Cian claro
    path: [
      [21.1610, -86.8590],
      [21.1640, -86.8560],
      [21.1670, -86.8530],
      [21.1700, -86.8500],
    ]
  },
  {
    id: 12,
    name: "zh",
    color: "#8B4513", // Café/Rojo oscuro
    path: [
      [21.1650, -86.8600],
      [21.1680, -86.8570],
      [21.1710, -86.8540],
      [21.1740, -86.8510],
    ]
  },
];

// Función para interpolar posición en una ruta
export const getPositionOnRoute = (route: Route, progress: number): [number, number] => {
  const clampedProgress = Math.max(0, Math.min(1, progress));
  const totalSegments = route.path.length - 1;
  const segmentFloat = clampedProgress * totalSegments;
  const segmentIndex = Math.min(Math.floor(segmentFloat), totalSegments - 1);
  const segmentProgress = segmentFloat - segmentIndex;

  const start = route.path[segmentIndex];
  const end = route.path[segmentIndex + 1] || start;

  const lat = start[0] + (end[0] - start[0]) * segmentProgress;
  const lng = start[1] + (end[1] - start[1]) * segmentProgress;

  return [lat, lng];
};
