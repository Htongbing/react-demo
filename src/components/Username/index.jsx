import React from "react"
import LabelInput from "../LabelInput"
import { Select } from "antd"

const isPhoneReg = /^(\+\d+)-(\d+)$/
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
  let phonePrefix = "+86"

  if (isPhone) {
    phonePrefix = RegExp.$1
    inputValue = RegExp.$2
  }

  return <div className="username-container">
    {isPhone && <Select value={phonePrefix} onChange={prefix => onChangeValue(prefix, inputValue)}>
      <Select.Option value="+86">+86 中国</Select.Option>
      <Select.Option value="+1">+1 美国</Select.Option>
    </Select>}
    <LabelInput label={isPhone ? "手机号" : "邮箱"} value={inputValue} onChange={ev => onChangeValue(phonePrefix, ev.target.value)}></LabelInput>
  </div>
}