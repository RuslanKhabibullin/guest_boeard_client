import { BASE_URL } from "../constants"
import { requestData } from "./base"

export const fetchMessagesRequest = (token, page, limit) => {
  return fetch(`${BASE_URL}/messages?page=${page}&limit=${limit}`, requestData({}, "GET", token))
}

export const createMessageRequest = (token, content) => {
  return fetch(`${BASE_URL}/messages`, requestData(
    JSON.stringify({ message: { content }}),
    "POST",
    token
  ))
}
