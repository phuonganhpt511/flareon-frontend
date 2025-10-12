import React, { useMemo } from 'react'
import { Table, Image, Badge, Popconfirm } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import AntButton from '@/components/AntButton'

import { STATUS_MAP } from '@/shared/constants/category'

const CategoryTable = ({ data, loading, onEdit, onRemove }) => {
  const columns = useMemo(
    () => [
      {
        title: 'STT',
        dataIndex: 'index',
        align: 'center',
        render: (_, __, index) => <span>{index + 1}</span>,
        width: 70,
      },
      { title: 'Tên danh mục', dataIndex: 'category_name' },
      {
        title: 'Hình ảnh',
        dataIndex: 'imageUrl',
        render: (url) => (
          <Image
            src={url}
            width={100}
            height={100}
            className="rounded-lg object-cover"
            preview={false}
          />
        ),
      },
      {
        title: 'Trạng thái',
        dataIndex: 'status',
        render: (status) => {
          const info = STATUS_MAP[status]
          return <Badge status={info.color} text={info.text} />
        },
      },
      {
        title: 'Thao tác',
        key: 'action',
        width: 120,
        align: 'center',
        render: (_, record) => (
          <div className="flex items-center gap-2">
            <AntButton icon={<EditOutlined />} onClick={() => onEdit(record)} />
            <Popconfirm
              title="Bạn có chắc chắn muốn xoá danh mục này?"
              onConfirm={() => onRemove(record._id)}
              okText="Có"
              cancelText="Không"
            >
              <AntButton icon={<DeleteOutlined />} danger />
            </Popconfirm>
          </div>
        ),
      },
    ],
    [onEdit, onRemove]
  )
  return <Table rowKey="_id" loading={loading} columns={columns} dataSource={data} />
}

export default CategoryTable
