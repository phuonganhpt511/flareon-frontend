import React, { useState } from 'react'
import { Card, Table, Tag, Breadcrumb, Space, Button, Select, Input, message, Modal } from 'antd'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import http from '@/apis/http'
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  FilterOutlined,
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons'

import OrderModalEdit from './modalEdit'
import OrderModalDetail from './orderDetail'

const { Option } = Select
const { confirm } = Modal

const OrderManagement = () => {
  const [statusSelected, setStatusSelected] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalDetailOpen, setModalDetailOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [searchText, setSearchtext] = useState('')
  const [messageApi, contextHolder] = message.useMessage()

  const deleteSuccess = () => {
    messageApi.open({
      type: 'success',
      content: 'Xóa đơn hàng thành công!',
    })
  }

  const deleteError = (errorMsg) => { // CẬP NHẬT: Nhận tham số lỗi
    messageApi.open({
      type: 'error',
      content: errorMsg || 'Xóa đơn hàng thất bại!',
    })
  }

  const queryClient = useQueryClient()
  const { data, isLoading, error } = useQuery({
    queryKey: ['orders', statusSelected, searchText],
    queryFn: async () => {
      let url = '/orders'

      const params = []
      if (statusSelected) params.push(`status=${statusSelected}`)
      if (searchText) params.push(`search=${searchText}`)

      if (params.length > 0) {
        url += `?${params.join('&')}`
      }

      const res = await http.get(url)
      // Giả định backend trả về mảng đơn hàng trực tiếp trong res
      return res.data || []
    },
    enabled: true,
  })

  const { mutate: updateOrder } = useMutation({
    mutationFn: async ({ id, data }) => {
      return await http.patch(`/orders/${id}`, data)
    },
    onSuccess: () => {
      message.success('Cập nhật đơn hàng thành công!')
      // ✅ SỬA: Chỉ vô hiệu hóa key gốc, đảm bảo tất cả các query 'orders' đều được tải lại
      queryClient.invalidateQueries({ queryKey: ['orders'] })
    },
    onError: () => {
      message.error('Cập nhật thất bại!')
    },
  })

  const { mutate: deleteOrder } = useMutation({
    mutationFn: async (id) => {
      return await http.delete(`/orders/${id}`)
    },
    onSuccess: () => {
      deleteSuccess()
      // Vô hiệu hóa cache để buộc tải lại danh sách đơn hàng
      queryClient.invalidateQueries({ queryKey: ['orders'] })
    },
    onError: (error) => {
      // ✅ LOGIC XỬ LÝ LỖI CHI TIẾT
      console.error('Lỗi API DELETE Order:', error.response); // Debug trong console

      let errorMessage = 'Xóa đơn hàng thất bại.';
      if (error.response) {
        const status = error.response.status;
        const messageData = error.response.data?.message;

        if (status === 401 || status === 403) {
          errorMessage = `Lỗi ${status} - Phân quyền: Bạn không có quyền xóa đơn hàng này.`;
        } else if (status === 404) {
          errorMessage = 'Lỗi 404: Không tìm thấy đơn hàng.';
        } else if (messageData) {
          errorMessage = `Thất bại: ${messageData}`;
        } else {
          errorMessage = `Lỗi Server: ${status}`;
        }
      }

      deleteError(errorMessage); // Truyền thông báo lỗi chi tiết để hiển thị
    },
  })

  const handleSearch = (value) => {
    setSearchtext(value)
  }

  const handleChange = (value) => {
    setStatusSelected(value)
  }

  const handleUpdate = (value, orderId) => {
    updateOrder({ id: orderId, data: value })
    setModalOpen(false)
  }

  const handleOpenModal = (order) => {
    setSelectedOrder(order)
    setModalOpen(true)
  }

  const handleOpenDetailModal = (order) => {
    setSelectedOrder(order)
    setModalDetailOpen(true)
  }

  const handleCancel = () => {
    setModalOpen(false)
    setModalDetailOpen(false)
    setSelectedOrder(null)
  }

  const columns = [
    {
      title: 'Mã đơn',
      dataIndex: '_id',
      key: '_id',
      render: (v) => <span className="font-medium">#{v.slice(-6)}</span>,
    },
    {
      title: 'Bàn',
      key: 'table_name',
      render: (record) => record.table?.table_name || 'Chưa có bàn',
    },
    {
      title: 'Khách hàng',
      key: 'username',
      render: (record) => record.user?.username || 'Khách lẻ',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const colorMap = {
          Pending: 'gold',
          Processing: 'blue',
          Completed: 'green',
          Cancelled: 'red',
          Shipped: 'purple',
        }
        return <Tag color={colorMap[status] || 'default'}>{status}</Tag>
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => {
        const isFinalized = record.status === 'Cancelled' || record.status === 'Completed';

        if (isFinalized) {
          return (
            <Button
              type="primary"
              danger
              icon={<DeleteOutlined />}
              onClick={() => {
                confirm({
                  title: 'Xác nhận xóa?',
                  content: `Bạn có chắc chắn muốn xóa đơn hàng #${record._id.slice(-6)} này không?`,
                  okText: 'Xóa',
                  okType: 'danger',
                  cancelText: 'Hủy',
                  onOk() {
                    deleteOrder(record._id)
                  },
                })
              }}
            />
          )
        }
        return (
          <Space>
            <Button
              type="default"
              icon={<EyeOutlined />}
              onClick={() => handleOpenDetailModal(record)}
            />
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => handleOpenModal(record)}
            />
          </Space>
        )
      },
    },
  ]

  if (isLoading) return <p>Đang tải đơn hàng...</p>
  if (error) return <p>Lỗi: Không thể tải đơn hàng ({error.message})</p>

  const tableData = Array.isArray(data) ? data : data?.data || [];

  return (
    <>
      {contextHolder}
      <section className="mb-3">
        <h1 className="font-bold text-3xl mb-2">Quản lý đơn hàng</h1>
        <Breadcrumb items={[{ title: 'Trang chủ' }, { title: 'Quản lý đơn hàng' }]} />
      </section>

      <Card className="shadow-sm rounded-2xl xl:col-span-2" title="Đơn hàng gần đây">
        <div className="mb-4 flex justify-between">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 16,
              flexWrap: 'wrap',
              gap: 12,
            }}
          >
            <Space>
              <Input.Search
                placeholder="Tìm kiếm theo bàn hoặc khách hàng..."
                prefix={<SearchOutlined />}
                style={{ width: 260 }}
                onSearch={handleSearch}
              />
            </Space>
            <Space>
              <Select
                placeholder="Lọc theo trạng thái"
                allowClear
                style={{ width: 150 }}
                suffixIcon={<FilterOutlined />}
                value={statusSelected}
                onChange={handleChange}
              >
                <Option value="Pending">Pending</Option>
                <Option value="Processing">Processing</Option>
                <Option value="Shipped">Shipped</Option>
                <Option value="Completed">Completed</Option>
                <Option value="Cancelled">Cancelled</Option>
              </Select>
            </Space>
          </div>
          <Button type="primary" icon={<PlusOutlined />}>
            Thêm đơn hàng
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={tableData}
          rowKey={'_id'}
          pagination={{ pageSize: 20 }}
          className="rounded-xl"
        />
      </Card>

      <OrderModalDetail
        order={selectedOrder}
        open={modalDetailOpen}
        onCancel={() => handleCancel()}
      />

      <OrderModalEdit
        open={modalOpen}
        order={selectedOrder}
        onCancel={() => handleCancel()}
        onSubmit={(value) => handleUpdate(value, selectedOrder?._id)}
      />
    </>
  )
}

export default OrderManagement