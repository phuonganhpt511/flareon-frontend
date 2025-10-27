// src/pages/client/CartPage/index.jsx
import React from 'react'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import http from '@/apis/http'
import { useNavigate } from 'react-router'
import CartItem from './CartItem'

const CartPage = () => {
  // --- Lấy ID từ localStorage (Giữ nguyên) ---
  const mongoTableId = localStorage.getItem('currentTableId')
  const userString = localStorage.getItem('user')
  const userData = userString ? JSON.parse(userString) : null
  const userId = userData?._id

  const queryClient = useQueryClient()
  const navigate = useNavigate()

  // --- Query để lấy giỏ hàng (Giữ nguyên) ---
  const {
    data: cartData,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ['cart', mongoTableId, userId],
    queryFn: async () => {
      const res = await http.get(`/cart/cart-item/${mongoTableId}/${userId}`)
      console.log('API GET /cart trả về (đã có cart_item_id):', res)
      // Dữ liệu là { success: true, data: { items: [{ cart_item_id: '...', ... }], total_price: ... } }
      return res?.data
    },
    enabled: !!mongoTableId && !!userId,
  })

  // --- Mutation để cập nhật số lượng (PATCH) ---
  const updateQuantityMutation = useMutation({
    mutationFn: ({ cartItemId, delta }) => {
      // Gọi API PATCH /cart/{cart_item_id}/quantity
      console.log(`Gọi API PATCH /cart/${cartItemId}/quantity với delta: ${delta}`)
      return http.patch(`/cart/${cartItemId}/quantity`, { delta }) // <-- Dùng API PATCH
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['cart', mongoTableId, userId]) // Làm mới giỏ hàng
      console.log('Cập nhật số lượng thành công!')
    },
    onError: (err) => {
      console.error('Lỗi khi cập nhật số lượng:', err)
      alert('Có lỗi xảy ra khi cập nhật số lượng.')
    },
  })

  // --- Mutation để XÓA món ăn (DELETE) ---
  const removeItemMutation = useMutation({
    mutationFn: (cartItemIdToDelete) => {
      // Gọi API DELETE /cart/item/{cart_item_id}
      console.log(`Gọi API DELETE /cart/item/${cartItemIdToDelete}`)
      return http.delete(`/cart/item/${cartItemIdToDelete}`) // <-- Dùng API DELETE
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['cart', mongoTableId, userId]) // Làm mới giỏ hàng
      console.log('Xóa món ăn thành công!')
    },
    onError: (err) => {
      console.error('Lỗi khi xóa món ăn:', err)
      alert('Có lỗi xảy ra khi xóa món ăn.')
    },
  })

  // --- Hàm xử lý Tăng/Giảm (Dùng ID thật) ---
  const handleIncrease = (cartItemId) => {
    if (!cartItemId) {
      console.error('Thiếu cartItemId để tăng số lượng')
      return
    }
    updateQuantityMutation.mutate({ cartItemId, delta: 1 })
  }

  const handleDecrease = (cartItemId, currentQuantity) => {
    if (!cartItemId) {
      console.error('Thiếu cartItemId để giảm số lượng')
      return
    }
    // Nếu số lượng là 1, gọi hàm Xóa thay vì giảm
    if (currentQuantity <= 1) {
      handleRemove(cartItemId) // Gọi hàm xóa
      return
    }
    updateQuantityMutation.mutate({ cartItemId, delta: -1 })
  }

  // --- Hàm xử lý Xóa (Dùng ID thật) ---
  const handleRemove = (cartItemId) => {
    if (!cartItemId) {
    }
    if (window.confirm(`Bạn có chắc muốn xóa món ăn này khỏi giỏ hàng?`)) {
      removeItemMutation.mutate(cartItemId)
    }
  }

  // --- Hàm Checkout (Giữ nguyên) ---
  const handleCheckout = async () => {
    console.log('ĐÃ CLICK NÚT XÁC NHẬN!')
    if (!mongoTableId || !userId) {
      alert('Lỗi: Thiếu thông tin bàn hoặc người dùng.')
      console.error('Checkout failed: Missing mongoTableId or userId')
      return
    }
    if (items.length === 0) {
      alert('Giỏ hàng đang trống, không thể xác nhận.')
      return
    }
    const checkoutPayload = {
      user_id: userId,
      table_id: mongoTableId,
    }
    console.log('Chuẩn bị checkout với payload:', checkoutPayload)

    try {
      const response = await http.post('/cart/checkout', checkoutPayload)
      console.log('API Checkout thành công:', response)
      alert('Đặt hàng thành công! Hóa đơn đã được tạo.')
      queryClient.invalidateQueries({ queryKey: ['cart', mongoTableId, userId] })
      navigate('/')
    } catch (checkoutError) {
      console.error('Lỗi khi checkout:', checkoutError)
      const errorMessage =
        checkoutError.response?.data?.message || 'Đặt hàng thất bại, vui lòng thử lại.'
      alert(errorMessage)
    }
  }

  if (isLoading) return <p>Đang tải giỏ hàng...</p>
  if (isError) return <p>Lỗi khi tải giỏ hàng: {error?.message || 'Unknown error'}</p>
  if (!cartData) return <p>Giỏ hàng trống hoặc có lỗi dữ liệu.</p>

  // Lấy dữ liệu từ cartData (đã có cart_item_id)
  const items = cartData.items || []
  const total = cartData.total_price || 0

  return (
    <div className="max-w-screen-sm mx-auto bg-gray-50 min-h-screen flex flex-col p-4 md:p-6">
      <h1 className="text-2xl font-bold ...">Giỏ hàng</h1>
      {/* Danh sách CartItem */}
      <div className="flex-grow w-full overflow-y-auto mb-4">
        {items.length === 0 ? (
          <p>...</p>
        ) : (
          items.map((item) => (
            <CartItem
              key={item.cart_item_id}
              item={item}
              onIncrease={() => handleIncrease(item.cart_item_id)}
              onDecrease={() => handleDecrease(item.cart_item_id, item.quantity)}
              onRemove={() => handleRemove(item.cart_item_id)}
            />
          ))
        )}
      </div>

      {/* Phần Tổng tiền và Xác nhận */}
      <div className="w-full bg-white p-4 rounded-t-lg shadow-lg mt-auto">
        {' '}
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold text-gray-700">Tổng tiền</span>
          <span className="text-xl font-bold text-orange-600">
            {total.toLocaleString('vi-VN')} đ
          </span>
        </div>
        <button
          onClick={handleCheckout}
          className="w-full h-12 bg-orange-500 text-white rounded-lg font-semibold text-lg hover:bg-orange-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
          // Vô hiệu hóa nút khi giỏ hàng trống hoặc đang có thao tác cập nhật/xóa
          disabled={
            items.length === 0 || updateQuantityMutation.isLoading || removeItemMutation.isLoading
          }
        >
          Xác Nhận
        </button>
      </div>
    </div>
  )
}
export default CartPage
