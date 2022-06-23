import { DialogState, TableState } from '@/types/commonState'
import { Button, Col, Form, Row, Space, Table } from 'antd'
import React, { useEffect } from 'react'
import { useSetState } from 'ahooks'
import { RoleService } from '@/service/RoleService'
import { InputItem } from '@/components/formItem/InputItem'
import AEDialog from './components/AEDialog'

/**
 * 管理后台角色管理
 */
const RoleManagePage: React.FC = () => {
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
    RoleService.list({ page: pageIndex, size: tableState.pageSize, ...params }).then((res) => {
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
      title: '角色名称',
      dataIndex: 'name',
    },
    {
      title: '权限',
      dataIndex: 'permissionNames',
    },
    {
      title: '操作',
      render: (text: any, record: any) => (
        <Space size="middle">
          <Button size="small" onClick={() => edit(record)}>编辑</Button>
        </Space>
      ),
    },
  ]

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
            <Col span={1} className="table-from-label"></Col>
            <Col span={5}>
              <InputItem name="name" placeholder="请输入角色名称" />
            </Col>
            <Form.Item wrapperCol={{ offset: 1, span: 12 }}>
              <Space>
                <Button htmlType="submit" className="search—Btn">
                  查询
                </Button>
                <Button type="primary" onClick={resetTable}>
                  重置
                </Button>
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
        dataSource={tableState.data}
        scroll={{ x: 'max-content' }}
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

export default RoleManagePage
