import React, { useState, useEffect, useContext } from 'react';
import { PlanetsType, PlanetsFilterType } from '../types';
import { PlanetsContext } from '../context/context';

const INITIAL_VALUE = {
  filterColumn: 'population',
  filterComparison: 'maior que',
  filterValue: 0,
};
const optionsFilter = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

function Table() {
  // const planetI = usePlanets();
  // const [planets, setPlanets] = useState('');
  const { planets } = useContext(PlanetsContext);
  const [listPlanets, setListPlanets] = useState(planets);
  const [filterList, setFilterList] = useState<PlanetsFilterType[]>([]);
  const [filterOption, setFilterOption] = useState(INITIAL_VALUE);
  const [filtersColumn, setFiltersColumn] = useState<string[]>(optionsFilter);
  useEffect(() => {
    setListPlanets(planets);
  }, [planets]);
  const filterPlanets = (event: any) => {
    const { value } = event.target;
    const planetsIn = planets.filter((planet) => planet.name.includes(value));
    setListPlanets(planetsIn);
  };
  const handleFilter = () => {
    const listOption = [...filterList, filterOption];
    let planetsIn = planets;
    listOption.forEach((item) => {
      planetsIn = planetsIn.filter((planet: any) => {
        if (item.filterComparison === 'maior que') {
          return Number(planet[item.filterColumn]) > item.filterValue;
        }
        if (item.filterComparison === 'menor que') {
          return Number(planet[item.filterColumn]) < item.filterValue;
        }
        if (item.filterComparison === 'igual a') {
          return Number(planet[item.filterColumn]) === item.filterValue;
        }
        return true;
      });
    });
    if (listOption.length === 0) {
      planetsIn = planets;
    }
    setListPlanets(planetsIn);
    setFilterList(listOption);
  };
  const handleClick = (item: PlanetsFilterType) => {
    const listOption = filterList.filter((filterItem) => (
      filterItem.filterColumn !== item.filterColumn
      || filterItem.filterComparison !== item.filterComparison
      || filterItem.filterValue !== item.filterValue
    ));
    let planetsIn = planets;
    listOption.forEach((filterItem) => {
      planetsIn = planetsIn.filter((planet: any) => {
        if (filterItem.filterComparison === 'maior que') {
          return Number(planet[filterItem.filterColumn]) > Number(filterItem.filterValue);
        }
        if (filterItem.filterComparison === 'menor que') {
          return Number(planet[filterItem.filterColumn]) < Number(filterItem.filterValue);
        }
        if (filterItem.filterComparison === 'igual a') {
          return Number(planet[filterItem.filterColumn])
          === Number(filterItem.filterValue);
        }
        return true;
      });
    });
    setFilterList(listOption);
  };
  useEffect(() => {
    if (filterList) {
      const filterIns = filterList.map((item) => item.filterColumn);
      const filterUp = optionsFilter.filter((item) => (
        !filterIns.includes(item)
      ));
      setFiltersColumn(filterUp);
      setFilterOption((prevFilterOption) => ({
        ...prevFilterOption,
        filterColumn: filterUp[0],
      }));
    } else {
      setFiltersColumn(optionsFilter);
    }
  }, [filterList]);

  // const filterPlanets = (event: PlanetsType[]) => {
  //   const data = event.filter((planetTarget) => planetTarget.name.toLowerCase()
  //     .includes(planets.toLowerCase()));
  //   return data;
  // };

  return (
    <div>
      <form>
        <input
          type="text"
          data-testid="name-filter"
          onChange={ filterPlanets }
        />
        <select
          data-testid="column-filter"
          onChange={ (event) => setFilterOption({
            ...filterOption, filterColumn: event.target.value }) }
        >
          {filtersColumn.map((item) => (
            <option key={ item } value={ item }>{item}</option>
          ))}
          {/* <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option> */}
        </select>
        <select
          data-testid="comparison-filter"
          onChange={ (event) => setFilterOption({
            ...filterOption, filterComparison: event.target.value }) }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <input
          type="number"
          data-testid="value-filter"
          defaultValue={ 0 }
          onChange={ (event) => setFilterOption(
            { ...filterOption, filterValue: Number(event.target.value) },
          ) }
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ handleFilter }
        >
          Filter Planets
        </button>
        <button
          type="button"
          onClick={ () => {
            setListPlanets(planets);
            setFilterList([]);
          } }
        >
          Filter Remove
        </button>
        <h2>Filters</h2>
        <div>
          {filterList.map((item) => (
            <div key={ item.filterColumn }>
              <span>
                {`${item.filterColumn} 
              ${item.filterComparison} ${item.filterValue}`}
              </span>
              <button
                type="button"
                onClick={ () => handleClick(item) }
              >
                X
              </button>
            </div>
          ))}
        </div>
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
          {listPlanets?.map((planet: PlanetsType) => (
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
