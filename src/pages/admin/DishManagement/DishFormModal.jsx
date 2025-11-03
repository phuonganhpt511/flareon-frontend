import categoryAPI from '@/apis/category/category.api'
import { DEFAULT_FORM_VALUES } from '@/shared/constants/dish'
import { useQuery } from '@tanstack/react-query'
import { Modal, Form, Input, Select, InputNumber } from 'antd'
import { toast } from 'react-toastify'

const noEdgeSpaces = (_, value) => {
  if (value === undefined || value === null || value === '') return Promise.resolve()
  if (typeof value !== 'string') return Promise.resolve()
  if (value !== value.trim()) return Promise.reject(new Error('Không được để khoảng trắng ở đầu hoặc cuối'))
  return Promise.resolve()
}

const validatePrice = (_, value) => {
  if (value === undefined || value === null || value === '') return Promise.resolve()
  if (isNaN(value)) return Promise.reject(new Error('Giá phải là số'))
  if (Number(value) < 0) return Promise.reject(new Error('Giá không được âm'))
  return Promise.resolve()
}

const validateUrl = (_, value) => {
  if (!value) return Promise.resolve()
  if (typeof value !== 'string') return Promise.reject(new Error('URL ảnh không hợp lệ'))
  try {
    new URL(value)
    return Promise.resolve()
  } catch {
    return Promise.reject(new Error('Vui lòng nhập URL hợp lệ'))
  }
}

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
          rules={[
            { required: true, message: 'Vui lòng nhập tên món ăn' },
            { validator: noEdgeSpaces },
            { min: 2, message: 'Tên ít nhất 2 ký tự' },
            { max: 100, message: 'Tên tối đa 100 ký tự' },
          ]}
        >
          <Input placeholder="Nhập tên món ăn" allowClear maxLength={100} />
        </Form.Item>

        <Form.Item
          label="Giá"
          name="price"
          rules={[
            { required: true, message: 'Vui lòng nhập giá' },
            { validator: validatePrice },
          ]}
        >
          <InputNumber min={0} className="w-full" placeholder="Nhập giá" />
        </Form.Item>

        <Form.Item
          label="Mô tả"
          name="description"
          rules={[
            { validator: noEdgeSpaces },
            { max: 500, message: 'Mô tả tối đa 500 ký tự' },
          ]}
        >
          <Input.TextArea placeholder="Mô tả..." rows={3} allowClear maxLength={500} />
        </Form.Item>

        <Form.Item
          label="Ảnh"
          name="imageUrl"
          rules={[
            { validator: noEdgeSpaces },
            { validator: validateUrl },
            { max: 255, message: 'URL ảnh quá dài' },
          ]}
        >
          <Input placeholder="URL ảnh" allowClear maxLength={255} />
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
