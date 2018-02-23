import { ON_CHANGE } from './consts';

export const onChange = (name, value) => ({ type: ON_CHANGE, payload: { name, value } });
