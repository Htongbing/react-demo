import React from "react"
import { Select } from "antd"
import countries from "../../const/countries"
import "./index.scss"

const selectOptions = countries.map(({name, iso2, dialCode}) => {
  const value = `+${dialCode}`
  return <Select.Option key={name} value={`${iso2}${value}`} label={
    <div className="select-dial-code-option">
      <div className={`iti__flag iti__${iso2}`}></div>
      <span className="value">{value}</span>
    </div>
  }>
    <div className="select-dial-code-option">
      <div className={`iti__flag iti__${iso2}`}></div>
      <span className="name">{name}</span>
      <span className="value">{value}</span>
    </div>
  </Select.Option>
})

export default function SelectDialCode(props) {
  return <Select className="select-dial-code" optionLabelProp="label" dropdownMatchSelectWidth={false} virtual={false} {...props}>
    {selectOptions}
  </Select>
}