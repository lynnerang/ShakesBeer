import React from 'react';
import Breweries from './Breweries.js';
import { shallow } from 'enzyme';

const updateStarredListMock = jest.fn();
const mockData = [
    {
    "FIELD1": 90,
    "name": "The Lion Brewery",
    "city": "Wilkes-Barre",
    "state": "PA",
    "beers": [ {
        "FIELD1": 43,
        "abv": 0.045,
        "ibu": 18,
        "id": 2544,
        "name": "Send Help",
        "style": "American Blonde Ale",
        "brewery_id": 60,
        "ounces": 12
      },
      {
        "FIELD1": 44,
        "abv": 0.055,
        "ibu": null,
        "id": 2324,
        "name": "Cast Iron Oatmeal Brown",
        "style": "American Brown Ale",
        "brewery_id": 60,
        "ounces": 12
      },
      {
        "FIELD1": 45,
        "abv": 0.06,
        "ibu": null,
        "id": 2288,
        "name": "Reprise Centennial Red",
        "style": "American Amber / Red Ale",
        "brewery_id": 60,
        "ounces": 12
      },
      {
        "FIELD1": 46,
        "abv": 0.055,
        "ibu": null,
        "id": 2287,
        "name": "Alter Ego",
        "style": "American Black Ale",
        "brewery_id": 60,
        "ounces": 12
      }
    ]
  }
]

describe('Breweries', () => {
    let wrapper;
    beforeEach(() => {
     
        wrapper = shallow (
            <Breweries  name={mockData[0].name}
                        id={mockData[0].FIELD1}
                        dataset={mockData}
                        starredBreweries={mockData}
                        updateStarredList={updateStarredListMock}
                        key={0}
            />
        )
    });

    it('Should match the snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('Should have default state', () => {
        expect(wrapper.state()).toEqual({"beerList": [{"FIELD1": 43, "abv": 0.045, "brewery_id": 60, "ibu": 18, "id": 2544, "name": "Send Help", "ounces": 12, "style": "American Blonde Ale"}, {"FIELD1": 44, "abv": 0.055, "brewery_id": 60, "ibu": null, "id": 2324, "name": "Cast Iron Oatmeal Brown", "ounces": 12, "style": "American Brown Ale"}, {"FIELD1": 45, "abv": 0.06, "brewery_id": 60, "ibu": null, "id": 2288, "name": "Reprise Centennial Red", "ounces": 12, "style": "American Amber / Red Ale"}, {"FIELD1": 46, "abv": 0.055, "brewery_id": 60, "ibu": null, "id": 2287, "name": "Alter Ego", "ounces": 12, "style": "American Black Ale"}], "breweryName": "The Lion Brewery"})
    });

    it('Should toggle its favorites', () => {
      wrapper.instance().toggleFavorite();
      let add = 'add'
      expect(updateStarredListMock).toHaveBeenCalledWith(mockData[0].FIELD1, add)
    });

    it('Should set the state of beerList', () => {
      expect(wrapper.state('beerList')).toEqual(mockData[0].beers);
      wrapper.instance().getBeers();
      expect(wrapper.state('beerList')).toEqual(mockData[0].beers)
    });

    it('Should toggleBeerList when clicked', () => {
      const mock = jest.fn()
      const mockEvent = {
        target:{
          closest: ()=>({
            querySelector: () => ({
              classList: {toggle: mock}
            })
        })
      }
    }

      wrapper.find('.brewery-name').simulate('click', mockEvent);
      expect(mock).toHaveBeenCalled();
    });

    it('Should toggleFavorites when clicked', ()=> {
      
      wrapper.find('#star-filler').simulate('click');
      expect(updateStarredListMock).toHaveBeenCalled();
    })

});

