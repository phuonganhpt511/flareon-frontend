import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Tag, message } from "antd";
import http from "@/apis/http";

const ReviewDetail = () => {
  const { id } = useParams();
  const [review, setReview] = useState(null);

  useEffect(() => {
    http
      .get(`/feedback/${id}`)
      .then((res) => setReview(res.data.result.data))
      .catch(() => message.error("Không tải được chi tiết đánh giá!"));
  }, []);

  if (!review) return <p className="p-6">Đang tải...</p>;

  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6">Chi tiết đánh giá</h2>

      <Card>
        <p><b>Người dùng:</b> {review.user_id?.username}</p>
        <p><b>Món ăn:</b> {review.dish_id?.dish_name}</p>

        <p>
          <b>Rating:</b>{" "}
          <span className="text-orange-500 font-bold">{review.rating}★</span>
        </p>

        <p><b>Nội dung:</b></p>
        <p className="p-3 bg-gray-100 rounded">{review.content}</p>

        <p className="mt-3"><b>Trạng thái:</b> <Tag>{review.status}</Tag></p>

        {review.image && (
          <img
            src={review.image}
            alt="feedback-img"
            className="w-40 mt-4 rounded shadow"
          />
        )}
      </Card>
    </div>
  );
};

export default ReviewDetail;
