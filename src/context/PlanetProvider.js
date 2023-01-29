import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetContext from './PlanetContext';
import useFetch from '../hooks/useFetch';

function PlanetProvider({ children }) {
  const { errors, isLoading, makeFetch } = useFetch();
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    async function fetching(url) {
      try {
        const data = await makeFetch(url);

        const filteredPlanets = data.results
          .filter((allPlanets) => {
            delete allPlanets.residents;
            return allPlanets;
          });

        setPlanets(filteredPlanets);
      } catch (error) {
        console.log(error);
      }
    }
    fetching('https://swapi.dev/api/planets');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const values = useMemo(() => ({
    errors, isLoading, planets,
  }), [errors, isLoading, planets]);

  return (
    <PlanetContext.Provider value={ values }>
      {children}
    </PlanetContext.Provider>
  );
}

PlanetProvider.propTypes = {
  children: PropTypes.node,

}.isRequired;

export default PlanetProvider;
