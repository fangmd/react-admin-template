import { useStore } from '@/store/context'
import { HomeOutlined } from '@ant-design/icons'
import { Layout, Menu } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

function LayoutSider(): JSX.Element {
  const store = useStore()
  const history = useHistory()

  const onMenuClick = (e: any) => {
    console.log(e)
    history.push(e.key)
  }

  const a = HomeOutlined

  /**
   * 创建菜单节点
   */
  const getMenuNodes = (_menuList: any[]) => {
    return _menuList.reduce((pre, item) => {
      if (item.children) {
        pre.push(
          <Menu.SubMenu
            key={item.path}
            title={
              <span>
                {React.createElement(item.icon)}
                <span>{item.title}</span>
              </span>
            }
          >
            {getMenuNodes(item.children)}
          </Menu.SubMenu>
        )
      } else {
        pre.push(
          <Menu.Item key={item.path}>
            <span>
              {React.createElement(item.icon)}
              <span>{item.title}</span>
            </span>
          </Menu.Item>
        )
      }
      return pre
    }, [])
  }

  return (
    <Layout.Sider>
      <Menu onClick={onMenuClick} mode="inline" theme="dark">
        {getMenuNodes(store.adminStore.menu)}
      </Menu>
    </Layout.Sider>
  )
}

export default observer(LayoutSider)
