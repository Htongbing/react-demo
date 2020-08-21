export function FBLogin() {
  const checkStatus = (resolve, reject, { status, authResponse }) => {
    status === "connected" ? resolve(authResponse) : reject(status)
  }
  const getFB = () => ({
    getLoginStatus: () => new Promise((resolve, reject) => {
      window.FB.getLoginStatus(checkStatus.bind(null, resolve, reject))
    }),
    login: () => new Promise((resolve, reject) => {
      window.FB.login(checkStatus.bind(null, resolve, reject))
    }),
    logout: () => new Promise(resolve => {
      window.FB.logout(resolve)
    })
  })
  return new Promise((resolve, reject) => {
    const id = "facebook-jssdk"
    if (document.getElementById("id")) {
      return resolve(getFB())
    }
    const js = document.createElement("script")
    js.id = id
    js.src = `https://connect.facebook.net/en_US/sdk.js#xfbml=1&cookie=1&version=v8.0&autoLogAppEvents=1&appId=${process.env.REACT_APP_FB_APP_ID}`

    js.addEventListener("load", () => resolve(getFB()))
    js.addEventListener("error", reject)

    document.body.appendChild(js)
  })
}