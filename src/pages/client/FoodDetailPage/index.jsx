import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import http from "@/apis/http";
import { getFeedbackByDish, createFeedback } from "@/apis/feedback/feedback.api";
import CommentCard from "@/layouts/DefaultLayout/components/CommentCard";

const FoodDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [dish, setDish] = useState(null);
  const [comments, setComments] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(5);

  // ✅ GET user vừa đăng nhập
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const token = localStorage.getItem("token");

  // ✅ load dish
  useEffect(() => {
    http
      .get(`/dishes/${id}`)
      .then((res) => setDish(res.data))
      .catch((err) => console.error("Lỗi load dish:", err));
  }, [id]);

  // ✅ load feedback theo dish
  useEffect(() => {
    getFeedbackByDish(id)
      .then((res) => {
        if (res.data.success) setComments(res.data.data);
      })
      .catch((err) => console.error("Lỗi load feedback:", err));
  }, [id]);

  const handleIncrease = () => setQuantity((p) => p + 1);
  const handleDecrease = () => setQuantity((p) => (p > 1 ? p - 1 : 1));

  // ✅ Gửi bình luận
  const submitFeedback = async () => {
    // ❗ Nếu chưa đăng nhập → chuyển sang login
    if (!token || !user) {
      alert("Bạn phải đăng nhập trước khi bình luận!");
      return navigate("/login");
    }

    if (!newComment.trim()) {
      alert("Vui lòng nhập nội dung bình luận.");
      return;
    }

    // ❗ Tạm thời tạo order_id fake (vì BE yêu cầu)
    // Bạn phải thay bằng order thực tế mà user đã mua món này
    const fakeOrderId = "676f22b1e3bc0f10d2df77aa"; // chỉ để test

    const payload = {
      user_id: user._id, // ✅ lấy từ localStorage
      order_id: fakeOrderId, // ✅ TODO: thay bằng order thật
      dish_id: id,
      type: "positive",
      rating,
      content: newComment,
      image: null
    };

    try {
      const res = await http.post(`/feedback`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.data.newFeedBack?.success) {
        // cập nhật list comment
        setComments((prev) => [...prev, res.data.newFeedBack.data]);
        setNewComment("");
        alert("Đã gửi bình luận!");
      } else {
        alert(res.data.newFeedBack?.message || "Không gửi được bình luận.");
      }
    } catch (err) {
      console.error("Lỗi gửi feedback:", err);
      alert("Bạn không thể bình luận nếu chưa từng mua món này.");
    }
  };

  if (!dish)
    return <div className="text-center py-20">Đang tải dữ liệu...</div>;

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Thông tin món ăn */}
      <div className="flex flex-col lg:flex-row gap-8">

        {/* Ảnh */}
        <div className="lg:w-1/2">
          <img
            src={dish.image}
            className="w-full h-auto rounded-lg shadow-lg"
            alt={dish.name}
          />
        </div>

        {/* Chi tiết */}
        <div className="lg:w-1/2">
          <h1 className="text-4xl font-bold">{dish.name}</h1>
          <p className="mt-4 text-gray-600">{dish.description}</p>

          <p className="mt-6 text-4xl font-bold text-orange-500">
            {dish.price.toLocaleString("vi-VN")} ₫
          </p>

          <button className="mt-6 w-full bg-orange-500 text-white py-3 rounded-lg">
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>

      {/* Bình luận */}
      <div className="mt-12 pt-8 border-t">
        <h2 className="text-2xl font-bold mb-4">Bình luận món ăn</h2>

        {/* Form nhập bình luận */}
        <textarea
          className="w-full border rounded-lg p-3"
          placeholder="Nhập bình luận..."
          rows="3"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>

        <button
          onClick={submitFeedback}
          className="mt-3 bg-orange-500 text-white py-2 px-5 rounded-lg"
        >
          Gửi bình luận
        </button>

        {/* Danh sách bình luận */}
        <div className="mt-6 space-y-4">
          {comments.length > 0 ? (
            comments.map((feedback) => (
              <CommentCard
                key={feedback._id}
                comment={{
                  author: feedback.user_id?.username || "Người dùng",
                  text: feedback.content,
                  rating: feedback.rating,
                  time: feedback.created_at
                }}
              />
            ))
          ) : (
            <p className="text-gray-500">Chưa có bình luận nào.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodDetailPage;
