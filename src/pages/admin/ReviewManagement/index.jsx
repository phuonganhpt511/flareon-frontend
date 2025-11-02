import { useEffect, useState } from "react";
import { Table, Tag, Button, Popconfirm, message } from "antd";
import http from "@/apis/http";
import { useNavigate } from "react-router-dom";

const ReviewManagement = () => {
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  const loadData = () => {
    http
      .get("/feedback")
      .then((res) => {
        setReviews(res.data.data);
      })
      .catch(() => message.error("Lỗi khi tải danh sách đánh giá!"));
  };

  useEffect(() => {
    loadData();
  }, []);

  const deleteReview = (id) => {
    http
      .delete(`/feedback/${id}`)
      .then(() => {
        message.success("Xoá đánh giá thành công!");
        loadData();
      })
      .catch(() => message.error("Không thể xoá đánh giá!"));
  };

  const columns = [
    {
      title: "Người dùng",
      dataIndex: "user_id",
      render: (user) => user?.username || "Không rõ",
    },
    {
      title: "Món ăn",
      dataIndex: "dish_id",
      render: (dish) => dish?.dish_name || "Không rõ",
    },
    {
      title: "Đánh giá",
      dataIndex: "rating",
      render: (rating) => <span className="text-orange-500 font-bold">{rating}★</span>,
    },
    {
      title: "Nội dung",
      dataIndex: "content",
      render: (text) => <span className="line-clamp-1">{text}</span>,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (status) => {
        let color = "default";
        if (status === "Pending") color = "gold";
        if (status === "Resolved") color = "green";
        if (status === "Rejected") color = "red";

        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Thao tác",
      render: (_, item) => (
        <div className="flex gap-2">
          <Button
            type="primary"
            onClick={() => navigate(`/admin/reviews/${item._id}`)}
          >
            Xem
          </Button>

          <Popconfirm
            title="Bạn có chắc muốn xoá?"
            onConfirm={() => deleteReview(item._id)}
          >
            <Button danger>Xoá</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4">Quản lý đánh giá</h1>

      <Table
        columns={columns}
        rowKey="_id"
        dataSource={reviews}
        bordered
      />
    </div>
  );
};

export default ReviewManagement;
