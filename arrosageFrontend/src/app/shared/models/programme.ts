import { Reseau } from './reseau';

export interface Programme {
  id: string;
  name: string;
  days: string[];
  startTime: string;
  reseaux: Reseau[];
}
