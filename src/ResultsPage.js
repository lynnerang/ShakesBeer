import React, { Component } from 'react';
import './ResultsPage.scss';
import Controls from './Controls.js'
import BreweryList from './BreweryList.js'
import logo from './images/shakesbeerlogosmall.png';

let starredData = JSON.parse(localStorage.getItem('userStarredList')) || [];

class ResultsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stateBreweries: [],
      filteredBreweries: [],
      starredBreweries: starredData,
      breweryCities: [],
      beerStyles: [],
      beerIbus: [],
      citySelection: 'All', 
      styleSelection: 'All',
      ibuSelection: 'All',
      viewingStarred: false
    }

    this.updateStarredList = this.updateStarredList.bind(this);
  }

  componentWillMount() {
    this.getStateBreweries();
  }

  getStateBreweries = () => {
    let stateBreweries = this.props.dataset.filter(brewery => {
      return brewery.state === this.props.selectedState;
    })
    this.setState({ stateBreweries: stateBreweries }, () => {
      this.refreshBreweryList();
      this.getCities();
      this.getStyles();
      this.getIbus();
    })
  }

  getCities = () => {
    let cities = this.state.stateBreweries.reduce((acc, brewery) => {
      if(!acc.includes(brewery.city)) {
        acc.push(brewery.city)
      }
      return acc;
    }, []).sort();
    this.setState({ breweryCities: cities });
  } 

  getStyles = () => {
    let styles = this.state.stateBreweries.reduce((acc, brewery) => {
      brewery.beers.forEach(beer => {
        if(!acc.includes(beer.style) && beer.style !== '') {
          acc.push(beer.style)
        }
      })
      return acc;
    }, []).sort();

    this.setState({ beerStyles: styles });
  } 

  getIbus = () => {
    let ibus = this.state.stateBreweries.reduce((acc, brewery) => {
      brewery.beers.forEach(beer => {
        const ibuMinRange = Math.round(beer.ibu / 10) * 10;
        const ibuOption = `${ibuMinRange}-${ibuMinRange + 9}`;
        if(!acc.includes(ibuOption) && beer.ibu !== null) {
          acc.push(ibuOption);
        }
      })
      return acc;
    }, []).sort().sort((a, b) => a.length - b.length);
    this.setState({ beerIbus: ibus });
  }

  updateFilterSelection = (filterName, value) => {
    const propertyName = `${filterName}Selection`;
    this.setState({ [propertyName]: value });
    this.refreshBreweryList();
  }

  toggleStarView = () => {
    this.setState({ viewingStarred: !this.state.viewingStarred }, () => {
      this.refreshBreweryList();
    });
  }

  refreshBreweryList = () => {
    this.hideBeerInfo('dropdown');
    this.hideBeerInfo('description');
    this.setState({ filteredBreweries: [...this.state.stateBreweries] }, () => this.filterByCity());
  }

  hideBeerInfo = (element) => {
    document.querySelectorAll(`.beer-${element}`).forEach(item => {
      item.classList.add('hidden');
    });
  }

  filterByCity = () => {
    if (this.state.citySelection !== 'All') {
      let filterResults = this.state.filteredBreweries.filter(brewery => {
        return brewery.city === this.state.citySelection;
      });
      this.setState({ filteredBreweries: filterResults }, () => this.filterByStyle());
    } else {
      this.filterByStyle();
    }
  }

  filterByStyle = () => {
    if (this.state.styleSelection !== 'All') {
      let filterResults = this.state.filteredBreweries.reduce((acc, brewery) => {
        let breweryStyles = brewery.beers.map(beer => beer.style);
        if(breweryStyles.includes(this.state.styleSelection)) {
          acc.push(brewery);
        }
        return acc;
      }, [])
      this.setState({filteredBreweries: filterResults}, () => this.filterByIbu());
    } else {
      this.filterByIbu();
    }
  }

  filterByIbu = () => {
    if (this.state.ibuSelection !== 'All') {
      let filterResults = this.state.filteredBreweries.reduce((acc, brewery) => {
        let breweryIbus = brewery.beers.map(beer => {
          return `${Math.round(beer.ibu / 10) * 10}-${(Math.round(beer.ibu / 10) * 10) + 9}`;
        });
        if (breweryIbus.includes(this.state.ibuSelection)) {
          acc.push(brewery);
        }
        return acc;
      }, []);
      this.setState({ filteredBreweries: filterResults }, () => this.filterByStarred());
    } else {
      this.filterByStarred();
    }
  }

  updateStarredList = (id, change) => {
    let list = this.state.starredBreweries;
    if (change === 'add') {
      list.push(id)
    } else {
      const matchingIndex = list.indexOf(list.find(obj => obj.id === id));
      list.splice(matchingIndex, 1);
    }
    this.setState({starredBreweries: list}, () => {
      localStorage.setItem('userStarredList', JSON.stringify(this.state.starredBreweries))
    });
  }

  filterByStarred = () => {
    if (this.state.viewingStarred === true) {
      let filterResults = this.state.filteredBreweries.filter(brewery => {
        return this.state.starredBreweries.includes(brewery.FIELD1);
      })
      this.setState({filteredBreweries: filterResults})
    }
  }

  goBackHome = () => {
    window.location.reload()
  }
 
  render() {
    const beerCount = this.state.filteredBreweries.reduce((sum, brewery) => {
      sum += brewery.beers.length;
      return sum;
    }, 0)    
    return (
      <div className='results-page'>
        <header>
          <i className='fas fa-arrow-left' onClick={this.goBackHome}></i>
          <img className='logo' src={logo} alt='shakesbeer logo'/>
          <h1 className='results-header'>ShakesBeer</h1>
        </header>
        <main>
          <div className='brewery-list-header'>
            <img className='flag' src={require(`./images/${this.props.selectedState.toLowerCase()}.png`)} alt='state flag'/>
            <h2 className='state-subheading'>{this.props.selectedState} Brewery List</h2> 
            <img className='flag' src={require(`./images/${this.props.selectedState.toLowerCase()}.png`)} alt='state flag'/>
          </div>
          <div className='brew-cards'>
            <Controls breweryCities={this.state.breweryCities} 
                      beerStyles={this.state.beerStyles}
                      beerIbus={this.state.beerIbus}
                      updateFilterSelection={this.updateFilterSelection}
                      toggleStarView={this.toggleStarView}
            />
            <p className='results-count'>Viewing {this.state.filteredBreweries.length} breweries with {beerCount} beers</p>
            <BreweryList filteredBreweries={this.state.filteredBreweries} 
                         dataset={this.props.dataset}
                         updateStarredList={this.updateStarredList}
                         starredBreweries={this.state.starredBreweries}
            />
          </div>
        </main>
      </div>
    );
  }
}

export default ResultsPage;