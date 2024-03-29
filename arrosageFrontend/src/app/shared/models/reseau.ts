
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
  gpio: boolean;
  id: number;
}

export interface ReseauEtTemps {
  station: Station;
  duration: {
    minute: number;
  }
}