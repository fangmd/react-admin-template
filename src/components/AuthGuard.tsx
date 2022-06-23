import { useStore } from '@/store/context'
import { observer } from 'mobx-react-lite'
import React from 'react'

interface Props {
  pKey?: string
}

/**
 * 按钮权限管理
 */
const AuthGuard: React.FC<Props> = ({ children, pKey }) => {
  const { adminStore } = useStore()

  return <>{adminStore.otherPermissions.includes(pKey) && children}</>
}

export default observer(AuthGuard)
