import React from 'react'
import { FC } from 'react'

/**
 * 是否显示
 */
export const TrueFalseColumn: FC<any> = ({ value, ...props }) => {
  return <>{value ? '是' : '否'}</>
}
