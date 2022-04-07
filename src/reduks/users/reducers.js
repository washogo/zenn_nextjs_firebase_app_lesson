import * as Actions from "./actions";
import initialState from "../store/initialState";

export const UsersReducer = (state = initialState.users, action) => {
  switch (action.type) {
    case Actions.SIGN_IN:
      return {
        ...state,
        ...action.payload,
        // icon: "",
        // isSignedIn: false,
        // uid: "",
        // username: "",
        // +
        // isSignedIn: action.payload.isSignedIn,
        // uid: action.payload.uid,
        // username: action.payload.username,
        // =
        // icon: "",
        // isSignedIn: action.payload.isSignedIn,
        // uid: action.payload.uid,
        // username: action.payload.username,
      };
    default:
      return state;
  }
};
