import React, { Suspense, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import 'normalize.css'
import 'antd/dist/antd.css'
import './assets/css/base.css'
import './assets/css/admin.less'
import '@/assets/css/base-tmp.less'
import { Provider } from '@/store/context'
import adminStore from '@/store/adminStore'
import AdminLayout from '@/components/layout'

const env = process.env.NODE_ENV
console.log(env)

const App = () => {
  useEffect(() => {
    adminStore.init()
  }, [])

  return (
    <Provider>
      <Suspense fallback={<div>Loading...</div>}>
        <BrowserRouter>
          <Switch>
            <Route path="/*" exact component={AdminLayout}></Route>
          </Switch>
        </BrowserRouter>
      </Suspense>
    </Provider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
