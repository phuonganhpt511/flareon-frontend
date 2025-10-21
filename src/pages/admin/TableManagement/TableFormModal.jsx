import { DEFAULT_FORM_VALUES } from '@/shared/constants/table'
import { Modal, Form, Input, Select, InputNumber } from 'antd'

const TableFormModal = ({ open, title, submitting, form, onOk, onCancel }) => {
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
          label="Tên bàn"
          name="table_name"
          rules={[{ required: true, message: 'Vui lòng nhập tên bàn' }]}
        >
          <Input placeholder="Nhập tên bàn" allowClear />
        </Form.Item>

        <Form.Item label="Lượng khách cho phép" name="capacity">
          <InputNumber
            placeholder="Nhập lượng khách cho phép"
            style={{ width: '100%' }}
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
              { value: "empty", label: 'Còn trống' },
              { value: "occupied", label: 'Đã đặt' },
              { value: "reserved", label: 'Đang sử dụng' },
              { value: "maintenance", label: 'Bảo trì' },
            ]}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default TableFormModal
