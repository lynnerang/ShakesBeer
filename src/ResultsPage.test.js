import React from 'react';
import ResultsPage from './ResultsPage.js';
import { shallow } from 'enzyme';

const mockState = 'Pennsylvania'
const mockData = [
  {
  "FIELD1": 90,
  "name": "The Lion Brewery",
  "city": "Wilkes-Barre",
  "state": "Pennsylvania",
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
];

describe('ResultsPage', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
          <ResultsPage selectedState={mockState}
                       dataset={mockData}
          />
      )
  });

  it('Should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('Should have default state', () => {
    expect(wrapper.state()).toEqual( 
      {"beerIbus": ["20-29"], "beerStyles": ["American Amber / Red Ale", "American Black Ale", "American Blonde Ale", "American Brown Ale"], "breweryCities": ["Wilkes-Barre"], "citySelection": "All", "filteredBreweries": [{"FIELD1": 90, "beers": [{"FIELD1": 43, "abv": 0.045, "brewery_id": 60, "ibu": 18, "id": 2544, "name": "Send Help", "ounces": 12, "style": "American Blonde Ale"}, {"FIELD1": 44, "abv": 0.055, "brewery_id": 60, "ibu": null, "id": 2324, "name": "Cast Iron Oatmeal Brown", "ounces": 12, "style": "American Brown Ale"}, {"FIELD1": 45, "abv": 0.06, "brewery_id": 60, "ibu": null, "id": 2288, "name": "Reprise Centennial Red", "ounces": 12, "style": "American Amber / Red Ale"}, {"FIELD1": 46, "abv": 0.055, "brewery_id": 60, "ibu": null, "id": 2287, "name": "Alter Ego", "ounces": 12, "style": "American Black Ale"}], "city": "Wilkes-Barre", "name": "The Lion Brewery", "state": "Pennsylvania"}], "ibuSelection": "All", "starredBreweries": [], "stateBreweries": [{"FIELD1": 90, "beers": [{"FIELD1": 43, "abv": 0.045, "brewery_id": 60, "ibu": 18, "id": 2544, "name": "Send Help", "ounces": 12, "style": "American Blonde Ale"}, {"FIELD1": 44, "abv": 0.055, "brewery_id": 60, "ibu": null, "id": 2324, "name": "Cast Iron Oatmeal Brown", "ounces": 12, "style": "American Brown Ale"}, {"FIELD1": 45, "abv": 0.06, "brewery_id": 60, "ibu": null, "id": 2288, "name": "Reprise Centennial Red", "ounces": 12, "style": "American Amber / Red Ale"}, {"FIELD1": 46, "abv": 0.055, "brewery_id": 60, "ibu": null, "id": 2287, "name": "Alter Ego", "ounces": 12, "style": "American Black Ale"}], "city": "Wilkes-Barre", "name": "The Lion Brewery", "state": "Pennsylvania"}], "styleSelection": "All", "viewingStarred": false}
    )
  });

  it('Should setState for breweryCities', () => {
    wrapper.state().stateBreweries = mockData;
    expect(wrapper.state('breweryCities')).toEqual(['Wilkes-Barre']);
    wrapper.instance().getCities();
    expect(wrapper.state('breweryCities')).toEqual(['Wilkes-Barre']);
  });

  it('Should setState for beerStyles', () => {
    wrapper.state().stateBreweries = mockData
    expect(wrapper.state('beerStyles')).toEqual(["American Amber / Red Ale", "American Black Ale", "American Blonde Ale", "American Brown Ale"]);
    wrapper.instance().getStyles();
    expect(wrapper.state('beerStyles')).toEqual(["American Amber / Red Ale", "American Black Ale", "American Blonde Ale", "American Brown Ale"]);
  });

  it('Should setState for beerIbus', () => {
    wrapper.state().stateBreweries = mockData
    expect(wrapper.state('beerIbus')).toEqual(["20-29"]);
    wrapper.instance().getIbus();
    expect(wrapper.state('beerIbus')).toEqual(["20-29"]);
  });

  it('Should toggle viewingStarred state', () => {
    expect(wrapper.state('viewingStarred')).toEqual(false);
    wrapper.instance().toggleStarView();
    expect(wrapper.state('viewingStarred')).toEqual(true); 
  });

  it('Should setState for filteredBreweries', () => {
    wrapper.state().stateBreweries = mockData
    expect(wrapper.state('filteredBreweries')).toEqual([...mockData]);
    wrapper.instance().refreshBreweryList();
    expect(wrapper.state('filteredBreweries')).toEqual([...mockData]);

  });

  it('Should filter by city and setState of filteredBreweries', () => {
    wrapper.state().filteredBreweries = mockData;
    wrapper.state().citySelection = "Wilkes-Barre";
    expect(wrapper.state('filteredBreweries')).toEqual(mockData);
    wrapper.instance().filterByCity();
    expect(wrapper.state('filteredBreweries')).toEqual(mockData);
  });

  it('Should filter by IBU and setState of filteredBreweries', () => {
    wrapper.state().filteredBreweries = mockData;
    wrapper.state().ibuSelection = "20-29";
    expect(wrapper.state('filteredBreweries')).toEqual(mockData);
    wrapper.instance().filterByIbu();
    expect(wrapper.state('filteredBreweries')).toEqual(mockData);
  });

  it('Should filter by style and setState of filteredBreweries', () => {
    wrapper.state().filteredBreweries = mockData;
    wrapper.state().styleSelection = "American Amber / Red Ale";
    expect(wrapper.state('filteredBreweries')).toEqual(mockData);
    wrapper.instance().filterByStyle();
    expect(wrapper.state('filteredBreweries')).toEqual(mockData);
  });

  it('Should update a given state\'s value', () => {
    const filterName = 'city';
    const value = 'Wilkes-Barre';
    expect(wrapper.state('citySelection')).toEqual('All');
    wrapper.instance().updateFilterSelection(filterName, value);
    expect(wrapper.state('citySelection')).toEqual(value)
  });

  it('Should filter by breweries that are starred and setState for filteredBreweries', () => {
    wrapper.state().viewingStarred = true;
    wrapper.state().starredBreweries = mockData;
    expect(wrapper.state('filteredBreweries')).toEqual(mockData);
    wrapper.instance().filterByStarred();
    expect(wrapper.state('filteredBreweries')).toEqual([]);
  });

  it.skip('Should hideBeerInfo when clicked', () => {
    const mock = jest.fn()
    const mockElement = 'dropdown'
    const mockItems = {classList: {add: mock}}
    global.document.querySelectAll = ()=>[mockItems]
    
    wrapper.instance().hideBeerInfo(mockElement);
    expect(mock).toHaveBeenCalled()
  });

  it('Should set the state for stateBreweries', () => {
    expect(wrapper.state('stateBreweries')).toEqual(mockData);
    wrapper.instance().getStateBreweries();
    expect(wrapper.state('stateBreweries')).toEqual(mockData);    
  });
});