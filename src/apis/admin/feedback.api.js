// src/apis/admin/feedback.api.js
import http from '@/apis/http'

// Lấy token (vì các API admin cần xác thực)
const getToken = () => localStorage.getItem('token')

/**
 * [Admin] Lấy tất cả feedback
 * GET /feedback
 */
export const adminGetAllFeedback = () => {
  return http.get('/feedback', {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })
}

/**
 * [Admin] Cập nhật trạng thái feedback (Duyệt/Từ chối)
 * PATCH /feedback/:id/status
 */
export const adminUpdateFeedbackStatus = ({ feedbackId, status }) => {
  return http.patch(
    `/feedback/${feedbackId}/status`,
    { status }, // body
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  )
}

/**
 * [Admin] Xóa một feedback
 * DELETE /feedback/:id
 */
export const adminDeleteFeedback = (feedbackId) => {
  return http.delete(`/feedback/${feedbackId}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })
}
