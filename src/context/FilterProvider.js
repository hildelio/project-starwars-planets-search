import React, { useContext, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import useFilter from '../hooks/useFilter';
import FilterContext from './FilterContext';
import PlanetContext from './PlanetContext';

function FilterProvider({ children }) {
  const { planets } = useContext(PlanetContext);
  const [nameFilter, setNameFilter] = useState('');
  const [nameFiltered, setNameFiltered] = useState([]);
  const [header, setHeader] = useState([]);
  const [filteringByNumberWithColumn, setFilteringByNumberWithColumn] = useState({
    columnFilter: 'population',
    comparisonFilter: 'maior que',
    valueFilter: '0',
  });
  const [columnFilterItems, setColumnFilterItems] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);
  const [filteredItems, setFilteredItems] = useState([]);

  const { filteringName, filteringColumn } = useFilter();

  useEffect(() => {
    setNameFiltered(filteringName(planets, nameFilter));
    setHeader(filteringName(planets, nameFilter));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [planets, nameFilter]);

  useEffect(() => {
    filteredItems.forEach((filterUSed) => {
      setNameFiltered(filteringColumn(nameFiltered, filterUSed));
    });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredItems]);

  const handleChange = (target) => {
    const { name, value } = target;
    setFilteringByNumberWithColumn({
      ...filteringByNumberWithColumn,
      [name]: value,
    });
  };

  const handleClick = () => {
    const { columnFilter } = filteringByNumberWithColumn;
    setNameFiltered(
      filteringColumn(
        nameFiltered,
        filteringByNumberWithColumn,
      ),
    );
    const columnItemsFiltered = columnFilterItems
      .filter((items) => items !== columnFilter);
    setColumnFilterItems([
      ...columnItemsFiltered,
    ]);
    setFilteringByNumberWithColumn({
      ...filteringByNumberWithColumn,
      columnFilter: columnItemsFiltered[0],
    });
    setFilteredItems([
      ...filteredItems, filteringByNumberWithColumn,
    ]);
  };

  const handleDeleteFilter = ({ target: { name } }) => {
    setNameFiltered(planets);
    const removeFilteredItems = filteredItems
      .filter((items) => items.columnFilter !== name);
    setFilteredItems(removeFilteredItems);
    setColumnFilterItems([
      ...columnFilterItems,
      name,
    ]);
  };

  const handleRemoveAllFilters = () => {
    setNameFiltered(planets);
    setFilteredItems([]);
    setColumnFilterItems([
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ]);
  };

  const values = useMemo(() => ({
    nameFilter,
    nameFiltered,
    setNameFiltered,
    setNameFilter,
    filteringByNumberWithColumn,
    setFilteringByNumberWithColumn,
    handleClick,
    handleChange,
    columnFilterItems,
    setColumnFilterItems,
    header,
    setHeader,
    filteredItems,
    setFilteredItems,
    handleDeleteFilter,
    handleRemoveAllFilters,
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [
    filteredItems,
    header,
    columnFilterItems,
    filteringByNumberWithColumn,
    nameFilter,
    nameFiltered,
  ]);

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
