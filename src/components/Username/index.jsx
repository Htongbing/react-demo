import React, { useState, useEffect } from "react"
import LabelInput from "../LabelInput"

export default function Username(props) {
  const { value } = props
  const [autoFocus, setAutoFocus] = useState(false)
  const isPhone = /^\d+$/.test(value)

  useEffect(() => setAutoFocus(true), [])

  if (isPhone) {
    return <div className="phone-container">
      <LabelInput autoFocus={autoFocus} label="手机号" {...props} />
    </div>
  }

  return <LabelInput autoFocus={autoFocus} label="邮箱" {...props} />
}