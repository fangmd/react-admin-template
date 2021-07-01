import { Layout } from 'antd'
import React, { useState } from 'react'
import ContentLayout from './content'
import LayoutSider from './slider'
import './index.less'

function AdminLayout(): JSX.Element {
  return (
    <Layout className='AdminLayout'>
      <LayoutSider />
      <Layout>
        <ContentLayout />
      </Layout>
    </Layout>
  )
}

export default AdminLayout
