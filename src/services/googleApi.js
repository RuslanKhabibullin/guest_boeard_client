export function googleAuthInit(clientID = process.env.REACT_APP_GOOGLE_CLIENT) {
  setTimeout(() => {
    window.gapi.load("auth2", function() {
      window.gapi.auth2
        .init({ client_id: clientID })
        .then(
          auth2 => console.log("Google oauth init OK", auth2),
          error => console.log("Google oauth error", error)
        )
    })
  }, 1000)
}

export function googleSignIn() {
  return window.gapi.auth2.getAuthInstance().signIn()
}
