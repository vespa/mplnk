import React from "react";
import PersonMarker from "components/PersonMarker";
import renderer from 'react-test-renderer';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe("PersonMarker", ()=>{
    let wrapper;
    beforeEach(() =>{
      wrapper = shallow(            
        <PersonMarker 
          name={"test"} 
          color="blue" 
          icon="../img/img.jpg"
        />);
    });
    it('should render correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });
    it('should change infoWindow status', ()=>{
        expect(wrapper.instance().state.isOpen).toBe(true);
        wrapper.instance()._onToggleOpen();
        expect(wrapper.instance().state.isOpen).toBe(false);
        expect(wrapper).toMatchSnapshot();
    });
    it("should trigger _updatePlace", ()=>{
      let e = {
        latLng:{
          lat: ()=> 666,
          lng: ()=> 999,
        }
      }
      wrapper.instance()._updatePlace(e);
      expect(wrapper.instance().state.lat).toBe(666);
      expect(wrapper.instance().state.latInfo).toBe(666);
      expect(wrapper.instance().state.lng).toBe(999);
      expect(wrapper.instance().state.lngInfo).toBe(999);
      expect(wrapper).toMatchSnapshot();
    })
    it("should trigger _updatePlaceInfo", ()=>{
      wrapper.instance()._updatePlaceInfo();
      expect(wrapper.instance().state.latInfo).toBe("");
      expect(wrapper.instance().state.lngInfo).toBe("");
      expect(wrapper).toMatchSnapshot();
    })
    it("should create an updater", ()=>{
      wrapper = shallow(            
        <PersonMarker 
          name={"test"} 
          color="blue" 
          icon="../img/img.jpg"
          update={()=>{ return 'updater' }}
        />);
       expect(wrapper.instance().state.update()).toBe('updater');
    })
})