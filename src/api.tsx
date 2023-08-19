import { useState, useEffect } from 'react';

const URL_API = 'https://swapi.dev/api/planets/';

function usePlanets() {
  const [planets, setPlanets] = useState([]);
  const getPlanets = async () => {
    const response = await fetch(URL_API);
    const data = await response.json();
    data.results.forEach((planet: any) => {
      delete planet.residents;
    });
    setPlanets(data.results);
    return data.results;
  };
  useEffect(() => {
    getPlanets();
  }, []);
  return planets;
}

export default usePlanets;
