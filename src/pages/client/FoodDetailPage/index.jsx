// src/pages/client/FoodDetailPage/index.jsx

import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import http from '@/apis/http'
import CommentCard from '@/layouts/DefaultLayout/components/CommentCard'
import { getFeedbackByDish, createFeedback } from '@/apis/feedback/feedback.api'
import { StarFilled, StarOutlined } from '@ant-design/icons'

const FoodDetailPage = () => {
  const { id: productId } = useParams()
  const [quantity, setQuantity] = useState(1)
  const navigate = useNavigate()
  const location = useLocation()
  const queryClient = useQueryClient()

  const [newComment, setNewComment] = useState('')
  const [rating, setRating] = useState(5)

  const userString = localStorage.getItem('user')
  const user = userString ? JSON.parse(userString) : null
  const token = localStorage.getItem('token')

  // --- GỌI API LẤY CHI TIẾT SẢN PHẨM ---
  const {
    data: foodDetails,
    isLoading: isDishLoading,
    error: dishError,
    isError: isDishError,
  } = useQuery({
    queryKey: ['dish', productId],
    queryFn: async () => {
      const res = await http.get(`/dishes/${productId}`)
      // Phải đọc từ 'res.data'
      if (res && res.data) {
        return {
          id: res.data._id,
          name: res.data.dish_name,
          imageUrl: res.data.imageUrl,
          description: res.data.description,
          price: res.data.price,
          _id: res.data._id,
        }
      }
      throw new Error('Không nhận được dữ liệu sản phẩm hợp lệ')
    },
    enabled: !!productId,
    staleTime: 1000 * 60 * 5,
  })

  // --- GỌI API LẤY DANH SÁCH BÌNH LUẬN ---
  const {
    data: commentsData,
    isLoading: isCommentsLoading,
    isError: isCommentsError,
  } = useQuery({
    queryKey: ['feedback', productId],
    queryFn: () => getFeedbackByDish(productId),
    enabled: !!productId,
    select: (res) => {
      return res.data?.data || []
    },
  })

  // --- Mutation để thêm vào giỏ hàng ---
  const addToCartMutation = useMutation({
    mutationFn: (payload) => http.post('/cart/add-item', payload),
    onSuccess: (response, variables) => {
      alert(`Đã thêm ${variables.quantity} "${variables.dishName}" vào giỏ!`)
    },
    onError: (err, variables) => {
      if (err?.response?.status === 401) {
        alert('Vui lòng đăng nhập để thêm sản phẩm.')
        navigate(`/login?redirect=${encodeURIComponent(location.pathname + location.search)}`)
      } else {
        const errMsg = err?.response?.data?.message || 'Có lỗi xảy ra khi thêm vào giỏ.'
        alert(errMsg)
      }
    },
  })

  // --- Mutation để gửi bình luận mới ---
  const createFeedbackMutation = useMutation({
    mutationFn: (payload) => createFeedback(payload),
    onSuccess: (res) => {
      // 'res' là data (vd: { message: '...', newFeedBack: {...} })
      if (res?.newFeedBack?.success === true) {
        alert('Đã gửi bình luận thành công! Cảm ơn bạn đã đánh giá.')
        setNewComment('')
        setRating(5)
        queryClient.invalidateQueries(['feedback', productId])
      } else {
        // Lỗi logic (ví dụ: "Order not found")
        const errMsg = res?.newFeedBack?.message || 'Gửi bình luận thất bại (Lỗi logic).'
        alert(`Lỗi: ${errMsg}`)
      }
    },
    //
    // ✅ SỬA LỖI 'undefined': Thêm kiểm tra 'err'
    //
    onError: (err) => {
      console.error('Lỗi API khi gửi bình luận:', err)
      // Kiểm tra 'err' trước khi đọc 'err.response'
      const errMsg =
        err?.response?.data?.message ||
        err?.response?.data?.newFeedBack?.message ||
        'Gửi bình luận thất bại (Lỗi server).'
      alert(`Lỗi: ${errMsg}`)
    },
  })

  // --- Các hàm xử lý ---
  const handleIncrease = () => setQuantity((prev) => prev + 1)
  const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))

  const handleAddToCart = () => {
    if (!foodDetails) {
      alert('Thông tin món ăn chưa sẵn sàng, vui lòng thử lại.')
      return
    }
    let userId = null
    try {
      if (!userString) {
        alert('Bạn cần đăng nhập để thêm vào giỏ hàng.')
        navigate(`/login?redirect=${encodeURIComponent(location.pathname)}`)
        return
      }
      const userData = JSON.parse(userString)
      userId = userData?._id
      if (!userId) throw new Error('User ID không hợp lệ.')
    } catch (e) {
      alert('Lỗi khi lấy thông tin người dùng. Vui lòng thử đăng nhập lại.')
      return
    }
    const mongoTableId = localStorage.getItem('currentTableId')
    if (!mongoTableId) {
      alert('Lỗi: Không tìm thấy thông tin bàn. Vui lòng truy cập từ mã QR của bàn.')
      return
    }
    const payload = {
      table_id: mongoTableId,
      dish_id: foodDetails._id,
      quantity: quantity,
      user_id: userId,
    }
    addToCartMutation.mutate({ ...payload, dishName: foodDetails.name })
  }

  // --- HÀM XỬ LÝ SUBMIT BÌNH LUẬN ---
  const handleSubmitFeedback = () => {
    if (!token || !user || !user._id) {
      alert('Bạn cần đăng nhập để gửi bình luận!')
      return navigate(`/login?redirect=${encodeURIComponent(location.pathname)}`)
    }
    if (!newComment.trim()) {
      alert('Vui lòng nhập nội dung bình luận.')
      return
    }

    // Dùng ID thật của đơn hàng 'COMPLETED' (hoặc backend đã tắt kiểm tra)
    const orderIdForTesting = '6555a1b1c1d1e1f1a1b1c1d1' // ID này dùng để test

    const payload = {
      user_id: user._id,
      order_id: orderIdForTesting, // Gửi ID hợp lệ
      dish_id: productId,
      type: 'positive',
      rating: rating,
      content: newComment,
      image: null,
    }

    console.log('>>> Chuẩn bị gọi API POST /feedback VỚI:', payload)
    createFeedbackMutation.mutate(payload)
  }

  // --- XỬ LÝ TRẠNG THÁI LOADING/ERROR ---
  if (isDishLoading) return <p>Đang tải chi tiết món ăn...</p>
  if (isDishError) return <p>Lỗi khi tải món ăn: {dishError?.message || 'Unknown error'}</p>
  if (!foodDetails) return <p>Không tìm thấy thông tin món ăn.</p>

  // --- RENDER GIAO DIỆN ---
  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Phần thông tin chính */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        <div className="lg:w-1/2">
          <img
            src={foodDetails.imageUrl || 'https://via.placeholder.com/600'}
            alt={foodDetails.name}
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
        </div>
        <div className="lg:w-1/2 flex flex-col">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">{foodDetails.name}</h1>
          <p className="mt-4 text-gray-600 leading-relaxed">{foodDetails.description}</p>
          <p className="mt-6 text-4xl font-bold text-orange-500">
            {(foodDetails.price ?? 0).toLocaleString('vi-VN')} ₫
          </p>
          <div className="mt-8 flex items-center space-x-4">
            <button
              onClick={handleDecrease}
              className="px-3 py-1 border rounded-md text-lg font-bold"
            >
              -
            </button>
            <span className="w-12 text-center text-xl font-medium">{quantity}</span>
            <button
              onClick={handleIncrease}
              className="px-3 py-1 border rounded-md text-lg font-bold"
            >
              +
            </button>
          </div>
          <button
            onClick={handleAddToCart}
            className="mt-8 w-full bg-orange-500 text-white font-bold py-3 px-6 rounded-lg text-lg hover:bg-orange-600 transition-colors duration-300 disabled:opacity-50"
            disabled={addToCartMutation.isLoading}
          >
            {addToCartMutation.isLoading ? 'Đang thêm...' : 'Thêm vào giỏ hàng'}
          </button>
        </div>
      </div>

      {/* PHẦN BÌNH LUẬN */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Đánh giá & Bình luận</h2>

        {/* --- Form Gửi Bình Luận Mới --- */}
        <div className="mb-8 p-4 border rounded-lg bg-gray-50">
          <h3 className="font-semibold text-lg mb-2">Để lại đánh giá của bạn</h3>
          {user ? (
            <>
              <div className="flex items-center mb-3">
                <span className="mr-3 text-gray-700">Đánh giá:</span>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} onClick={() => setRating(star)} className="cursor-pointer">
                      {rating >= star ? (
                        <StarFilled className="text-yellow-500 text-2xl" />
                      ) : (
                        <StarOutlined className="text-gray-400 text-2xl" />
                      )}
                    </span>
                  ))}
                </div>
              </div>
              <textarea
                className="w-full border rounded-lg p-3"
                placeholder={foodDetails ? `Bạn nghĩ gì về món ${foodDetails.name}?` : '...'}
                rows="3"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              ></textarea>
              <button
                onClick={handleSubmitFeedback}
                className="mt-3 bg-orange-500 text-white py-2 px-5 rounded-lg hover:bg-orange-600 disabled:opacity-50"
                disabled={createFeedbackMutation.isLoading}
              >
                {createFeedbackMutation.isLoading ? 'Đang gửi...' : 'Gửi bình luận'}
              </button>
            </>
          ) : (
            <p className="text-gray-600">
              Vui lòng{' '}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  navigate('/login')
                }}
                className="text-orange-500 font-semibold"
              >
                đăng nhập
              </a>{' '}
              để để lại bình luận.
            </p>
          )}
        </div>

        {/* --- Danh sách bình luận --- */}
        <div className="space-y-6">
          {isCommentsLoading ? (
            <p>Đang tải bình luận...</p>
          ) : isCommentsError ? (
            <p className="text-red-500">Lỗi khi tải bình luận.</p>
          ) : commentsData && commentsData.length > 0 ? (
            commentsData.map((comment) => (
              <CommentCard
                key={comment._id}
                comment={{
                  id: comment._id,
                  author: comment.user_id?.username || 'Người dùng ẩn',
                  avatar: `https://i.pravatar.cc/150?u=${comment.user_id?._id || comment._id}`,
                  rating: comment.rating,
                  text: comment.content,
                  time: new Date(comment.created_at).toLocaleString('vi-VN'),
                  replyCount: 0,
                }}
              />
            ))
          ) : (
            <p className="text-gray-500">Chưa có bình luận nào cho món ăn này.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default FoodDetailPage
