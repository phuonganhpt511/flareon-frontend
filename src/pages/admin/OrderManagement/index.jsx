import React, { useState } from 'react'
import { Card, Table, Tag, Breadcrumb, Space, Button, Select, Input, message } from 'antd'
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

const OrderManagement = () => {
  const [statusSelected, setStatusSelected] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalDetailOpen, setModalDetailOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(null)
  // const [searchtext, setSearchtext] = useState('')

  const queryClient = useQueryClient()
  const { data, isLoading, error } = useQuery({
    queryKey: ['orders', statusSelected],
    queryFn: async () => {
      if (!statusSelected) {
        const res = await http.get('/orders')
        return res.data
      } else {
        const res = await http.get(`/orders?status=${statusSelected}`)
        return res.data
      }
    },
    enabled: true,
  })
  const { mutate } = useMutation({
    mutationFn: async ({ id, data }) => {
      return await http.patch(`/orders/${id}`, data)
    },
    onSuccess: () => {
      message.success('Cập nhật đơn hàng thành công!')
      queryClient.invalidateQueries(['orders']) // làm mới danh sách orders
    },
    onError: () => {
      message.error('Cập nhật thất bại!')
    },
  })
  // const handleSearch = (value) => {
  //   setSearchtext(value)
  // }

  const handleChange = (value) => {
    setStatusSelected(value)
  }

  const handleUpdate = (value, orderId) => {
    mutate({ id: orderId, data: value })
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
      render: (record) => record.table_id?.table_name || 'Chưa có bàn',
    },
    {
      title: 'Khách hàng',
      key: 'username',
      render: (record) => record.user_id?.username || 'Khách lẻ',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const colorMap = {
          Pending: 'gold',
          Processing: 'blue',
          Complete: 'green',
          Cancelled: 'red',
        }
        return <Tag color={colorMap[status] || 'default'}>{status}</Tag>
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => {
        if (record.status === 'Cancelled' || record.status === 'Complete') {
          return (
            <Button
              type="primary"
              danger
              icon={<DeleteOutlined />}
              onClick={() => console.log(record)}
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

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>
  return (
    <>
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
              <Input
                placeholder="Tìm kiếm theo bàn hoặc khách hàng..."
                prefix={<SearchOutlined />}
                style={{ width: 260 }}
                // onChange={(e) => handleSearch(e.target.value)}
              />
              <Button type="primary">Search</Button>
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
          dataSource={data}
          rowKey={'_id'}
          pagination={{ pageSize: 5 }}
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
