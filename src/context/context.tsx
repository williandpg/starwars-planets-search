import { createContext } from 'react';
import { PlanetsType } from '../types';

export const PlanetsContext = createContext({
  planets: [] } as {
  planets: PlanetsType[];
});
