import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import testData from './mocks/testData';
import { act } from 'react-dom/test-utils';
import PlanetProvider from '../context/PlanetProvider';
import FilterProvider from '../context/FilterProvider';
import userEvent from '@testing-library/user-event';


describe('Testar', () => {
  beforeEach(async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
          json: jest.fn().mockResolvedValue(testData)
      })
    act(() => {
    render(
      <PlanetProvider>
        <FilterProvider>
          <App />
        </FilterProvider>
      </PlanetProvider>
    );
    })
    // await waitFor(() => expect(global.fetch).toBeCalled())
  })
  
  test('Verifica fetch', async () => {
    // await waitFor(() => expect( screen.getByText(/loading/i)).toBeInTheDocument() )
    const loadingEl = await screen.findByText(/loading/i)
    expect(loadingEl).toBeInTheDocument();
    expect(global.fetch).toBeCalled()
    expect(global.fetch).toBeCalledTimes(1)
    
    
  });

  test('Verifica se InputForm é renderizado', async () => {

    const nameFilterEl = screen.getByTestId('name-filter');
    expect(nameFilterEl).toBeInTheDocument();

    const columnFilterEl = screen.getByTestId('column-filter');
    expect(columnFilterEl).toBeInTheDocument();

    const comparisonFilterEl = screen.getByTestId('comparison-filter');
    expect(comparisonFilterEl).toBeInTheDocument();

    const valueFilterEl = screen.getByTestId('value-filter');
    expect(valueFilterEl).toBeInTheDocument();

    
    const buttonFilterEl = screen.getByTestId('button-filter');
    expect(buttonFilterEl).toBeInTheDocument();
    
  });

  test('Verifica se renderiza tabela', async () => {
    
    const columnHeader =  await screen.findByRole('columnheader', {  name: /name/i})
    expect(columnHeader).toBeInTheDocument()

    const tattoineCell = await screen.findByRole('cell', {  name: /tatooine/i})
    expect(tattoineCell).toBeInTheDocument()

  });

  test('Verifica filtros', async () => {
    const nameFilterEl = screen.getByTestId('name-filter');
    userEvent.type(nameFilterEl, 'Tatooine')
    const tattoineCell = await screen.findByRole('cell', {  name: /tatooine/i})
    expect(tattoineCell).toBeInTheDocument()

    // const endorCell = await screen.findByRole('cell', {  name: /endor/i})
    // expect(endorCell).not.toBeInTheDocument();

    // const alderaanCell = await screen.findByRole('cell', {  name: /alderaan/i})
    // expect(alderaanCell).toBeInTheDocument()
    userEvent.clear(nameFilterEl)
    const endorCell = await screen.findByRole('cell', {  name: /endor/i})
    expect(endorCell).toBeInTheDocument();

    const columnFilterEl = screen.getByTestId('column-filter');
    userEvent.selectOptions(columnFilterEl, 'population');
    const comparisonFilterEl = screen.getByTestId('comparison-filter');
    userEvent.selectOptions(comparisonFilterEl, 'maior que');
    const valueFilterEl = screen.getByTestId('value-filter');
    userEvent.type(valueFilterEl, '0')
    const buttonFilterEl = screen.getByTestId('button-filter');
    userEvent.click(buttonFilterEl);

    userEvent.selectOptions(columnFilterEl, 'rotation_period');
    userEvent.selectOptions(comparisonFilterEl, 'igual a');
    userEvent.type(valueFilterEl, '0')
    userEvent.click(buttonFilterEl);

    userEvent.selectOptions(columnFilterEl, 'diameter');
    userEvent.selectOptions(comparisonFilterEl, 'menor que');
    userEvent.type(valueFilterEl, '5000')
    userEvent.click(buttonFilterEl);



  });

  it('Verifica erro no fetch', async () => {
    global.fetch = jest.fn().mockRejectedValue({
        json: jest.fn().mockResolvedValue({ ok: false })
    });
    render(
      <PlanetProvider>
        <FilterProvider>
          <App />
        </FilterProvider>
      </PlanetProvider>
    );
    
    const errorMessage = await screen.findByText(/erro/i);
    expect(errorMessage).toBeInTheDocument();
  });
  it('Verifica remoção de filtros ', async () => {
    const removeFiltersEl = screen.getByTestId('button-remove-filters')
    expect(removeFiltersEl).toBeInTheDocument();
    userEvent.click(removeFiltersEl);


    const columnFilterEl = screen.getByTestId('column-filter');
    userEvent.selectOptions(columnFilterEl, 'surface_water');
    const comparisonFilterEl = screen.getByTestId('comparison-filter');
    userEvent.selectOptions(comparisonFilterEl, 'menor que');
    const valueFilterEl = screen.getByTestId('value-filter');
    userEvent.type(valueFilterEl, '40')
    const buttonFilterEl = screen.getByTestId('button-filter');
    userEvent.click(buttonFilterEl);

    const filteredEl = await screen.findByTestId('filter')
    expect(filteredEl).toBeInTheDocument();

    const buttonDeleteFilterEl = screen.getByRole('button', {
      name: /x/i
    });
    userEvent.click(buttonDeleteFilterEl);


  });
})
