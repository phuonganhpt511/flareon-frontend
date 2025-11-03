import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import http from '@/apis/http'
import CommentCard from '@/layouts/DefaultLayout/components/CommentCard' // Giữ lại CommentCard

// GIỮ NGUYÊN DỮ LIỆU BÌNH LUẬN CỐ ĐỊNH
const foodDataWithComments = {
  comments: [
    {
      id: 1,
      author: 'Thanh Hằng',
      avatar: 'https://i.pravatar.cc/150?u=thanhhang',
      rating: 5,
      text: 'Bún bò ở đây rất ngon, nước dùng đậm đà đúng vị. Chắc chắn sẽ quay lại!',
      time: '1 giờ trước',
      replyCount: 8,
    },
    {
      id: 2,
      author: 'Minh Tuấn',
      avatar: 'https://i.pravatar.cc/150?u=minhtuan',
      rating: 4,
      text: 'Tô bún đầy đặn, nhiều thịt. Giá cả hợp lý so với chất lượng.',
      time: '3 giờ trước',
      replyCount: 2,
    },
  ],
}

const FoodDetailPage = () => {
  const { id: productId } = useParams()
  const [quantity, setQuantity] = useState(1)
  const navigate = useNavigate()
  const location = useLocation()
  const queryClient = useQueryClient()

  // --- GỌI API LẤY CHI TIẾT SẢN PHẨM (TRỪ COMMENTS) ---
  const {
    data: foodDetails,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ['dish', productId],
    queryFn: async () => {
      console.log(`Đang gọi API GET /dishes/${productId}...`)
      const res = await http.get(`/dishes/${productId}`)
      console.log('API GET /dishes/{id} trả về:', res)
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

  // --- Mutation để thêm vào giỏ hàng ---
  const addToCartMutation = useMutation({
    mutationFn: (payload) => {
      console.log('Gọi POST /cart/add-item:', payload)
      return http.post('/cart/add-item', payload)
    },
    // === 3. THÊM LOGIC "RUNG CHUÔNG" VÀO ĐÂY ===
    onSuccess: (response, variables) => {
      console.log('Thêm vào giỏ thành công!', response)
      alert(`Đã thêm ${variables.quantity} "${variables.dishName}" vào giỏ!`)

      // Lấy ID bàn và user từ 'variables' (dữ liệu đã gửi đi)
      const { table_id: tableId, user_id: userId } = variables

      if (tableId && userId) {
        console.log('Làm mới query giỏ hàng:', ['cart', tableId, userId])
        // Báo cho Header (và CartPage) gọi lại API GET /cart
        queryClient.invalidateQueries({ queryKey: ['cart', tableId, userId] })
      }
    },
    onError: (err, variables) => {
      console.error(`Lỗi khi thêm '${variables.dishName}' vào giỏ:`, err)
      if (err.response?.status === 401) {
        alert('Vui lòng đăng nhập để thêm sản phẩm.')
        navigate(`/login?redirect=${encodeURIComponent(location.pathname + location.search)}`)
      } else {
        const errMsg = err.response?.data?.message || 'Có lỗi xảy ra khi thêm vào giỏ.'
        alert(errMsg)
      }
    },
  })

  // --- Hàm xử lý số lượng (Giữ nguyên) ---
  const handleIncrease = () => setQuantity((prev) => prev + 1)
  const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))

  // --- Hàm thêm vào giỏ (Giữ nguyên, dùng foodDetails._id) ---
  const handleAddToCart = () => {
    // Kiểm tra xem dữ liệu món ăn đã tải xong chưa
    if (!foodDetails) {
      console.error('handleAddToCart: foodDetails chưa có dữ liệu.')
      alert('Thông tin món ăn chưa sẵn sàng, vui lòng thử lại.')
      return
    }

    console.log(`handleAddToCart được gọi cho: ${foodDetails.name}, số lượng: ${quantity}`)

    // 1. Lấy user_id (Bắt buộc phải đăng nhập)
    let userId = null
    try {
      const userString = localStorage.getItem('user')
      console.log('userString từ localStorage:', userString) // DEBUG

      if (!userString) {
        alert('Bạn cần đăng nhập để thêm vào giỏ hàng.')
        return // Dừng hàm
      }

      const userData = JSON.parse(userString)
      console.log('userData sau khi parse:', userData)

      userId = userData?._id
      console.log('userId lấy được:', userId)

      // Kiểm tra lại userId có hợp lệ không
      if (!userId) {
        console.error('User ID không hợp lệ sau khi parse. userData:', userData)
        throw new Error('User ID không hợp lệ sau khi parse.')
      }
    } catch (e) {
      console.error('Lỗi khi lấy thông tin người dùng từ localStorage:', e)
      alert('Lỗi khi lấy thông tin người dùng. Vui lòng thử đăng nhập lại.')
      return
    }

    const mongoTableId = localStorage.getItem('currentTableId')
    console.log('mongoTableId (ID dài của bàn) từ localStorage:', mongoTableId)

    if (!mongoTableId) {
      alert(
        'Lỗi: Không tìm thấy thông tin bàn hiện tại. Vui lòng truy cập trang này từ mã QR hoặc trang đặt món của bàn.'
      )
      console.error("handleAddToCart: Thiếu 'currentTableId' trong localStorage.")
    }

    // Sử dụng ID bàn đã lấy được (hoặc ID giả nếu bạn chọn cách đó)
    const tableIdToSend = mongoTableId // <-- CHỖ NÀY QUAN TRỌNG

    // Kiểm tra lại lần nữa trước khi gửi
    if (!tableIdToSend) {
      alert('Lỗi nghiêm trọng: Không xác định được ID bàn để gửi đi.')
      return
    }

    // 3. Tạo payload (dữ liệu gửi lên server)
    const payload = {
      table_id: tableIdToSend,
      dish_id: foodDetails._id,
      quantity: quantity,
      user_id: userId,
    }

    // 4. Gọi mutation để thực hiện yêu cầu API
    console.log('>>> Chuẩn bị gọi API POST /cart/add-item VỚI:', JSON.stringify(payload, null, 2))
    // Truyền thêm tên món ăn để hiển thị trong thông báo thành công/lỗi
    addToCartMutation.mutate({ ...payload, dishName: foodDetails.name })
  }

  // --- XỬ LÝ TRẠNG THÁI LOADING/ERROR ---
  if (isLoading) return <p>Đang tải chi tiết món ăn...</p>
  if (isError) return <p>Lỗi khi tải món ăn: {error?.message || 'Unknown error'}</p>
  if (!foodDetails) return <p>Không tìm thấy thông tin món ăn.</p>

  // --- RENDER GIAO DIỆN ---
  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Phần thông tin chính (DÙNG DỮ LIỆU TỪ API) */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Ảnh món ăn */}
        <div className="lg:w-1/2">
          <img
            src={foodDetails.imageUrl || 'https://via.placeholder.com/600'} // Ảnh từ API
            alt={foodDetails.name}
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
        </div>
        {/* Thông tin món ăn */}
        <div className="lg:w-1/2 flex flex-col">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">{foodDetails.name}</h1>
          <p className="mt-4 text-gray-600 leading-relaxed">{foodDetails.description}</p>
          <p className="mt-6 text-4xl font-bold text-orange-500">
            {(foodDetails.price ?? 0).toLocaleString('vi-VN')} ₫
          </p>
          {/* Số lượng */}
          <div className="mt-8 flex items-center space-x-4">
            {/* ... Nút +/- và input ... */}
            <button onClick={handleDecrease} className="px-3 py-1 ...">
              -
            </button>
            <span className="w-12 text-center ...">{quantity}</span>
            <button onClick={handleIncrease} className="px-3 py-1 ...">
              +
            </button>
          </div>
          {/* Nút Thêm vào giỏ */}
          <button
            onClick={handleAddToCart}
            className="mt-8 w-full bg-orange-500 text-white font-bold py-3 px-6 rounded-lg text-lg hover:bg-orange-600 transition-colors duration-300 disabled:opacity-50"
            disabled={addToCartMutation.isLoading}
          >
            {addToCartMutation.isLoading ? 'Đang thêm...' : 'Thêm vào giỏ hàng'}
          </button>
        </div>
      </div>

      {/* Phần bình luận (DÙNG DỮ LIỆU CỐ ĐỊNH) */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Đánh giá & Bình luận</h2>
        <div className="space-y-6">
          {foodDataWithComments.comments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default FoodDetailPage
