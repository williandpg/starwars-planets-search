import { useState, useEffect } from 'react';
import './App.css';
import Table from './components/Table';
import { getPlanets } from './api';
import { PlanetsType } from './types';
import { PlanetsContext } from './context/context';
// import Filter from './components/Filter';

function App() {
  const [planets, setPlanets] = useState<PlanetsType[]>([]);
  const searchPlanets = async () => {
    const planetsList = await getPlanets();
    setPlanets(planetsList);
  };
  useEffect(() => {
    searchPlanets();
  }, []);

  return (
    <>
      <span>Hello, App!</span>
      <PlanetsContext.Provider value={ { planets } }>
        {/* <Filter /> */}
        <Table />
      </PlanetsContext.Provider>
    </>
  );
}

export default App;
