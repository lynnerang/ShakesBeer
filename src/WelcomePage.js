import React, { Component } from 'react';
import Autocomplete from './Autocomplete.js';
import './WelcomePage.scss';

class WelcomePage extends Component {
  constructor(props) {
    super(props);

  }
  
  render() {
    return (
      <div className='welcome-page'>
        <h1 className='welcome-header'>ShakesBeer</h1>
        <div className='search-container'>
          <Autocomplete usStates={this.props.dataset}
                        chooseState={this.props.chooseState}
          />
        </div>
      </div>
    );
  }
}

export default WelcomePage;