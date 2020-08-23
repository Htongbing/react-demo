import React, { createRef, useState } from "react"
import { Input } from "antd"
import "./index.scss"

function LabelInput(props) {
  const [isFocus, setIsfocus] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const $input = createRef()
  
  return <div className="label-input">
    <div className={`label${isFocus || !!inputValue ? ' is-focus' : ''}`} tabIndex="1" onFocus={() => $input.current.focus()}>用户名</div>
    <Input value={inputValue} onInput={e => setInputValue(e.target.value)} onFocus={() => setIsfocus(true)} onBlur={() => setIsfocus(false)} ref={$input} />
  </div>
}

export default LabelInput