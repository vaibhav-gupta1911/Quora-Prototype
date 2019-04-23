import axios from "axios";
import { ERRORS, SIGNUP, LOGIN_USER } from "./types";
var setData = require("../components/Localstorage").setData;

export const signupUser = (signupdata, history) => dispatch => {
  console.log("checking data in backend", signupdata);
  // axios
  //   .post("http://52.53.237.212:3001/auth/signup", signupdata)
  //   .then(res => {
  //     console.log("this is the data from back end", res.data);
  //     dispatch({
  //       type: SIGNUP,
  //       payload: user
  //     });
  //     history.push("/login");
  //   })
  // .catch(err => {
  //   dispatch({
  //     type: ERRORS,
  //     payload: err.response.data
  //   });
  // });
};

/****** Login User *****/
export const loginUser = (logindata, history) => dispatch => {
  console.log("checking data in backend", logindata);
  // axios
  //   .post("http://52.53.237.212:3001/auth/login", logindata)
  //   .then(res => {
  //     console.log("inside login back from backedn", res.data);
  //     dispatch({
  //       type: LOGIN_USER,
  //       payload: user
  //     });
  /***** Setting up the data in localstorage *****/
  //     setData(res.data.useremail, res.data.token, res.data.type);
  //     history.push("/interests");
  //   })
  //   .catch(err => {
  //     dispatch({
  //       type: ERRORS,
  //       payload: err.response.data
  //     });
  //   });
};
