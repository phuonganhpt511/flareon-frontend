export const STATUS_TABLE_MAP = {
  empty: { color: 'default', text: 'Còn trống' },
  occupied: { color: 'red', text: 'Đã đặt' },
  reserved: { color: 'orange', text: 'Đang sử dụng' },
  maintenance: { color: 'gray', text: 'Bảo trì' },
}

export const DEFAULT_FORM_VALUES = {
  table_name: '',
  capacity: '',
  status: 'empty',
}
