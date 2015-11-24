import {expect} from 'chai';
import {List, Map} from 'immutable';
import {ADD_KEY, BACK_ONE_KEY} from '../src/actions';
import { reducer, INITIAL_STATE, addNewKey, removeLastKey } from '../src/reducer';

describe('reducer test', () => {

  describe('initial state test', () => {
    it('has key', () => {
      let state = INITIAL_STATE;
      expect(state.has('key')).to.equal(true);

    });

    it('key is a List', () => {
      let state = INITIAL_STATE;
      expect(List.isList(state.get('key'))).to.equal(true);
    });
  });

  describe('Key Actions', () => {

    it('add new key', () => {
      let state = INITIAL_STATE;
      let nextState = addNewKey(state, 'd');

      expect(nextState.get('key')).to.equal(List.of(
        'd'
      ));
      expect(state.get('key')).to.equal(List.of(

      ));
    });

    it('delete last key', () => {
      let state = INITIAL_STATE;
      state = state.updateIn(['key'], List.of(), key => List.of('a', 'b', 'c'));
      let nextState = removeLastKey(state);

      expect(nextState.get('key')).to.equal(List.of(
        'a', 'b'
      ));
      expect(state.get('key')).to.equal(List.of(
        'a', 'b', 'c'
      ));
    });
  });

  describe('Reducers', () => {

    it('handles ADD_KEY', () => {
      let state = INITIAL_STATE;
      const action = {type: ADD_KEY, key: "z"};
      let nextState = reducer(state, action);

      expect(nextState.get('key')).to.equal(List.of("z"));
    });

    it('handles BACK_ONE_KEY', () => {
      let state = INITIAL_STATE;
      state = state.updateIn(['key'], List.of(), key => List.of('a', 'b', 'c'));
      const action = {type: BACK_ONE_KEY};
      let nextState = reducer(state, action);

      expect(nextState.get('key')).to.equal(List.of("a", "b"));
    });
  });

});
