import { PermissionService } from '@/service/PermissionService'
import { Tree } from 'antd'
import React, { useEffect, useState } from 'react'

interface Props {
  value?: any
  onChange?: any
}

/**
 * 权限级联选择器
 */
export const PermissionTree: React.FC<Props> = ({ value, onChange }) => {
  const [list, setList] = useState<any>([])
  const [permissionIdArr, setPermissionIdArr] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  //   const dealData = (dList) => {
  //     if (!dList) return
  //     dList = dList.map((i) => {
  //       return {
  //         value: i.id,
  //         label: i.name,
  //         children: dealData(i.children),
  //       }
  //     })
  //     return dList
  //   }

  useEffect(() => {
    setLoading(true)
    PermissionService.list({ size: 1000, page: 1 })
      .then((res) => {
        console.log(res)
        const dList = res.data?.list ?? []
        //   dList = dealData(dList)
        setList(dList)
        // console.log('dList', dList)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    // console.log('value', value)
    value && setPermissionIdArr(JSON.parse(value))
  }, [value])

  const onCascaderChange = (checkedKeys) => {
    console.log('onCascaderChange', checkedKeys)
    onChange(JSON.stringify(checkedKeys))
  }

  return (
    <>
      {!loading && (
        <Tree
          treeData={list}
          checkable
          selectable={false}
          onCheck={onCascaderChange}
          checkedKeys={permissionIdArr}
          multiple
          fieldNames={{ title: 'name', key: 'id', children: 'children' }}
        />
      )}
    </>
  )
}
