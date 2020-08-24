import React from "react"
import LabelInput from "../LabelInput"
import SelectDialCode from "../SelectDialCode"

const isPhoneReg = /^([a-z]+\+\d+)-(\d+)$/i
const isNumber = /^\d+$/ 

export default function Username(props) {
  const { value, onChange } = props

  const onChangeValue = (prefix, input) => {
    let value = input
    if (isNumber.test(input)) {
      value = `${prefix}-${input}`
    }
    onChange(value)
  }

  const isPhone = isPhoneReg.test(value)

  let inputValue = value
  let phonePrefix = "cn+86"

  if (isPhone) {
    phonePrefix = RegExp.$1
    inputValue = RegExp.$2
  }

  return <div className="username-container">
    {isPhone && <SelectDialCode value={phonePrefix} onChange={prefix => onChangeValue(prefix, inputValue)}></SelectDialCode>}
    <LabelInput label={isPhone ? "手机号" : "邮箱"} value={inputValue} onChange={ev => onChangeValue(phonePrefix, ev.target.value)}></LabelInput>
  </div>
}