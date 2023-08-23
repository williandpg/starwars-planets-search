import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Table from '../components/Table';
import { PlanetsContext } from '../context/context';
import mockData from './mock';

// test('I am your test', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/Hello, App!/i);
//   expect(linkElement).toBeInTheDocument();
// });

describe('Teste da aplicação', () => {
  test('Teste se o componente renderiza corretamente', () => {
    render(
      <PlanetsContext.Provider value={{ planets: mockData.results }}>
        <Table />
      </PlanetsContext.Provider>
    );
    expect(screen.getByTestId('name-filter')).toBeInTheDocument();
    expect(screen.getByTestId('column-filter')).toBeInTheDocument();
    expect(screen.getByTestId('comparison-filter')).toBeInTheDocument();
    expect(screen.getByTestId('value-filter')).toBeInTheDocument();
    expect(screen.getByTestId('button-filter')).toBeInTheDocument();
    expect(screen.getByTestId('button-remove-filters')).toBeInTheDocument();
  });
  test('Teste se os dados da tabela são renderizados corretamente', () => {
    render(
      <PlanetsContext.Provider value={{ planets: mockData.results }}>
        <Table />
      </PlanetsContext.Provider>
    );
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Rotation Period')).toBeInTheDocument();
    expect(screen.getByText('Orbital Period')).toBeInTheDocument();
    expect(screen.getByText('Diameter')).toBeInTheDocument();
    expect(screen.getByText('Climate')).toBeInTheDocument();
    expect(screen.getByText('Gravity')).toBeInTheDocument();
    expect(screen.getByText('Terrain')).toBeInTheDocument();
    expect(screen.getByText('Surface Water')).toBeInTheDocument();
    expect(screen.getByText('Population')).toBeInTheDocument();
    expect(screen.getByText('Films')).toBeInTheDocument();
    expect(screen.getByText('Created')).toBeInTheDocument();
    expect(screen.getByText('Edited')).toBeInTheDocument();
    expect(screen.getByText('URL')).toBeInTheDocument();
  });
  test('Teste usando o filtro de nome', async () => {
    render(
      <PlanetsContext.Provider value={{ planets: mockData.results }}>
        <Table />
      </PlanetsContext.Provider>
    );
    const nameInput = screen.getByTestId('name-filter');
    const buttonFilter = screen.getByTestId('button-filter');
    fireEvent.change(nameInput, { target: { value: 'Alderaan' } });
    fireEvent.click(buttonFilter);
    await waitFor(() => expect(screen.getByText('Alderaan')).toBeInTheDocument());
  });
  test ('Teste usando o filtro de coluna', async () => {
    render(
      <PlanetsContext.Provider value={{ planets: mockData.results }}>
        <Table />
      </PlanetsContext.Provider>
    );
    const columnInput = await screen.findByTestId('column-filter');
    const buttonFilter = await screen.getByTestId('button-filter');
    const valueInput = await screen.getByTestId('value-filter');
    fireEvent.change(columnInput, { target: { value: 'population' } });
    fireEvent.change(valueInput, { target: { value: 1000000000 } });
    fireEvent.click(buttonFilter);
    await waitFor(() => expect(screen.getByText('Alderaan')).toBeInTheDocument());
    fireEvent.change(columnInput, { target: { value: 'orbital_period' } });
    fireEvent.change(valueInput, { target: { value: 300 } });
    fireEvent.click(buttonFilter);
    await waitFor(() => expect(screen.getByText('Alderaan')).toBeInTheDocument());
  });
  test ('Teste usando o filtro de comparação', async () => {
    render(
      <PlanetsContext.Provider value={{ planets: mockData.results }}>
        <Table />
      </PlanetsContext.Provider>
    );
    const columnInput = await screen.findByTestId('column-filter');
    const buttonFilter = await screen.getByTestId('button-filter');
    const valueInput = await screen.getByTestId('value-filter');
    const comparisonInput = await screen.getByTestId('comparison-filter');
    fireEvent.change(columnInput, { target: { value: 'population' } });
    fireEvent.change(valueInput, { target: { value: 1000000000 } });
    fireEvent.change(comparisonInput, { target: { value: 'maior que' } });
    fireEvent.click(buttonFilter);
    await waitFor(() => expect(screen.getByText('Alderaan')).toBeInTheDocument());
    fireEvent.change(comparisonInput, { target: { value: 'menor que' } });
    fireEvent.click(buttonFilter);
    await waitFor(() => expect(screen.getByText('Alderaan')).toBeInTheDocument());
  });
  test('Teste handleFilter', async () => {
    render(
      <PlanetsContext.Provider value={{ planets: mockData.results }}>
        <Table />
      </PlanetsContext.Provider>
    );
    const columnInput = await screen.findByTestId('column-filter');
    const buttonFilter = await screen.getByTestId('button-filter');
    const valueInput = await screen.getByTestId('value-filter');
    const comparisonInput = await screen.getByTestId('comparison-filter');
    fireEvent.change(columnInput, { target: { value: 'population' } });
    fireEvent.change(valueInput, { target: { value: 1000000000 } });
    fireEvent.change(comparisonInput, { target: { value: 'maior que' } });
    fireEvent.click(buttonFilter);
    await waitFor(() => expect(screen.getByText('Alderaan')).toBeInTheDocument());
    const removeButton = await screen.getByTestId('button-remove-filters');
    fireEvent.click(removeButton);
    await waitFor(() => expect(screen.getByText('Alderaan')).toBeInTheDocument());
  });
  test ('Teste handleClick', async () => {
    render(
      <PlanetsContext.Provider value={{ planets: mockData.results }}>
        <Table />
      </PlanetsContext.Provider>
    );
    const columnInput = await screen.findByTestId('column-filter');
    const buttonFilter = await screen.getByTestId('button-filter');
    const valueInput = await screen.getByTestId('value-filter');
    const comparisonInput = await screen.getByTestId('comparison-filter');
    fireEvent.change(columnInput, { target: { value: 'population' } });
    fireEvent.change(valueInput, { target: { value: 1000000000 } });
    fireEvent.change(comparisonInput, { target: { value: 'maior que' } });
    fireEvent.click(buttonFilter);
    await waitFor(() => expect(screen.getByText('Alderaan')).toBeInTheDocument());
    const removeButton = await screen.getByTestId('button-remove-filters');
    fireEvent.click(removeButton);
    await waitFor(() => expect(screen.getByText('Alderaan')).toBeInTheDocument());
    const filterButton = await screen.getByTestId('button-filter');
    fireEvent.click(filterButton);
    await waitFor(() => expect(screen.getByText('Alderaan')).toBeInTheDocument());
    const filter = await screen.getByTestId('filter');
    const removeFilterButton = await screen.getByText('X');
    fireEvent.click(removeFilterButton);
    await waitFor(() => expect(filter).not.toBeInTheDocument());
  });
});
