import { ON_CHANGE, ON_RESIZE } from './consts';

const detectMobile = () => {
  return window.innerWidth <= 768;
};

export const onChange = (name, value) => ({ type: ON_CHANGE, payload: { name, value } });
export const onResize = () => ({ type: ON_RESIZE, payload: detectMobile() });
