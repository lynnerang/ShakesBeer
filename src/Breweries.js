import React, { Component } from 'react';
import Beer from './Beer.js'
import './Breweries.scss';

class Breweries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      beerList: []
    }

    this.toggleFavorite = this.toggleFavorite.bind(this);
  }

  componentWillMount() {
    this.setState({breweryName: this.props.name}, () => this.getBeers());
  }

  toggleBeerList = (e) => {
    const beerList = e.target.closest('.brewery-label').querySelector('.beer-dropdown');
    beerList.classList.toggle('hidden');
  }

  getBeers = () => {
    let match = this.props.dataset.find(brewery => {
      return this.props.id === brewery.FIELD1;
    });
    let beers = match && match.beers ? match.beers : null;
    this.setState({beerList: beers});
  }

  toggleFavorite = () => {
    !this.props.starredBreweries.includes(this.props.id) 
    ? this.props.updateStarredList(this.props.id, 'add')
    : this.props.updateStarredList(this.props.id)
  }
  
  render() {
    let favClass = this.props.starredBreweries.includes(this.props.id) 
    ? 'far fa-star fas' 
    : 'far fa-star';

    return (
      <div className='brewery-label'>
        <div className='brewery-header'>
          <i className={favClass} id='star-filler' onClick={this.toggleFavorite}></i>
          <h2 className='brewery-name' onClick={this.toggleBeerList}>{this.props.name}</h2>
        </div>
        <div className='beer-dropdown hidden'>
        {
        this.state.beerList ? (
          this.state.beerList.map(beer => {
            return <Beer beers={this.state.beerList}
                         beerName={beer.name}
                         key={beer.FIELD1}
                    />
          })
        ) : (null)
        }
        </div>
      </div>
    );
  }
}

export default Breweries;