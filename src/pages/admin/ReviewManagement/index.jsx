// src/pages/admin/ReviewManagement/index.jsx

import React from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Table, Tag, Button, Space, Rate, Popconfirm, message } from 'antd'
import {
  adminGetAllFeedback,
  adminUpdateFeedbackStatus,
  adminDeleteFeedback,
} from '@/apis/admin/feedback.api.js' // Import file API vừa tạo

// Hàm helper để tạo màu cho Tag trạng thái
const getStatusColor = (status) => {
  switch (status) {
    case 'Pending':
      return 'gold'
    case 'Resolved': // Đã xử lý (Duyệt)
      return 'green'
    case 'Rejected': // Từ chối
      return 'red'
    default:
      return 'default'
  }
}

const ReviewManagement = () => {
  const queryClient = useQueryClient()

  // 1. Dùng useQuery để TẢI DỮ LIỆU
  const {
    data: feedbackData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['admin_feedback'], // Key cho query
    queryFn: adminGetAllFeedback, // Hàm gọi API
    select: (res) => res.data.data, // API của bạn trả về { message: '...', data: [...] }
  })

  // 2. Dùng useMutation để CẬP NHẬT TRẠNG THÁI (Duyệt/Từ chối)
  const updateStatusMutation = useMutation({
    mutationFn: adminUpdateFeedbackStatus,
    onSuccess: () => {
      message.success('Cập nhật trạng thái thành công!')
      // Tải lại danh sách feedback
      queryClient.invalidateQueries(['admin_feedback'])
    },
    onError: (err) => {
      message.error(err.response?.data?.message || 'Cập nhật thất bại')
    },
  })

  // 3. Dùng useMutation để XÓA
  const deleteMutation = useMutation({
    mutationFn: adminDeleteFeedback,
    onSuccess: () => {
      message.success('Xóa feedback thành công!')
      queryClient.invalidateQueries(['admin_feedback'])
    },
    onError: (err) => {
      message.error(err.response?.data?.message || 'Xóa thất bại')
    },
  })

  // --- Xử lý sự kiện ---
  const handleUpdateStatus = (feedbackId, status) => {
    updateStatusMutation.mutate({ feedbackId, status })
  }

  const handleDelete = (feedbackId) => {
    deleteMutation.mutate(feedbackId)
  }

  // 4. Định nghĩa các cột cho bảng
  const columns = [
    {
      title: 'Người dùng',
      dataIndex: 'user_id',
      key: 'user',
      // Backend của bạn đã populate 'user_id'
      render: (user) => user?.username || 'N/A',
    },
    {
      title: 'Món ăn',
      dataIndex: 'dish_id',
      key: 'dish',
      // Backend của bạn cũng nên populate 'dish_id'
      render: (dish) => dish?.dish_name || 'N/A', // Giả sử service đã populate
    },
    {
      title: 'Đánh giá',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating) => <Rate disabled defaultValue={rating} />,
    },
    {
      title: 'Nội dung',
      dataIndex: 'content',
      key: 'content',
      ellipsis: true, // Rút gọn nội dung nếu quá dài
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => <Tag color={getStatusColor(status)}>{status.toUpperCase()}</Tag>,
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          {/* Chỉ hiển thị nút Duyệt/Từ chối khi đang 'Pending' */}
          {record.status === 'Pending' && (
            <>
              <Button
                type="primary"
                onClick={() => handleUpdateStatus(record._id, 'Resolved')}
                loading={updateStatusMutation.isLoading}
              >
                Duyệt
              </Button>
              <Button
                danger
                onClick={() => handleUpdateStatus(record._id, 'Rejected')}
                loading={updateStatusMutation.isLoading}
              >
                Từ chối
              </Button>
            </>
          )}
          {/* Nút Xóa */}
          <Popconfirm
            title="Bạn có chắc muốn xóa?"
            onConfirm={() => handleDelete(record._id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button danger loading={deleteMutation.isLoading}>
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  if (isError) {
    return <div>Lỗi khi tải dữ liệu: {error.message}</div>
  }

  // 5. Render bảng
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Quản lý đánh giá</h1>
      <Table
        columns={columns}
        dataSource={feedbackData} // Dữ liệu từ useQuery
        loading={isLoading} // Trạng thái loading
        rowKey="_id" // Key của mỗi hàng là _id
      />
    </div>
  )
}

export default ReviewManagement
