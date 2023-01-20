import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';
import useFetch from '../hooks/useFetch';

function AppProvider({ children }) {
  const { errors, isLoading, makeFetch } = useFetch();
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    async function fetching(url) {
      const data = await makeFetch(url);
      console.log('data', data);

      const filteredPlanets = data.results
        .filter((allPlanets) => {
          delete allPlanets.residents;
          return allPlanets;
        });

      console.log('planets', filteredPlanets);

      setPlanets(filteredPlanets);
    }
    fetching('https://swapi.dev/api/planets');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const values = useMemo(() => ({
    errors, isLoading, planets,
  }), [errors, isLoading, planets]);

  return (
    <AppContext.Provider value={ values }>
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node,

}.isRequired;

export default AppProvider;
