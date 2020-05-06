
export interface Point {
  x: number;
  y: number;
}

export interface Reseau {
  id: number;
  location: string;
  polygons: Point[][];
}
