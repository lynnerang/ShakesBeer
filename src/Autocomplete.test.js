import React from 'react';
import Autocomplete from './Autocomplete.js';
import { shallow } from 'enzyme';


const mockData = [1,2,3,4];
const mockFunc = jest.fn();

describe('Autocomplete', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow (
        <Autocomplete suggestions={mockData}
                      dataset={mockData}
                      chooseState={mockFunc}
        />
      )

  });
  it.skip('Should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it.skip('Should have default state', () => {
        expect(wrapper.state()).toEqual(
            {
                activeSuggestion: 0,
                filteredSuggestions: [],
                showSuggestions: false,
                userInput: ""
            }
        )
    });




});