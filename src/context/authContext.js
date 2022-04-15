import createDataContext from "./createDataContext";
import url from "../api/url";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { navigate } from "../navigationRes";

const authReducer = (state, action) => {
  switch (action.type) {
    case "sign":
      return { ...state, token: action.payload, isSignIn: true };
    case "restore":
      return { ...state, token: action.payload, isSignIn: true };
    case "addErr":
      return { ...state, errorMsg: action.payload };
    case "signout":
      return { ...state, token: null, isSignIn: false };
    default:
      return state;
  }
};

const signIn = (dispatch) => async (username, password) => {
  try {
    const res = await url.post("/login", {
      username: username,
      password: password,
    });

    await AsyncStorage.setItem("token", res.data.token);
    dispatch({ type: "sign", payload: res.data.token });
    navigate("Main");
  } catch (error) {
    console.log(error.message);
    dispatch({ type: "addErr", payload: "something went wrong" });
  }
};
const restoreToken = (dispatch) => (token) => {
  dispatch({ type: "restore", payload: token });
};
const logout = (dispatch) => async () => {
  await AsyncStorage.removeItem("token");
  await dispatch({ type: "signout" });
  navigate("Login");
};
export const { Provider, Context } = createDataContext(
  authReducer,
  { signIn, restoreToken, logout },
  { token: null, errorMsg: "", isSignIn: false }
);
