import React from "react";
import GothamMarker from "components/GothamMarker";
import renderer from 'react-test-renderer';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe("GothamMarker", ()=>{
      let wrapper;
      beforeEach(() =>{
          wrapper = shallow(            
            <GothamMarker 
                place="teste"
                location= {{lat:0, lng:0}}
                probability={100}
            />);
      });
    it('should render correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });
    it('should change infoWindow status', ()=>{
        wrapper.props().onClick();
        expect(wrapper.instance().state.isOpen).toBe(true);
        expect(wrapper).toMatchSnapshot();
    })
})