import React, { useState } from 'react';
import usePlanets from '../api';
import { PlanetsType } from '../types';

function Table() {
  const planetI = usePlanets();
  const [planets, setPlanets] = useState('');
  const filterPlanets = (event: PlanetsType[]) => {
    const data = event.filter((planetTarget) => planetTarget.name.toLowerCase()
      .includes(planets.toLowerCase()));
    return data;
  };

  return (
    <div>
      <form>
        <label htmlFor="filter">
          Filter Planet
          <input
            type="text"
            data-testid="name-filter"
            onChange={ (event) => setPlanets(event.target.value) }
          />
        </label>
      </form>
      <h1>Star Wars Planets</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {filterPlanets(planetI).map((planet: PlanetsType) => (
            <tr key={ planet.name }>
              <td>{planet.name}</td>
              <td>{planet.rotation_period}</td>
              <td>{planet.orbital_period}</td>
              <td>{planet.diameter}</td>
              <td>{planet.climate}</td>
              <td>{planet.gravity}</td>
              <td>{planet.terrain}</td>
              <td>{planet.surface_water}</td>
              <td>{planet.population}</td>
              <td>{planet.films.join(', ')}</td>
              <td>{planet.created}</td>
              <td>{planet.edited}</td>
              <td>{planet.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
