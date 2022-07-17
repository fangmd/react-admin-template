import React, { Suspense, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import 'normalize.css'
import 'antd/dist/antd.css'
import './assets/css/base.css'
import './assets/css/admin.less'
import '@/assets/css/base-tmp.less'
import { adminStore, Provider } from '@/store/context'
import AdminLayout from '@/components/layout'
import LoginPage from '@/pages/Login'

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
          <Routes>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/*" element={<AdminLayout />}></Route>
          </Routes>
        </BrowserRouter>
      </Suspense>
    </Provider>
  )
}

createRoot(document.getElementById('root')!).render(<App />)