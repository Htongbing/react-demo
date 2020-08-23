import React, { createRef, useState } from "react"
import { Input } from "antd"
import "./index.scss"

function LabelInput(props) {
  const [isFocus, setIsfocus] = useState(false)
  const { value, onChange } = props
  const $input = createRef()
  
  return <div className="label-input">
    <div className={`label${isFocus || !!value ? ' is-focus' : ''}`} tabIndex="1" onFocus={() => $input.current.focus()}>用户名</div>
    <Input value={value} onInput={onChange} onFocus={() => setIsfocus(true)} onBlur={() => setIsfocus(false)} ref={$input} />
  </div>
}

export default LabelInput