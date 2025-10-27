import React, { useMemo } from 'react'
import { Table, Popconfirm, QRCode, Tag } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import AntButton from '@/components/AntButton'
import AppQRCode from '@/components/AppQRCode'
import { STATUS_TABLE_MAP } from '@/shared/constants/table'

const TableTable = ({ data, loading, onEdit, onRemove, deletingId }) => {
  const columns = useMemo(
    () => [
      { title: 'Tên bàn', dataIndex: 'table_name' },
      {
        title: 'Sức chứa',
        dataIndex: 'capacity',
        render: (capacity) => <span>{capacity} người</span>,
      },
      {
        title: 'Trạng thái',
        dataIndex: 'status',
        render: (status) => {
          const info = STATUS_TABLE_MAP[status]
          return <Tag color={info?.color}>{info?.text}</Tag>
        },
      },
      {
        title: 'QR Code',
        dataIndex: '_id',
        key: 'qrCode',
        align: 'center',
        render: (_, record) => <AppQRCode tableId={record._id} tableName={record.table_name} />,
      },
      {
        title: 'Thao tác',
        key: 'action',
        width: 120,
        align: 'center',
        render: (_, record) => (
          <div className="flex items-center gap-2">
            <AntButton title="Chỉnh sửa" icon={<EditOutlined />} onClick={() => onEdit(record)} />
            <Popconfirm
              title="Bạn có chắc chắn muốn xoá bàn này?"
              onConfirm={() => onRemove(record._id)}
              okText="Có"
              cancelText="Không"
            >
              <AntButton
                title="Xoá"
                icon={<DeleteOutlined />}
                danger
                loading={deletingId === record._id}
              />
            </Popconfirm>
          </div>
        ),
      },
    ],
    [onEdit, onRemove]
  )
  return <Table rowKey="_id" loading={loading} columns={columns} dataSource={data} />
}

export default TableTable
