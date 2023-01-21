import React, { useContext } from 'react';
import FilterContext from '../context/FilterContext';
import PlanetContext from '../context/PlanetContext';

function Table() {
  const { isLoading, planets } = useContext(PlanetContext);
  const { nameFilter, setNameFilter, nameFiltered } = useContext(FilterContext);
  return (
    <div>
      <input
        type="text"
        data-testid="name-filter"
        value={ nameFilter }
        name="nameFilter"
        onChange={ ({ target }) => setNameFilter(target.value) }
      />
      {isLoading && <p>Loading...</p>}
      {
        nameFiltered.length > 0 && (
          <table>
            <thead>
              <tr>
                {Object.keys(planets[0]).map((keys) => <th key={ keys }>{keys}</th>)}
              </tr>
            </thead>
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
          </table>
        )
      }
    </div>
  );
}

export default Table;
