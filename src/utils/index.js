import { FB_SCRIPT_URL, LINE_LOGIN_URL } from "../const"

export function encodeUrl(url, params = {}, sign = "?") {
  const keys = Object.keys(params)
  if (!keys.length) return url
  return `${url}${url.includes(sign) ? "" : sign}${keys.map(key => `${key}=${window.encodeURIComponent(params[key])}`).join("&")}`
}

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
    js.src = encodeUrl(FB_SCRIPT_URL, {
      xfbml: 1,
      cookie: 1,
      version: "v8.0",
      appId: process.env.REACT_APP_FB_APP_ID
    }, "#")

    js.addEventListener("load", () => resolve(getFB()))
    js.addEventListener("error", reject)

    document.body.appendChild(js)
  })
}

export function LINELogin() {
  window.location.href = encodeUrl(LINE_LOGIN_URL, {
    response_type: "code",
    client_id: process.env.REACT_APP_LINE_APP_ID,
    redirect_uri: window.location.href,
    state: 123,
    scope: "profile openid email"
  })
}