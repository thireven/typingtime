export const INPUT_KEY = 'INPUT_KEY';
export const NEXT_KEY = 'NEXT_KEY';
export const LOAD_TEMPLATE = 'LOAD_TEMPLATE';
export const BACK_ONE_KEY = 'BACK_ONE_KEY';

export function loadTemplate(template) {
  return {
    type: LOAD_TEMPLATE,
    data: template
  }
}

export function inputKey(key) {
  return {
    type: INPUT_KEY,
    key: key
  }
}

export function nextKey() {
  return {
    type: NEXT_KEY
  }
}

export function backspace() {
  return {
    type: BACK_ONE_KEY
  }
}
