import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import errors from "./errors";
import authReducer from "./authReducer";
export default combineReducers({
  auth: authReducer,
  errors: errors,
  form: formReducer
});
