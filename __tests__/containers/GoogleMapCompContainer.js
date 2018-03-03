import React from "react";
import GoogleMapContainer from "containers/GoogleMapCompContainer";
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducers from 'reducers/index'
import {configure, shallow, mount} from 'enzyme';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import { connect } from 'react-redux'
import fetchData from 'helpers/fetchData'

configure({ adapter: new Adapter() });

describe("GoogleMapCompContainer", ()=>{
  let wrapper, 
      store = createStore(reducers);

  beforeEach(() =>{
      store = createStore(reducers);
      store.dispatch = jest.fn();
      wrapper = shallow(<GoogleMapContainer store={store}  />);
  });

  test('should test batMobile position', done => {
    global.alert = console.log
    fetchData.get = jest.fn().mockImplementationOnce(cb =>{
      return new Promise((resolve, reject) =>{
          resolve({data:"x"});
      })
    });
    wrapper.props().setBatmobilePosition({}).then(data => {
      expect(fetchData.get.mock.calls.length).toBe(1);
      expect(store.dispatch).toHaveBeenCalledWith({type: 'FETCHED_DATA_BATMOBILE', batMobile:{}});
      expect(store.dispatch).toHaveBeenCalledWith({type: 'FETCHED_DATA_UPDATE_TARGETS', targets:{}});
    }).then(data => {
      done();
    })
  });

  test('should test villain position', done => {
    global.alert = console.log
    fetchData.get = jest.fn().mockImplementationOnce(cb =>{
      return new Promise((resolve, reject) =>{
          resolve({data:"x"});
      })
    });
    wrapper.props().setVillainPosition({}).then(data => {
      expect(fetchData.get.mock.calls.length).toBe(1);
      expect(store.dispatch).toHaveBeenCalledWith({type: 'FETCHED_DATA_VILLAIN_LOCATION', location:{}});
      expect(store.dispatch).toHaveBeenCalledWith({type: 'FETCHED_DATA_UPDATE_TARGETS', targets:{}});
    }).then(data => {
      done();
    })
  });
  
  test('should reject batMobile position', done => {
    global.alert = (message) => {
      expect(message).toBe("OUT OF GOTHAM");
      expect(fetchData.get.mock.calls.length).toBe(1);
      done();
    }
    fetchData.get = jest.fn().mockImplementationOnce(cb =>{
      return new Promise((resolve, reject) =>{
          rejet({data:"x"});
      })
    });
    wrapper.props().setBatmobilePosition({});
  });
  test('should reject villain position', done => {
    global.alert = (message) => {
      expect(message).toBe("OUT OF GOTHAM");
      expect(fetchData.get.mock.calls.length).toBe(1);
      done();
    }
    fetchData.get = jest.fn().mockImplementationOnce(cb =>{
      return new Promise((resolve, reject) =>{
          rejet({data:"x"});
      })
    });
    wrapper.props().setVillainPosition({});
  });
})