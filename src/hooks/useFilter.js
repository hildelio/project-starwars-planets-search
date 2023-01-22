function useFilter() {
  const filteringName = (planets, nameFilter) => planets
    .filter(({ name }) => name.toLowerCase().includes(nameFilter.toLowerCase()));

  const filteringColumn = (
    nameFiltered,
    columnFilter,
    comparisonFilter,
    valueFilter,
  ) => nameFiltered.filter((planets) => {
    if (comparisonFilter === 'maior que') {
      return Number(valueFilter) < Number(planets[columnFilter]);
    } if (comparisonFilter === 'menor que') {
      return Number(valueFilter) > Number(planets[columnFilter]);
    }
    return Number(valueFilter) === Number(planets[columnFilter]);
  });
  return {
    filteringName,
    filteringColumn,
  };
}

export default useFilter;
