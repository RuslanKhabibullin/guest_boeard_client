export const requestData = (body = {}, method = "GET", token = null) => {
  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
  let requestData = {
    method,
    mode: "cors",
    headers: token ? { ...headers, Authorization: `Bearer ${token}` } : headers
  }

  return method === "GET" ? requestData : { ...requestData, body } 
}

export const checkResponseForError = (response) => {
  if (response.ok) {
    return response.json()
  } else {
    throw response
  }
}
