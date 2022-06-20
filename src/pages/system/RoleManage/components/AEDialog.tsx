import { Form, Input, Modal, Button } from 'antd'
import React, { FC, useEffect } from 'react'
import { HttpCode } from '@/constants/HttpCode'
import { DialogMode } from '@/utils/enum'
import { RoleService } from '@/service/RoleService'

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
      })
    }
  }, [show])

  /**提交数据 */
  const _handleUpdate = async () => {
    form
      .validateFields()
      .then((formData) => {
        if (mode === 'add') {
          RoleService.add({ ...formData }).then((res) => {
            if (res.code === HttpCode.success) {
              onSuccess()
            }
          })
        } else {
          const tmp = { ...formData }
          RoleService.edit({ ...tmp, id: data.id }).then((res) => {
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

  const pwdRole = mode === 'add' ? [{ required: true, message: '请输入' }] : [{ required: false }]

  return (
    <Modal
      title={mode === 'add' ? '创建角色' : '编辑角色'}
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
        labelCol={{ span: 4 }}
        // wrapperCol={{ span: 20 }}
        initialValues={{ remember: true }}
        autoComplete="off"
        form={form}
      >
        <Form.Item label="角色名称" name="name" rules={[{ required: true, message: '请输入' }]}>
          <Input placeholder="请输入角色名称" />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AEDialog
