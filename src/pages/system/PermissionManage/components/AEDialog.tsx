import { Form, Input, Modal, Button, Switch, Checkbox, Radio, InputNumber } from 'antd'
import React, { FC, useEffect } from 'react'
import { HttpCode } from '@/constants/HttpCode'
import { DialogMode } from '@/utils/enum'
import { PermissionService } from '@/service/PermissionService'

interface Props {
  data: any
  mode: DialogMode
  show: boolean
  /**内容修改成功回调，页面需要刷新数据 */
  onSuccess: () => void
  onClose: () => void
}

/**
 * 添加&编辑
 */
const AEDialog: FC<Props> = ({ data, mode, show = false, onSuccess, onClose }) => {
  const [form] = Form.useForm()

  useEffect(() => {
    if (mode === 'edit') {
      form.setFieldsValue({
        name: data?.name,
        icon: data?.icon,
        componentPath: data.componentPath,
        urlPath: data.urlPath,
        index: data.index,
        roleType: data.roleType,
        enable: data.enable,
        menuVisible: data.menuVisible,
      })
    }
  }, [show])

  /**提交数据 */
  const _handleUpdate = async () => {
    form
      .validateFields()
      .then((formData) => {
        if (mode === 'add') {
          PermissionService.add({ ...formData }).then((res) => {
            if (res.code === HttpCode.success) {
              onSuccess()
            }
          })
        } else if (mode === 'edit') {
          const tmp = { ...formData }
          PermissionService.edit({ ...tmp, id: data.id }).then((res) => {
            if (res.code === HttpCode.success) {
              onSuccess()
            }
          })
        } else {
          // addChildren
          PermissionService.add({ ...formData, parentId: data.id }).then((res) => {
            if (res.code === HttpCode.success) {
              onSuccess()
            }
          })
        }
      })
      .catch((e) => {
        console.error(e)
      })
  }

  const _formClose = () => {
    form.resetFields()
    onClose()
  }

  const options = [
    { label: '菜单', value: 1 },
    { label: '其他', value: 2 },
  ]

  return (
    <Modal
      title={mode === 'add' ? '创建权限' : '编辑权限'}
      visible={show}
      onCancel={() => onClose()}
      footer={[
        <Button key="back" onClick={_formClose}>
          取消
        </Button>,
        <Button key="submit" type="primary" onClick={_handleUpdate}>
          确定
        </Button>,
      ]}
    >
      <Form
        name="basic"
        labelCol={{ span: 6 }}
        // wrapperCol={{ span: 20 }}
        initialValues={{ remember: true }}
        autoComplete="off"
        form={form}
      >
        <Form.Item label="权限名称" name="name" rules={[{ required: true, message: '请输入' }]}>
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="图标" name="icon" rules={[{ required: true, message: '请输入' }]}>
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="组件地址" name="componentPath" rules={[{ required: true, message: '请输入' }]}>
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="页面 url" name="urlPath" rules={[{ required: true, message: '请输入' }]}>
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="排序" name="index" initialValue={0} rules={[{ required: true, message: '请输入' }]}>
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="角色类型"
          name="roleType"
          valuePropName="checked"
          rules={[{ required: true, message: '请输入' }]}
        >
          <Radio.Group options={options}></Radio.Group>
        </Form.Item>
        <Form.Item
          label="是否开启"
          name="enable"
          valuePropName="checked"
          initialValue={false}
          rules={[{ required: true, message: '请输入' }]}
        >
          <Switch />
        </Form.Item>
        <Form.Item
          label="菜单是否显示"
          name="menuVisible"
          valuePropName="checked"
          initialValue={false}
          rules={[{ required: true, message: '请输入' }]}
        >
          <Switch />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AEDialog
