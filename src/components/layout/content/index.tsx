import { Layout } from 'antd'
import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import routeList from '@/router'
import loadable from '@loadable/component'
import { log } from 'console'
import HomePage from '@/pages/home'

type ContentLayoutProps = {
  location: any
}

function ContentLayout({ location }: ContentLayoutProps): JSX.Element {
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
  mergeMenu(tempMenuList, routeList)

  console.log('route.componentPath', tempMenuList)

  return (
    <Layout.Content>
      <Routes location={location}>
        {tempMenuList.map((route) => {
          return (
            // <Route
            //   element={React.createElement(
            //     loadable(() => import(/* webpackChunkName: 'page'*/ `../../../pages${route.componentPath}`))
            //   )}
            //   key={route.path}
            //   path={route.path}
            // />
            <Route element={React.createElement(route.component)} key={route.path} path={route.path} />
          )
        })}
        {/* <Redirect to="/error/404" /> */}
      </Routes>
    </Layout.Content>
  )
}

export default ContentLayout
