import React, { useEffect } from 'react'
import { Modal, Form, Input, Select } from 'antd'

const OrderModalDetail = ({ open, order, onCancel }) => {
  const [form] = Form.useForm()

  useEffect(() => {
    if (order) {
      form.setFieldsValue({
        status: order.status || '',
        table_name: order.table_id?.table_name || '',
        username: order.user_id?.username || '',
        createdAt: new Date(order.createdAt).toLocaleString() || '',
        updatedAt: new Date(order.updatedAt).toLocaleString() || '',
      })
    }
  }, [order, form])

  return (
    <Modal title={`View Detail`} open={open} onCancel={onCancel} onOk={() => onCancel()}>
      <Form form={form} layout="vertical" disabled>
        <Form.Item label="User" name="username">
          <Input />
        </Form.Item>
        <Form.Item label="Table" name="table_name">
          <Input />
        </Form.Item>
        <Form.Item
          name="status"
          label="Trạng thái"
          rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}
        >
          <Select
            placeholder="Chọn trạng thái..."
            options={[
              { value: 'Pending', label: 'Pending' },
              { value: 'Processing', label: 'Processing' },
              { value: 'Shipped', label: 'Shipped' },
              { value: 'Cancelled', label: 'Cancelled' },
            ]}
          />
        </Form.Item>
        <Form.Item label="Create At" name="createdAt">
          <Input />
        </Form.Item>
        <Form.Item label="Update At" name="updatedAt">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default OrderModalDetail
