import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

function Table() {
  const { isLoading, planets } = useContext(AppContext);
  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {
        planets.length > 0 && (
          <table>
            <thead>
              <tr>
                {Object.keys(planets[0]).map((keys) => <th key={ keys }>{keys}</th>)}
              </tr>
            </thead>
            <tbody>
              {
                planets.map(({
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
