import React, { useEffect } from 'react'
import { Modal, Form, Input, Select } from 'antd'

const OrderModalEdit = ({ open, order, onCancel, onSubmit }) => {
  const [form] = Form.useForm()

  useEffect(() => {
    if (order) {
      form.setFieldsValue({
        status: order.status || '',
      })
    }
  }, [order, form])

  const handleOk = () => {
    form.validateFields().then((values) => {
      onSubmit(values)

      form.resetFields()
    })
  }

  return (
    <Modal
      title={`Chỉnh sửa đơn #${order?.orderId || ''}`}
      open={open}
      onOk={handleOk}
      onCancel={onCancel}
      okText="Lưu"
      cancelText="Hủy"
    >
      <Form form={form} layout="vertical">
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
      </Form>
    </Modal>
  )
}

export default OrderModalEdit
