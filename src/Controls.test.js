import React from 'react';
import Controls from './Controls.js';
import { shallow } from 'enzyme';

const mockData = [1,2,3,4]
const mockFunc = jest.fn()

describe('Controls', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow (
            <Controls breweryCities={mockData} 
                      beerStyles={mockData}
                      beerIbus={mockFunc}
                      updateFilterSelection={mockFunc}
            />
        )
    });

    it('Should match the snapshot', () => {
        expect(wrapper).toMatchSnapshot()
    });

    it('Should update the city when the passed down method is called', () => {
        const mockEvent = {target:{value:'e'}}
        wrapper.instance().updateCity(mockEvent)
        expect(mockFunc).toHaveBeenCalledWith('city', 'e')
    });

    it('Should update the style when the passed down method is called', () => {
        const mockEvent = {target:{value:'e'}}
        wrapper.instance().updateStyle(mockEvent)
        expect(mockFunc).toHaveBeenCalledWith('style', 'e')
    });

    it('Should update the IBU when the passed down method is called', () => {
        const mockEvent = {target:{value:'e'}}
        wrapper.instance().updateIbu(mockEvent)
        expect(mockFunc).toHaveBeenCalledWith('ibu', 'e')
    });

    it('Should simulate a click calling the method being passed down to the child', () => {
        wrapper.find('#fav-filter').simulate('click');
        expect(mockFunc).toHaveBeenCalled();
    });

});