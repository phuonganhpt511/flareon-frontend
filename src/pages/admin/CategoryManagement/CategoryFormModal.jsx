import React from 'react'
import { Modal, Form, Input, Select } from 'antd'
import { Controller } from 'react-hook-form'

const CategoryFormModal = ({
  isOpen,
  rowData,
  submitting,
  control,
  errors,
  setValue,
  handleOk,
  onCancel,
}) => {
  const validateStatus = (name) => (errors[name] ? 'error' : '')
  const helpText = (name) => errors[name]?.message

  return (
    <Modal
      title={rowData ? 'Chỉnh sửa danh mục' : 'Thêm mới danh mục'}
      centered
      open={isOpen}
      onOk={handleOk}
      confirmLoading={submitting}
      onCancel={onCancel}
      destroyOnClose
      okText={rowData ? 'Cập nhật' : 'Thêm mới'}
      cancelText="Hủy"
      width={600}
    >
      <Form layout="vertical">
        <Form.Item
          label="Tên danh mục"
          validateStatus={validateStatus('category_name')}
          help={helpText('category_name')}
        >
          <Controller
            name="category_name"
            control={control}
            render={({ field }) => <Input placeholder="Nhập tên danh mục" {...field} />}
          />
        </Form.Item>

        <Form.Item
          label="Mô tả"
          validateStatus={validateStatus('description')}
          help={helpText('description')}
        >
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Input.TextArea rows={3} placeholder="Nhập mô tả danh mục" {...field} />
            )}
          />
        </Form.Item>

        <Form.Item
          label="Đường dẫn hình ảnh"
          validateStatus={validateStatus('imageUrl')}
          help={helpText('imageUrl')}
        >
          <Controller
            name="imageUrl"
            control={control}
            render={({ field }) => (
              <Input placeholder="https://example.com/images/do-uong.jpg" {...field} />
            )}
          />
        </Form.Item>

        <Form.Item
          label="Trạng thái"
          validateStatus={validateStatus('status')}
          help={helpText('status')}
        >
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                onChange={(v) => setValue('status', v)}
                options={[
                  { label: 'Hoạt động', value: 1 },
                  { label: 'Ngừng hoạt động', value: 0 },
                ]}
              />
            )}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CategoryFormModal
