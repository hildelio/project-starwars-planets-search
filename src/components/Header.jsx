import React, { useContext } from 'react';
import FilterContext from '../context/FilterContext';
import PlanetContext from '../context/PlanetContext';

function Header() {
  const { planets } = useContext(PlanetContext);
  const { header } = useContext(FilterContext);

  return (
    <thead>
      {
        header.length > 0 && (
          <tr>
            {Object.keys(planets[0]).map((keys) => <th key={ keys }>{keys}</th>)}
          </tr>
        )
      }
    </thead>
  );
}

export default Header;
