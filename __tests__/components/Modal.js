import React from "react";
import Modal from "components/Modal";
import renderer from 'react-test-renderer';
import {configure, shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe("Modal", ()=>{
      let wrapper;
      beforeEach(() =>{

      });
    it('should render correctly with activeRoute equal "true"', () => {
      wrapper = mount(            
      <Modal id={'x'}> <span>MESSAGE</span> </Modal>);
      expect(wrapper).toMatchSnapshot();
    });

})