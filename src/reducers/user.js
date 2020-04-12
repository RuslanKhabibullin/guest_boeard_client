import { Record } from "immutable"
import {
  USER_SIGN_OUT,
  USER_SIGN_IN,
  USER_SIGN_UP,
  GOOGLE,
  SUCCESS,
  START,
  FAIL
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
    case USER_SIGN_IN + GOOGLE + START:
    case USER_SIGN_IN + START:
    case USER_SIGN_UP + START:
      return state
        .set("authentication", new AuthRecord({ token: undefined, loading: true, loaded: false }))
        .set("record", new UserRecord({}))
        .set("error", {})
    case USER_SIGN_IN + GOOGLE + FAIL:
    case USER_SIGN_IN + FAIL:
    case USER_SIGN_UP + FAIL:
      const { error } = payload
      return state
        .set("authentication", new AuthRecord({ loaded: false }))
        .set("error", error)
    case USER_SIGN_IN + GOOGLE + SUCCESS:
    case USER_SIGN_IN + SUCCESS:
    case USER_SIGN_UP + SUCCESS:
      const { token } = payload
      window.localStorage.setItem("token", token)
      return state
        .set("authentication", new AuthRecord({ token: token, loaded: true }))
        .set("record", new UserRecord({}))
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
