import http from '../http'

const ORDER_BASE_URL = '/orders'
const ORDER_ITEM_BASE_URL = '/order-item'

const orderAPI = {
  /**
   * 1. Lấy danh sách Đơn hàng (Dùng Token - Phương thức bảo mật)
   */
  getOrders: () => {
    // Backend sẽ tự lấy User ID từ JWT Token trong header
    return http.get(ORDER_BASE_URL)
  },

  /**
   * ✅ SỬA ĐỔI: Lấy danh sách Đơn hàng theo ID BÀN (Dùng Path Parameter)
   * Tương ứng với endpoint GET /orders/{tableId}
   */
  getOrdersByTableId: (tableId) => {
    // Trả về API với ID bàn được chèn vào đường dẫn (Path Parameter)
    return http.get(`${ORDER_BASE_URL}/${tableId}`)
  },

  getOrderDetail: (orderId) => {
    return http.get(`${ORDER_BASE_URL}/${orderId}`)
  },

  getOrderItemsByOrderId: (orderId) => {
    return http.get(`${ORDER_ITEM_BASE_URL}/order/${orderId}`)
  },

  getOrderItemsByCurrentUser: () => {
    return http.get(`${ORDER_ITEM_BASE_URL}/by-user-or-table`)
  }
}

export default orderAPI