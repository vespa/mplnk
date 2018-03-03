import React from "react";
import App from "containers/App";
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducers from 'reducers/index'
import {configure, shallow, mount} from 'enzyme';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import { connect } from 'react-redux'
import fetchData from 'helpers/fetchData'
configure({ adapter: new Adapter() });

describe("App", ()=>{
  let wrapper, 
      store = createStore(reducers);

  beforeEach(() =>{
      store = createStore(reducers);
      store.dispatch = jest.fn();
      fetchData.get = jest.fn().mockImplementationOnce(cb =>{
        return new Promise((resolve, reject) =>{
            resolve({data:"x"});
        })
      });
      wrapper = shallow(<App  store={store}  
                              location={{lat:0, lng:1}} 
                              randomPos={()=>{return {lat:1, lng:1}}}
                              setBatmobilePosition = {()=>{return {lat:1, lng:1}}}
                              targets={[{place:"oi", probability:99}]}
                              modalPlaces={"id"} />);

      wrapper.setProps({
        fetchData: jest.fn(),
      })
  });
  test('should render an match snapshot', () => {
     expect(wrapper).toMatchSnapshot();
  });
  test('should render an match snapshot', () => {
    wrapper.setProps({ location : {lat:1, lng:1} })
    expect(wrapper).toMatchSnapshot();
  });
})