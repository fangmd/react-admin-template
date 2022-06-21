import { RoleService } from '@/service/RoleService'
import { Select } from 'antd'
import React, { useEffect, useState } from 'react'

interface Props {
  value?: any
  onChange?: any
}

/**
 * 角色选择器
 */
export const RoleSelect: React.FC<Props> = ({ value, onChange }) => {
  const [list, setList] = useState<any>([])
  useEffect(() => {
    RoleService.list({ size: 1000, page: 1 }).then((res) => {
      console.log(res)
      setList(res.data?.list ?? [])
    })
  }, [])

  const options = list.map((i) => {
    return {
      value: i.id,
      label: i.name,
    }
  })

  return <Select options={options} onChange={onChange} value={value} />
}
