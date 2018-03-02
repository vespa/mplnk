import React from "react";
import Menu from "components/Menu";
import renderer from 'react-test-renderer';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe("Menu", ()=>{
      let wrapper;
      beforeEach(() =>{

      });
    it('should render correctly with activeRoute equal "true"', () => {
          wrapper = mount(            
            <Menu 
              createRoute={()=>{}}
              activeRoute={true}
              modalPlaces={"modalPlaces"}
              modalInstructions={"modalInstructions"}
            />);
        expect(wrapper).toMatchSnapshot();
    });
    it('should render correctly with activeRoute equal "false"', () => {
          wrapper = mount(            
            <Menu 
              createRoute={()=>{}}
              activeRoute={false}
              modalPlaces={"modalPlaces"}
              modalInstructions={"modalInstructions"}
            />);
        expect(wrapper).toMatchSnapshot();
    });
})