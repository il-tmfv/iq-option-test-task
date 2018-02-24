import { ON_CHANGE,ON_RESIZE, TOP, BOTTOM } from './consts';

const initialState = {
  [TOP]: '',
  [BOTTOM]: '',
  isMobile: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ON_RESIZE:
      return {...state, isMobile: action.payload};
    case ON_CHANGE:
      const { payload: { value, name } } = action;
      return { ...state, [name]: value };
    default:
      return state;
  }
}
