import React, { useContext, useState } from 'react';
import FilterContext from '../context/FilterContext';

function SortFilter() {
  const { setSort, columnSortItems } = useContext(FilterContext);
  const [columnSort, setColumnSort] = useState('population');
  const [radioSort, setRadioSort] = useState('');

  return (
    <fieldset>
      <select
        data-testid="column-sort"
        value={ columnSort }
        name="columnSort"
        onChange={ ({ target: { value } }) => setColumnSort(value) }
      >
        {
          columnSortItems
            .map((value) => <option key={ value }>{value}</option>)
        }
      </select>
      <label htmlFor="sort-asc">
        Ascendente
        <input
          type="radio"
          data-testid="column-sort-input-asc"
          value="ASC"
          id="sort-asc"
          name="radio-sort"
          onChange={ ({ target: { value } }) => setRadioSort(value) }
        />
      </label>

      <label htmlFor="sort-desc">
        Descentente
        <input
          type="radio"
          data-testid="column-sort-input-desc"
          value="DESC"
          id="sort-desc"
          name="radio-sort"
          onChange={ ({ target: { value } }) => setRadioSort(value) }
        />
      </label>
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ () => setSort({
          order: {
            column: columnSort,
            sort: radioSort,
          },
        }) }
      >
        Ordenar
      </button>

    </fieldset>
  );
}

export default SortFilter;
