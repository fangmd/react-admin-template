import { DialogState, TableState } from '@/types/commonState'
import { Button, Form, Modal, Row, Space, Table } from 'antd'
import React, { useEffect } from 'react'
import { useSetState } from 'ahooks'
import { PermissionService } from '@/service/PermissionService'
import AEDialog from './components/AEDialog'
import { TrueFalseColumn } from '@/components/tableColumn/TrueFalseColumn'
import { HttpCode } from '@/constants/HttpCode'
import AuthGuard from '@/components/AuthGuard'

/**
 * 管理后台权限/菜单管理
 */
const PermissionManagePage: React.FC = () => {
  const [form] = Form.useForm()

  const [tableState, setTableState] = useSetState<TableState>({
    pageIndex: 1,
    pageSize: 10,
    total: 0,
    data: [],
  })

  const [dialogState, setDialogState] = useSetState<DialogState>({
    showDialog: false,
    selectedData: null,
    dialogMode: 'add',
  })

  useEffect(() => {
    loadData(tableState.pageIndex)
  }, [tableState.pageIndex])

  const loadData = (pageIndex) => {
    const params = form.getFieldsValue()
    PermissionService.list({ page: pageIndex, size: tableState.pageSize, ...params }).then((res) => {
      setTableState({
        data: res.data?.list ?? [],
        total: res.data?.total ?? 0,
      })
    })
  }

  const columns = [
    {
      title: '序号',
      render: (text, record, index) => `${index + 1}`,
    },
    {
      title: '排序',
      dataIndex: 'index',
    },
    {
      title: '权限/菜单名称',
      dataIndex: 'name',
    },
    {
      title: '图标',
      dataIndex: 'icon',
    },
    {
      title: '组件地址',
      dataIndex: 'componentPath',
    },
    {
      title: '页面 url',
      dataIndex: 'urlPath',
    },
    {
      title: '角色类型',
      dataIndex: 'roleType',
    },
    {
      title: '是否开启',
      dataIndex: 'enable',
      render: (value: any) => {
        return <TrueFalseColumn value={value} />
      },
    },
    {
      title: '菜单是否显示',
      dataIndex: 'menuVisible',
      render: (value: any) => {
        return <TrueFalseColumn value={value} />
      },
    },
    {
      title: '操作',
      fixed: 'right',
      render: (text: any, record: any) => (
        <Space size="small">
          <AuthGuard pKey="/system/PermissionManage/EditBtn">
            <Button size="small" onClick={() => edit(record)}>
              编辑
            </Button>
          </AuthGuard>
          <AuthGuard pKey="/system/PermissionManage/AddBtn">
            <Button size="small" onClick={() => addChildren(record)}>
              添加
            </Button>
          </AuthGuard>
          <AuthGuard pKey="/system/PermissionManage/DeleteBtn">
            <Button size="small" type="default" danger onClick={() => _delItem(record)}>
              删除
            </Button>
          </AuthGuard>
        </Space>
      ),
    },
  ]

  /**删除 */
  const _delItem = (record) => {
    Modal.confirm({
      title: '确定删除',
      content: '将删除该数据',
      okText: '确认',
      okType: 'primary',
      cancelText: '返回',
      onOk: () => {
        PermissionService.delete({ ids: [record.id] }).then((res) => {
          if (res.code === HttpCode.success) {
            loadData(tableState.pageIndex)
          }
        })
      },
    })
  }

  const onPaginationChange = (page: number, pageSize: number) => {
    setTableState({
      pageSize: pageSize,
      pageIndex: page,
    })
  }

  /**编辑 */
  const edit = (record) => {
    setDialogState({
      dialogMode: 'edit',
      selectedData: record,
      showDialog: true,
    })
  }

  /**添加 */
  const showAdd = () => {
    setDialogState({
      selectedData: null,
      dialogMode: 'add',
      showDialog: true,
    })
  }

  const addChildren = (record) => {
    setDialogState({
      selectedData: record,
      dialogMode: 'addChildren',
      showDialog: true,
    })
  }

  /**筛选 */
  const onFinish = () => {
    setTableState({ pageIndex: 1 })
    loadData(1)
  }

  /**重置 */
  const resetTable = () => {
    form.resetFields()
    setTableState({ pageIndex: 1 })
    loadData(1)
  }

  const _onDialogSuccess = () => {
    setDialogState({
      selectedData: null,
      showDialog: false,
    })
    loadData(tableState.pageIndex)
  }

  const _onDialogClose = () => {
    setDialogState({
      selectedData: null,
      showDialog: false,
    })
  }

  return (
    <div className="page-root">
      <div>
        <Form name="basic" initialValues={{ remember: true }} onFinish={onFinish} form={form}>
          <Row gutter={[10, 0]}>
            <Form.Item wrapperCol={{ offset: 1, span: 12 }}>
              <Space>
                <Button type="primary" onClick={showAdd}>
                  添加
                </Button>
              </Space>
            </Form.Item>
          </Row>
        </Form>
      </div>
      <Table
        rowKey="id"
        columns={columns}
        scroll={{ x: 'max-content' }}
        dataSource={tableState.data}
        pagination={{
          onChange: onPaginationChange,
          showSizeChanger: true,
          showQuickJumper: true,
          pageSize: tableState.pageSize,
          total: tableState.total,
        }}
      />

      {dialogState.showDialog && (
        <AEDialog
          data={dialogState.selectedData}
          mode={dialogState.dialogMode}
          onSuccess={_onDialogSuccess}
          show={dialogState.showDialog}
          onClose={_onDialogClose}
        />
      )}
    </div>
  )
}

export default PermissionManagePage
