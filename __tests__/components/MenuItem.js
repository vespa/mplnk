import React from "react";
import MenuItem from "components/MenuItem";
import renderer from 'react-test-renderer';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe("MenuItem", ()=>{
    let wrapper;
    it('should render correctly with activeRoute equal "true"', () => {

          wrapper = shallow(            
            <MenuItem 
              onClick={()=>{}}
              text="text"
              type="btn-secondary" 
              dataToggle="modal"
              dataTarget="target"
            />);
        expect(wrapper).toMatchSnapshot();
    });
})