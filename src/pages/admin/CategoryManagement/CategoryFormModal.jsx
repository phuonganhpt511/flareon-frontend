import { Modal, Form, Input, Select } from 'antd'
import { DEFAULT_FORM_VALUES } from '@/shared/constants/category'

const CategoryFormModal = ({ open, title, submitting, form, onOk, onCancel }) => {

  const validateUrl = (_, value) => {
    if (!value) return Promise.resolve()
    try {
      new URL(value)
      return Promise.resolve()
    } catch {
      return Promise.reject(new Error('Vui lòng nhập URL hợp lệ'))
    }
  }

  const noEdgeSpaces = (_, value) => {
    if (!value) return Promise.resolve()
    if (value !== value.trim()) return Promise.reject(new Error('Không được để khoảng trắng ở đầu hoặc cuối'))
    return Promise.resolve()
  }

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
    >
      <Form form={form} layout="vertical" initialValues={DEFAULT_FORM_VALUES}>
        <Form.Item
          name="category_name"
          label="Tên danh mục"
          rules={[
            { required: true, message: 'Vui lòng nhập tên danh mục' },
            { validator: noEdgeSpaces },
            { min: 2, message: 'Tên ít nhất 2 ký tự' },
            { max: 100, message: 'Tên tối đa 100 ký tự' },
          ]}
        >
          <Input placeholder="Nhập tên danh mục" allowClear maxLength={100} />
        </Form.Item>

        <Form.Item
          name="description"
          label="Mô tả"
          rules={[
            { validator: noEdgeSpaces },
            { max: 500, message: 'Mô tả tối đa 500 ký tự' },
          ]}
        >
          <Input.TextArea rows={4} placeholder="Mô tả (tùy chọn)" allowClear maxLength={500} />
        </Form.Item>

        <Form.Item
          name="imageUrl"
          label="URL ảnh"
          rules={[
            { required: true, message: 'Vui lòng nhập URL ảnh' },
            { validator: validateUrl },
            { validator: noEdgeSpaces },
            { max: 255, message: 'URL quá dài' },
          ]}
        >
          <Input placeholder="http://..." allowClear maxLength={255} />
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