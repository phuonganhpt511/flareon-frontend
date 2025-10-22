import categoryAPI from '@/apis/category/category.api'
import { DEFAULT_FORM_VALUES } from '@/shared/constants/dish'
import { useQuery } from '@tanstack/react-query'
import { Modal, Form, Input, Select } from 'antd'
import { toast } from 'react-toastify'

const DishFormModal = ({ open, title, submitting, form, onOk, onCancel }) => {
  const {
    data: categories = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['categories', 'list'],
    queryFn: async () => {
      const res = await categoryAPI.getAll()
      return (res.data || []).map((category) => ({
        value: category._id,
        label: category.category_name,
      }))
    },
    onError: () => toast.error('Không thể tải danh mục, vui lòng thử lại!'),
  })

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
          label="Tên món ăn"
          name="dish_name"
          rules={[{ required: true, message: 'Vui lòng nhập tên món ăn' }]}
        >
          <Input placeholder="Nhập tên món ăn" allowClear />
        </Form.Item>

        <Form.Item
          label="Giá"
          name="price"
          rules={[{ required: true, message: 'Vui lòng nhập giá' }]}
        >
          <Input placeholder="Nhập giá" allowClear />
        </Form.Item>

        <Form.Item label="Mô tả" name="description">
          <Input.TextArea placeholder="Mô tả..." rows={3} allowClear />
        </Form.Item>

        <Form.Item label="Ảnh" name="imageUrl">
          <Input placeholder="URL ảnh" allowClear />
        </Form.Item>

        <Form.Item
          label="Danh mục"
          name="category_id"
          rules={[{ required: true, message: 'Vui lòng chọn danh mục' }]}
        >
          <Select
            options={categories}
            loading={isLoading}
            placeholder="Chọn danh mục"
            disabled={!isLoading && isError}
            optionFilterProp="label"
            notFoundContent={isLoading ? 'Đang tải...' : 'Không có danh mục'}
            allowClear
          />
        </Form.Item>

        <Form.Item
          label="Trạng thái"
          name="status"
          rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}
        >
          <Select
            options={[
              { value: 'available', label: 'Còn món' },
              { value: 'unavailable', label: 'Hết món' },
            ]}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default DishFormModal
