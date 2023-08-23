const URL_API = 'https://swapi.dev/api/planets/?format=json';

export const getPlanets = async () => {
  const response = await fetch(URL_API);
  const data = await response.json();
  const { results } = data;

  const planets = results.map((planet:any) => {
    const { residents, ...rest } = planet;
    return rest;
  });

  return planets;
};
