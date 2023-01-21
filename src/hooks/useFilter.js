function useFilter() {
  const filteringName = (planets, nameFilter) => planets
    .filter(({ name }) => name.toLowerCase().includes(nameFilter.toLowerCase()));
  return {
    filteringName,

  };
}

export default useFilter;
