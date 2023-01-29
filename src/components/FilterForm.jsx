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
    filteredItems,
    handleDeleteFilter,
    handleRemoveAllFilters,
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
      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ handleRemoveAllFilters }
      >
        Remover Filtros
      </button>
      {
        filteredItems && filteredItems.map((e) => (
          <fieldset key={ e.columnFilter } data-testid="filter">
            <p
              key={ e.columnFilter }
            >
              {`${e.columnFilter} ${e.comparisonFilter} ${e.valueFilter}`}
            </p>
            <button
              type="button"
              name={ e.columnFilter }
              onClick={ handleDeleteFilter }
            >
              X
            </button>
          </fieldset>
        ))
      }
    </form>
  );
}

export default FilterForm;
