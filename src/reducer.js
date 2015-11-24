import * as actions from './actions';
import {List, Map} from 'immutable';

export const INITIAL_STATE = Map({
  input: Map({
    code: -1,
    string: '',
    isWrong: false,
  }),
  currentKey: Map({
    code: -1,
    string: '',
    line: 0,
    position: -1,
  }),
  template: []
});

export function reducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case actions.INPUT_KEY:
      return newInput(state, action.key);
    case actions.NEXT_KEY:
      return nextKey(state);
    case actions.BACK_ONE_KEY:
      return removeLastKey(state);
    case actions.LOAD_TEMPLATE:
      return loadTemplate(state, action.data);
    default:
      return state;
  }
}

export function loadTemplate(state, data) {
  state = state.setIn(['template'], data.split("\n"));
  return nextKey(state);
}

export function nextKey(state) {
  let line = state.get('currentKey').get('line'),
      position = state.get('currentKey').get('position'),
      template = state.get('template');

  if(position >= template[line].length - 1) {
    line++;
    position = 0;
  } else {
    position++;
  }

  let newState = state.withMutations(oldState => {
    oldState
      .setIn(['input', 'isWrong'], false)
      .setIn(['currentKey', 'code'], template[line].charCodeAt(position))
      .setIn(['currentKey', 'string'], template[line].charAt(position))
      .setIn(['currentKey', 'position'], position)
      .setIn(['currentKey', 'line'], line);
  });

  return newState;
}

export function newInput(state, newKey) {
  if(newKey == state.get('currentKey').get('code')) {
    state = nextKey(state);
  } else {
    state = state.setIn(['input', 'isWrong'], true);
  }

  return state;
}

export function removeLastKey(state) {
  return state.updateIn(['key'], List(), key => key.pop());
}
