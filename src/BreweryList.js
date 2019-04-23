import React from 'react';
import Breweries from './Breweries.js'

function BreweryList(props) {
  return (
    <div>
      {
        props.filteredBreweries.map((brewery, index) => {
          return (
            <Breweries name={brewery.name}
                       id={brewery.FIELD1}
                       dataset={props.dataset}
                       starredBreweries={props.starredBreweries}
                       updateStarredList={props.updateStarredList}
                       key={index}
            />
          )
        })
      }
    </div>
  )
}

export default BreweryList;