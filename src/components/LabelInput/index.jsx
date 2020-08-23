import React, { useState, createRef } from "react"
import { Input } from "antd"
import "./index.scss"

export default props => {
  const [isFocus, setIsfocus] = useState(false)
  const { value, onChange, label, autoFocus } = props

  const $input = createRef()
  
  return <div className="label-input">
    <div className={`label${isFocus || !!value ? ' is-focus' : ''}`} tabIndex="1" onFocus={() => $input.current.focus()}>{label}</div>
    <Input autoFocus={autoFocus} value={value} onInput={onChange} onFocus={() => setIsfocus(true)} onBlur={() => setIsfocus(false)} ref={$input} />
  </div>
}