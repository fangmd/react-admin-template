import { useStore } from '@/store/context'
import { Layout, Menu } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function LayoutSider(): JSX.Element {
  const store = useStore()

  /**
   * 创建菜单节点
   */
  const getMenuNodes = (_menuList: any[]) => {
    return _menuList.reduce((pre, item) => {
      // TODO: 权限控制，动态路由
      if (item.children) {
        pre.push(
          <Menu.SubMenu
            key={item.path}
            title={
              <span>
                {item.icon && React.createElement(item.icon)}
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
            <Link to={item.path}>
              {item.icon && React.createElement(item.icon)}
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        )
      }
      return pre
    }, [])
  }

  return (
    <Layout.Sider>
      <Menu mode="inline" theme="dark">
        {getMenuNodes(store.adminStore.menu)}
      </Menu>
    </Layout.Sider>
  )
}

export default observer(LayoutSider)
