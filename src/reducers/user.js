import { Record } from "immutable"
import {
  USER_SIGN_OUT,
  USER_SIGN_IN,
  USER_SIGN_UP,
  GOOGLE
} from "../constants"

const token = window.localStorage.getItem("token")

const UserRecord = new Record({
  id: undefined,
  email: "",
  firstName: "",
  lastName: "",
  loaded: false,
  loading: false
})
const AuthRecord = new Record({
  token: token ? token : undefined,
  loading: false,
  loaded: token ? true : false
})
const ReducerState = new Record({
  record: new UserRecord(),
  authentication: new AuthRecord(),
  error: {}
})
const defaultState = new ReducerState()

export default (state = defaultState, action) => {
  const { type, payload } = action
  switch (type) {
    case USER_SIGN_IN + GOOGLE:
    case USER_SIGN_IN:
    case USER_SIGN_UP:
      const { token } = payload
      window.localStorage.setItem("token", token)
      return state
        .set("authentication", new AuthRecord({ token: token, loaded: true }))
        .set("error", {})
    case USER_SIGN_OUT:
      window.localStorage.removeItem("token")
      return state
        .set("authentication", new AuthRecord({ token: undefined, loaded: false }))
        .set("record", new UserRecord({}))
        .set("error", {})
    default:
      return state
  }
}
