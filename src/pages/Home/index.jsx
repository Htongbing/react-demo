import React, { useState, useEffect } from "react"
import "./index.scss"
import { Spin, Button } from "antd"
import LoginForm from "../../components/LoginForm"
import { FBLogin } from "../../utils"

const formListData = [
  {
    type: "input",
    name: "username",
    rules: [
      {
        required: true,
        message: "not empty"
      }
    ],
    inputAttrs: {
      placeholder: "Email"
    }
  },
  {
    type: "password",
    name: "password",
    rules: [
      {
        required: true,
        message: "not empty"
      }
    ],
    inputAttrs: {
      placeholder: "Password"
    }
  }
]

export default function Home() {
  const [formListLoading, setFormListLoading] = useState(false)
  const [formList, setFormList] = useState([])

  const [FBDisabled, setFBDisabled] = useState(true)
  const [FBloginFn, setFBLoginFn] = useState(null)
  const [FBlogoutFn, setFBLogoutFn] = useState(null)
  const [FBLogoutLoading, setFBLogoutLoading] = useState(false)

  const [isLogined, setIsLogined] = useState(false)

  useEffect(() => {
    setFormListLoading(true)
    setTimeout(() => {
      setFormList(formListData)
      setFormListLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    ;(async () => {
      const { getLoginStatus, login, logout } = await FBLogin()
      setFBLoginFn(() => login)
      setFBLogoutFn(() => logout)
      try {
        await getLoginStatus()
        setIsLogined(true)
      } catch (e) {
        setFBDisabled(false)
      }
    })()
  }, [])

  const onSubmit = data => new Promise(resolve => {
    console.log(data)
    setTimeout(resolve, 1000)
  })

  const loginToFB = async () => {
    if (!FBloginFn) return
    await FBloginFn()
    setIsLogined(true)
  }

  const logoutToFB = async () => {
    if (!FBlogoutFn) return
    setFBLogoutLoading(true)
    try {
      await FBlogoutFn()
      setIsLogined(false)
      setFBDisabled(false)
    } finally {
      setFBLogoutLoading(false)
    }
  }

  const render = () => {
    if (!isLogined) {
      return <>
        <LoginForm title="Sign In" formList={formList} onSubmit={onSubmit}></LoginForm>
        <Button block disabled={FBDisabled} onClick={loginToFB}>Sign in with Facebook</Button>
        <Button block>Sign in with LINE</Button>
      </>
    }
    return <>
      <h3>已登录</h3>
      <Button block onClick={logoutToFB} loading={FBLogoutLoading}>Sign out</Button>
    </>
  }

  return <main>
    <div className="login-container">
      <Spin spinning={formListLoading}>
        {render()}
      </Spin>
    </div>
  </main>
}