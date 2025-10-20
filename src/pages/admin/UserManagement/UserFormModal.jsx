import { Modal, Form, Input, Select } from 'antd'
import { DEFAULT_FORM_VALUES } from '@/shared/constants/category'

const UserFormModal = ({ open, title, submitting, form, onOk, onCancel }) => {
  return (
    <Modal
      title={title}
      centered
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      okText="Lưu"
      cancelText="Hủy"
      confirmLoading={submitting}
      destroyOnClose
    >
      <Form form={form} layout="vertical" initialValues={DEFAULT_FORM_VALUES}>
        <Form.Item
          label="Tên người dùng"
          name="username"
          rules={[{ required: true, message: 'Vui lòng nhập tên người dùng' }]}
        >
          <Input placeholder="Nhập tên người dùng" allowClear />
        </Form.Item>

        <Form.Item label="Email" name="email">
          <Input placeholder="Nhập email" allowClear />
        </Form.Item>

        <Form.Item label="Số điện thoại" name="phone">
          <Input placeholder="Nhập số điện thoại" allowClear />
        </Form.Item>

        <Form.Item label="Mật khẩu" name="password">
          <Input.Password placeholder="Nhập mật khẩu" allowClear />
        </Form.Item>

        <Form.Item
          label="Vai trò"
          name="role"
          rules={[{ required: true, message: 'Vui lòng chọn vai trò' }]}
        >
          <Select
            options={[
              { value: 0, label: 'Người dùng' },
              { value: 1, label: 'Phục vụ' },
              { value: 2, label: 'Thu ngân' },
              { value: 3, label: 'Nhân viên bếp' },
              { value: 4, label: 'Quản trị viên' },
            ]}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default UserFormModal
