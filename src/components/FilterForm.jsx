import React, { useContext } from 'react';
import FilterContext from '../context/FilterContext';

function FilterForm() {
  const {
    nameFilter,
    setNameFilter,
    handleClick,
    handleChange,
    filteringByNumberWithColumn,
    columnFilterItems,
  } = useContext(FilterContext);

  const { columnFilter, comparisonFilter, valueFilter } = filteringByNumberWithColumn;
  return (
    <form>
      <input
        type="text"
        data-testid="name-filter"
        value={ nameFilter }
        name="nameFilter"
        onChange={ ({ target }) => setNameFilter(target.value) }
      />

      <select
        data-testid="column-filter"
        value={ columnFilter }
        name="columnFilter"
        onChange={ ({ target }) => handleChange(target) }
      >
        {
          columnFilterItems
            // .filter((value) => value !== columnFilter)
            .map((value) => <option key={ value }>{value}</option>)
        }
      </select>

      <select
        data-testid="comparison-filter"
        value={ comparisonFilter }
        name="comparisonFilter"
        onChange={ ({ target }) => handleChange(target) }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>

      <input
        type="number"
        data-testid="value-filter"
        value={ valueFilter }
        name="valueFilter"
        onChange={ ({ target }) => handleChange(target) }
      />

      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleClick }
      >
        Filtrar
      </button>
    </form>
  );
}

export default FilterForm;
