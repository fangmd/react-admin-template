import loadable from '@loadable/component'
import { HomeOutlined, TableOutlined, BorderlessTableOutlined, UserOutlined } from '@ant-design/icons'

const HomePage = loadable(() => import(/* webpackChunkName: 'HomePage'*/ '@/pages/home'))
const MinePage = loadable(() => import(/* webpackChunkName: 'MinePage'*/ '@/pages/mine/mine'))
const Table = loadable(() => import(/* webpackChunkName: 'Table'*/ '@/pages/table'))

const PermissionManage = loadable(() => import(/* webpackChunkName: 'system'*/ '@/pages/system/PermissionManage'))
const RoleManage = loadable(() => import(/* webpackChunkName: 'system'*/ '@/pages/system/RoleManage'))
const UserManage = loadable(() => import(/* webpackChunkName: 'system'*/ '@/pages/system/UserManage'))


export default [
  {
    path: '/',
    component: HomePage,
    title: '首页',
    icon: HomeOutlined,
  },
  {
    path: '/table',
    title: '表格',
    icon: TableOutlined,
    children: [
      { path: '/table/table1', component: Table, title: '表格1', icon: BorderlessTableOutlined },
      { path: '/table/table2', component: Table, title: '表格2', icon: BorderlessTableOutlined },
    ],
  },
  { path: '/admin-user', component: MinePage, title: '用户管理', icon: UserOutlined },
  {
    path: '/system',
    component: MinePage,
    title: '系统管理',
    icon: UserOutlined,
    children: [
      { path: '/system/menu', component: PermissionManage, title: '权限管理', icon: BorderlessTableOutlined },
      { path: '/system/role', component: RoleManage, title: '角色管理', icon: BorderlessTableOutlined },
      { path: '/system/user', component: UserManage, title: '用户管理', icon: BorderlessTableOutlined },
    ],
  },
]
