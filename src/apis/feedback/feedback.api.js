// src/apis/feedback/feedback.api.js
import http from '@/apis/http'

/**
 * Lấy tất cả feedback của một món ăn
 * Dùng ở trang FoodDetailPage
 */
export const getFeedbackByDish = (dishId) => {
  return http.get(`/feedback/dish/${dishId}`)
}

/**
 * Gửi một feedback mới
 * Dùng ở trang FoodDetailPage
 */
export const createFeedback = (data) => {
  // SỬA: Thêm token vào headers
  const token = localStorage.getItem('token')
  return http.post(`/feedback`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
