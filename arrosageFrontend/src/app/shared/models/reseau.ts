
export interface Point {
  x: number;
  y: number;
}

export interface Station {
  id: number;
  location: string;
  polygons: Point[][];
}

export interface Stations {
  stations: Station[];
}

export interface StationTrigger {
  id: number;
  minutes: number;
}


export interface WateringStates {
  id: number;
  isActive: boolean;
}