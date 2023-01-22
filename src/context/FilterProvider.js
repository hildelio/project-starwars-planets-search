import React, { useContext, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import useFilter from '../hooks/useFilter';
import FilterContext from './FilterContext';
import PlanetContext from './PlanetContext';

function FilterProvider({ children }) {
  const { planets } = useContext(PlanetContext);
  const [nameFilter, setNameFilter] = useState('');
  const [nameFiltered, setNameFiltered] = useState([]);
  const [columnFilter, setColumnFilter] = useState('population');
  const [comparisonFilter, setComparisonFilter] = useState('maior que');
  const [valueFilter, setValueFilter] = useState('0');

  const { filteringName, filteringColumn } = useFilter();

  const handleClick = () => {
    setNameFiltered(
      filteringColumn(nameFiltered, columnFilter, comparisonFilter, valueFilter),
    );
  };

  useEffect(() => {
    setNameFiltered(filteringName(planets, nameFilter));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [planets, nameFilter]);

  const values = useMemo(() => ({
    nameFilter,
    nameFiltered,
    setNameFilter,
    columnFilter,
    setColumnFilter,
    comparisonFilter,
    setComparisonFilter,
    valueFilter,
    setValueFilter,
    handleClick,
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [valueFilter, comparisonFilter, columnFilter, nameFilter, nameFiltered]);

  return (
    <FilterContext.Provider value={ values }>
      {children}
    </FilterContext.Provider>
  );
}

FilterProvider.propTypes = {
  children: PropTypes.node,

}.isRequired;

export default FilterProvider;
