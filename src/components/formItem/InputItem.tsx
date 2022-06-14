import { Form, Input, Select, DatePicker, TimePicker } from 'antd'
import React, { useEffect, useState } from 'react'
import { FC } from 'react'

/**
 * 输入框
 */
export const InputItem: FC<any> = ({ name, placeholder, ...props }) => {
  return (
    <Form.Item name={name}>
      <Input {...props} placeholder={placeholder} />
    </Form.Item>
  )
}
