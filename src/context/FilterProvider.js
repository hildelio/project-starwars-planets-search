import React, { useContext, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import useFilter from '../hooks/useFilter';
import FilterContext from './FilterContext';
import PlanetContext from './PlanetContext';

function FilterProvider({ children }) {
  const { planets } = useContext(PlanetContext);
  const [nameFilter, setNameFilter] = useState('');
  const [nameFiltered, setNameFiltered] = useState([]);
  const [filteringByNumberWithColumn, setFilteringByNumberWithColumn] = useState({
    columnFilter: 'population',
    comparisonFilter: 'maior que',
    valueFilter: '0',
  });

  const { filteringName, filteringColumn } = useFilter();

  useEffect(() => {
    setNameFiltered(filteringName(planets, nameFilter));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [planets, nameFilter]);

  const handleChange = (target) => {
    const { name, value } = target;
    setFilteringByNumberWithColumn({
      ...filteringByNumberWithColumn,
      [name]: value,
    });
  };

  const handleClick = () => {
    setNameFiltered(
      filteringColumn(
        nameFiltered,
        filteringByNumberWithColumn,
      ),
    );
  };

  const values = useMemo(() => ({
    nameFilter,
    nameFiltered,
    setNameFilter,
    filteringByNumberWithColumn,
    setFilteringByNumberWithColumn,
    handleClick,
    handleChange,
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [filteringByNumberWithColumn, nameFilter, nameFiltered]);

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
