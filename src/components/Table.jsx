import React, { useContext } from 'react';
import FilterContext from '../context/FilterContext';
import PlanetContext from '../context/PlanetContext';
import Header from './Header';

function Table() {
  const { isLoading } = useContext(PlanetContext);
  const { nameFiltered } = useContext(FilterContext);
  return (
    <table>
      {isLoading && <p>Loading...</p>}
      <Header />
      {
        nameFiltered.length > 0 && (
          <tbody>
            {
              nameFiltered.map(({
                name, rotation_period: rotation, orbital_period: orbital, diameter,
                climate, gravity, terrain, surface_water: surface, population,
                films, created, edited, url,
              }) => (
                <tr key={ name }>
                  <td>{name}</td>
                  <td>{rotation}</td>
                  <td>{orbital}</td>
                  <td>{diameter}</td>
                  <td>{climate}</td>
                  <td>{gravity}</td>
                  <td>{terrain}</td>
                  <td>{surface}</td>
                  <td>{population}</td>
                  <td>{films}</td>
                  <td>{created}</td>
                  <td>{edited}</td>
                  <td>{url}</td>
                </tr>

              ))
            }
          </tbody>
        )
      }
    </table>
  );
}

export default Table;
