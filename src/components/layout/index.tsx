import { Layout } from 'antd'
import React, { useState } from 'react'
import ContentLayout from './content'
import LayoutSider from './slider'
import './index.less'
import { adminStore, useStore } from '@/store/context'
import { Content, Header } from 'antd/lib/layout/layout'
import { userLoginOut } from '@/utils/biz'
import out from '@/assets/img/out.png'

function AdminLayout(): JSX.Element {
  const { adminStore } = useStore()
  const _logout = () => {
    userLoginOut()
  }

  return (
    <Layout className="AdminLayout">
      <Header className="nav-header">
        <div className="logo">Admin</div>
        <div className="menu">
          {/* <div className="name">{adminStore.userDetails.nickName}</div> */}
          <div className="logout" onClick={_logout}>
            <img className="img-add" src={out} />
            退出
          </div>
        </div>
      </Header>
      <Content>
        <Layout>
          <LayoutSider />
          <Layout>
            <ContentLayout />
          </Layout>
        </Layout>
      </Content>
    </Layout>
  )
}

export default AdminLayout
