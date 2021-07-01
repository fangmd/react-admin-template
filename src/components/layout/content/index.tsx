import { Layout } from 'antd'
import React, { useEffect, useState } from 'react'
import { Redirect, Route, Switch, withRouter } from 'react-router-dom'
import routeList from '@/router'

type ContentLayoutProps = {
  location: any
}

function ContentLayout({ location }: ContentLayoutProps): JSX.Element {
  const mergeMenu = (list: any, routeList: any) => {
    for (const menu of routeList) {
      list.push(menu)
      if (menu.children) {
        mergeMenu(list, menu.children)
      }
    }
  }
  const tempMenuList: any[] = []
  // 这个地方必须同步创建路由，否则会自动转发到 /error/404 界面
  mergeMenu(tempMenuList, routeList)

  return (
    <Layout.Content>
      <Switch location={location}>
        {tempMenuList.map((route) => {
          // 动态路由
          //   return handleFilter(route) && <Route component={route.component} key={route.path} path={route.path} />
          return <Route exact component={route.component} key={route.path} path={route.path} />
        })}
        <Redirect to="/error/404" />
      </Switch>
    </Layout.Content>
  )
}

export default withRouter(ContentLayout)
