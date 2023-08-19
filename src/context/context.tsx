import { createContext } from 'react';
import { PlanetsType } from '../types';

export type ContextType = {
  planets: PlanetsType[];
  setPlanets: any;
  planetsFiltered: (state: string) => void;
  setPlanetsFiltered: string;
};

export const PlanetsContext = createContext({} as ContextType);
