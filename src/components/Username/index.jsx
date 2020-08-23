import React, { useState, useEffect } from "react"
import LabelInput from "../LabelInput"
import { Select } from "antd"

const isPhoneReg = /^(\+\d+)-(\d+)$/
const isNumber = /^\d+$/ 

export default function Username(props) {
  const { value, onChange } = props

  const initIsPhone = isPhoneReg.test(value)
  const [isPhone, setIsPhone] = useState(initIsPhone)
  const [phonePrefix, setPhonePrefix] = useState(initIsPhone ? RegExp.$1 : "+86")
  const [inputValue, setInputValue] = useState(initIsPhone ? RegExp.$2 : value)

  const onChangeValue = (prefix, input) => {
    let value = input
    if (isNumber.test(input)) {
      value = `${prefix}-${input}`
    }
    onChange(value)
  }

  useEffect(() => {
    const isPhone = isPhoneReg.test(value)
    setIsPhone(isPhone)
    if (isPhone) {
      setPhonePrefix(RegExp.$1)
      setInputValue(RegExp.$2)
      return
    }
    setInputValue(value)
  }, [value])

  return <div className="username-container">
    {isPhone && <Select value={phonePrefix} onChange={prefix => onChangeValue(prefix, inputValue)}>
      <Select.Option value="+86">+86 中国</Select.Option>
      <Select.Option value="+1">+1 美国</Select.Option>
    </Select>}
    <LabelInput label={isPhone ? "手机号" : "邮箱"} value={inputValue} onChange={ev => onChangeValue(phonePrefix, ev.target.value)}></LabelInput>
  </div>
}