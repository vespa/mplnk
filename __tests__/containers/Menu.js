import React from "react";
import Menu from "containers/Menu";
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducers from 'reducers/index'
import {configure, shallow, mount} from 'enzyme';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import { connect } from 'react-redux'
configure({ adapter: new Adapter() });

describe("Menu", ()=>{
  let wrapper, 
      store = createStore(reducers);

  beforeEach(() =>{
      store = createStore(reducers);
      store.dispatch = jest.fn();
      wrapper = shallow(<Menu store={store}  modalInstructions={"x"} modalPlaces={"x"}/>);
  });

  test('should render ', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should dispatch an actions ', () => {
    wrapper.props().createRoute(true)({preventDefault: () => {} });
    expect(store.dispatch).toHaveBeenCalledWith({type: 'MENU_ACTIVE_ROUTE', activeRoute: false});
  });


})