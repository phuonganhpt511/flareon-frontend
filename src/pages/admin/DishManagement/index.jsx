import React, { useState, useEffect } from 'react'
import { Card, Table, Tag, Breadcrumb, Button, Space, Popconfirm, message } from 'antd'
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import axios from 'axios'

const columns = (onDelete) => [
  {
    title: 'ID',
    dataIndex: 'dish_id',
    key: 'dish_id',
    render: (v) => <span className="font-medium">{v}</span>,
  },
  {
    title: 'Tên món',
    dataIndex: 'dish_name',
    key: 'dish_name',
  },
  {
    title: 'Mô tả',
    dataIndex: 'description',
    key: 'description',
    render: (v) => <span className="truncate block max-w-xs">{v}</span>,
  },
  {
    title: 'Danh mục',
    dataIndex: 'category_name',
    key: 'category_name',
  },
  {
    title: 'Giá',
    dataIndex: 'price',
    key: 'price',
    render: (v) => <span>{v?.toLocaleString()}đ</span>,
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status',
    render: (status) => (
      <Tag color={status === 'available' ? 'green' : 'red'}>
        {status === 'available' ? 'Còn hàng' : 'Hết hàng'}
      </Tag>
    ),
  },
  {
    title: 'Ảnh',
    dataIndex: 'image_url',
    key: 'image_url',
    render: (url) => (
      <img src={url} alt="dish" className="w-16 h-16 object-cover rounded" />
    ),
  },
  {
    title: 'Thao tác',
    key: 'action',
    render: (_, record) => (
      <Space>
        <Link to={`/admin/dishes/update/${record.dish_id}`}>
          <Button type="primary" size="small" icon={<EditOutlined />}>
            Sửa
          </Button>
        </Link>
        <Popconfirm
          title="Bạn có chắc muốn xóa món này?"
          onConfirm={() => onDelete(record.dish_id)}
          okText="Xóa"
          cancelText="Hủy"
        >
          <Button type="default" danger size="small" icon={<DeleteOutlined />}>
            Xóa
          </Button>
        </Popconfirm>
      </Space>
    ),
  },
]

const DishManagement = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    axios.get('http://localhost:8080/api/dishes')
      .then(res => {
        // Nếu backend trả về { success, data }
        setData(res.data.data || res.data)
      })
      .catch(() => setData([]))
  }, [])

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/api/dishes/${id}`)
      .then(() => {
        setData(data => data.filter(item => item.dish_id !== id))
        message.success('Đã xóa món ăn thành công!')
      })
      .catch(() => message.error('Xóa món ăn thất bại!'))
  }

  return (
    <>
      <section className="mb-3">
        <h1 className="font-bold text-3xl mb-2">Quản lý món ăn</h1>
        <Breadcrumb items={[{ title: 'Trang chủ' }, { title: 'Quản lý món ăn' }]} />
      </section>

      <Card
        className="shadow-sm rounded-2xl xl:col-span-2"
        title={
          <div className="flex justify-between items-center">
            <span>Danh sách món ăn</span>
            <Link to="/admin/dishes/create">
              <Button type="primary" icon={<PlusOutlined />}>
                Thêm món ăn
              </Button>
            </Link>
          </div>
        }
      >
        <Table
          columns={columns(handleDelete)}
          dataSource={data}
          pagination={{ pageSize: 5 }}
          className="rounded-xl"
          rowKey="dish_id"
        />
      </Card>
    </>
  )
}

export default DishManagement
