import { useStore } from '@/store/context'
import { Layout, Menu } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'

function LayoutSider(): JSX.Element {
  const store = useStore()
  const location = useLocation()
  const selectedKeys = [location.pathname]

  /**
   * 创建菜单节点
   */
  const getMenuNodes = (_menuList: any[]) => {
    const ret = _menuList.reduce((pre, item) => {
      if (!item.menuVisible) return pre
      if (item.children && item.children.length > 0 && item.children.find((res) => res.menuVisible === true)) {
        pre.push(
          <Menu.SubMenu
            key={item.urlPath}
            title={
              <span>
                {item.icon && React.createElement(item.icon)}
                <span>{item.name}</span>
              </span>
            }
          >
            {getMenuNodes(item.children)}
          </Menu.SubMenu>
        )
      } else {
        pre.push(
          <Menu.Item key={item.urlPath}>
            <Link to={item.urlPath}>
              {item.icon && React.createElement(item.icon)}
              <span>{item.name}</span>
            </Link>
          </Menu.Item>
        )
      }
      return pre
    }, [])
    return ret
  }

  return (
    <Layout.Sider>
      <Menu mode="inline" theme="dark" selectedKeys={selectedKeys}>
        {getMenuNodes(store.adminStore.menu)}
      </Menu>
    </Layout.Sider>
  )
}

export default observer(LayoutSider)
