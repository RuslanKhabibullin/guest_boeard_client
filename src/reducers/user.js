import { Record } from "immutable"
import {
  USER_SIGN_OUT,
  USER_SIGN_IN,
  USER_SIGN_UP
} from "../constants"

const userId = window.localStorage.getItem("userId")
const token = window.localStorage.getItem("token")

const UserRecord = new Record({
  id: userId ? userId : undefined,
  email: "",
  loaded: false,
  loading: false
})
const AuthRecord = new Record({
  token: token ? token : undefined,
  loading: false,
  loaded: token && userId ? true : false
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
    case USER_SIGN_IN:
    case USER_SIGN_UP:
      window.localStorage.setItem("userId", 1)
      window.localStorage.setItem("token", "token")
      return state
        .set("authentication", new AuthRecord({ token: "token", loaded: true }))
        .set("record", new UserRecord({ id: 1, email: payload.email, loaded: true }))
        .set("error", {})
    case USER_SIGN_OUT:
      window.localStorage.removeItem("userId")
      window.localStorage.removeItem("token")
      return state
        .set("authentication", new AuthRecord({ token: undefined, loaded: false }))
        .set("record", new UserRecord({ id: undefined }))
        .set("error", {})
    default:
      return state
  }
}
