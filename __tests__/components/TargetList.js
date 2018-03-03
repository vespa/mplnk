import React from "react";
import TargetList from "components/TargetList";
import renderer from 'react-test-renderer';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe("TargetList", ()=>{
    let wrapper;
    it('should render correctly', () => {
          wrapper = shallow(            
            <TargetList 
              id="teste"
              targets={[{place:"teste", probability:100}]}
            />);
        expect(wrapper).toMatchSnapshot();
    });
})