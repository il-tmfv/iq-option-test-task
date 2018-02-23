import { ON_CHANGE, TOP, BOTTOM } from './consts';

const initialState = {
  [TOP]: '',
  [BOTTOM]: '',
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ON_CHANGE:
      const { payload: { value, name } } = action;
      return { ...state, [name]: value };
    default:
      return state;
  }
}
