import React, { useState } from "react"
import "./index.scss"
import { Form, Input, Button } from "antd"
import LabelInput from "../../components/LabelInput"
import Username from "../../components/Username"

function generateForm(formList) {
  return formList.map(input => {
    const { type, inputAttrs, ...attrs } = input
    return <Form.Item key={attrs.name} {...attrs}>
      {generateInput(type, inputAttrs)}
    </Form.Item>
  })
}

function generateInput(type, attrs) {
  if (type === "password") {
    return <Input.Password {...attrs}/>
  }
  return <Input {...attrs}/>
}

export default function LoginForm(props) {
  const [loading, setLoading] = useState(false)

  const onSubmit = data => {
    setLoading(true)
    props.onSubmit(data)
      .finally(() => setLoading(false))
  }

  return <div className="login-form">
    <h1 className="title">
      {props.title}
    </h1>
    <Form onFinish={onSubmit}>
      {generateForm(props.formList)}
      <Form.Item key="test" name="test">
        <Username></Username>
      </Form.Item>
      <Form.Item key="test222" name="test222">
        <LabelInput label="test"></LabelInput>
      </Form.Item>
      <Form.Item>
        <Button block type="primary" htmlType="submit" loading={loading}>
          {props.title}
        </Button>
      </Form.Item>
    </Form>
  </div>
}