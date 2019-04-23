import { SIGNUP, LOGIN_USER } from "../Actions/types";
const initialState = {
  user: {}
};
export default function(state = initialState, action) {
  switch (action.type) {
    case SIGNUP:
      return {
        ...state,
        user: action.payload
      };
    case LOGIN_USER:
      return {
        ...state,
        user: action.payload
      };

    default:
      return state;
  }
}
