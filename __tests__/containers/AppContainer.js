import React from "react";
import AppContainer from "containers/AppContainer";
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducers from 'reducers/index'
import {configure, shallow, mount} from 'enzyme';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import { connect } from 'react-redux'
configure({ adapter: new Adapter() });

describe("AppContainer", ()=>{
  let wrapper, 
      store = createStore(reducers);

  beforeEach(() =>{
      store = createStore(reducers);
      store.dispatch = jest.fn();
      wrapper = shallow(<AppContainer store={store}  />,  { lifecycleExperimental: true });
  });

  test('should return random lat and lng', () => {
    let res = wrapper.props().randomPos();
    expect(res.lat.constructor === Number).toBe(true);
    expect(res.lng.constructor === Number).toBe(true)
  });

  test('should return a fetchData action', () => {
    wrapper.props().fetchData([]);
    expect(store.dispatch).toHaveBeenCalledWith({type: 'FETCHED_DATA', fetchedData: []});
  });

  test('should return a fetchData action', () => {
    let res = wrapper.props().randomPos();
    wrapper.props().setBatmobilePosition(res);
    expect(store.dispatch).toHaveBeenCalledWith({type: 'FETCHED_DATA_BATMOBILE', batMobile: res});
  });
})