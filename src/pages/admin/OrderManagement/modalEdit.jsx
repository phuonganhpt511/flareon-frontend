// TRONG FILE OrderModalEdit.jsx

import React, { useEffect } from 'react'
import { Modal, Form, Select, message } from 'antd'

const OrderModalEdit = ({ open, order, onCancel, onSubmit }) => {
  const [form] = Form.useForm() // Khởi tạo form instance
  const [messageApi, contextHolder] = message.useMessage()

  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Update Success',
    })
  }

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
    success()
  }

  return (
    <>
      {contextHolder}
      <Modal
        title={`Chỉnh sửa đơn #${order?.orderId || ''}`}
        open={open}
        onOk={handleOk}
        onCancel={onCancel}
        okText="Lưu"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical"> {/* 👈 ĐÃ THÊM form={form} */}
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
                { value: 'Completed', label: 'Completed' },
                { value: 'Cancelled', label: 'Cancelled' },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default OrderModalEdit