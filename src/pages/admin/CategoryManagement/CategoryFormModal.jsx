import { Modal, Form, Input, Select } from 'antd'
import { DEFAULT_FORM_VALUES } from '@/shared/constants/category'

const CategoryFormModal = ({ open, title, submitting, form, onOk, onCancel }) => {
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
          label="Tên danh mục"
          name="category_name"
          rules={[{ required: true, message: 'Vui lòng nhập tên danh mục' }]}
        >
          <Input placeholder="Nhập tên danh mục" allowClear/>
        </Form.Item>

        <Form.Item label="Mô tả" name="description">
          <Input.TextArea placeholder="Mô tả..." rows={3} allowClear/>
        </Form.Item>

        <Form.Item label="Ảnh" name="imageUrl">
          <Input placeholder="URL ảnh" allowClear/>
        </Form.Item>

        <Form.Item
          label="Trạng thái"
          name="status"
          rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}
        >
          <Select
            options={[
              { value: 1, label: 'Hoạt động' },
              { value: 0, label: 'Ngừng hoạt động' },
            ]}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CategoryFormModal
