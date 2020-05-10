import { ArrosageReseau } from './arrosage-reseau';

export interface Programme {
  id: number;
  name: string;
  active: boolean;
  days: string[];
  startTime: {
    hour: number,
    minute: number
  };
  arrosageReseaux: ArrosageReseau[];
}


export interface Programs {
  programs: Programme[]
}
