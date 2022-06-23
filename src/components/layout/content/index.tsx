import { Layout } from 'antd'
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import loadable from '@loadable/component'
import { useStore } from '@/store/context'
import { observer } from 'mobx-react-lite'

type ContentLayoutProps = {
  location: any
}

function ContentLayout({ location }: ContentLayoutProps): JSX.Element {
  const store = useStore()

  const mergeMenu = (list: any, routeList: any) => {
    for (const menu of routeList) {
      if (menu.children) {
        mergeMenu(list, menu.children)
      } else {
        list.push(menu)
      }
    }
  }
  const tempMenuList: any[] = []

  // 这个地方必须同步创建路由，否则会自动转发到 /error/404 界面
  mergeMenu(tempMenuList, store.adminStore.menu)

  return (
    <Layout.Content>
      <Routes location={location}>
        {tempMenuList.map((route) => {
          return (
            <Route
              element={React.createElement(
                loadable(() => import(/* webpackChunkName: 'page'*/ `../../../pages${route.componentPath}`))
              )}
              key={route.urlPath}
              path={route.urlPath}
            />
          )
        })}
        {/* <Redirect to="/error/404" /> */}
      </Routes>
    </Layout.Content>
  )
}

export default observer(ContentLayout)
