import React, { useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Space,
  Popconfirm,
  message,
  Spin,
} from "antd";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import http from "@/apis/http";
import {
  createTable,
  updateTable,
  deleteTable,
  updateTableStatus,
} from "@/services/tableService";

const TableManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTable, setEditingTable] = useState(null);
  const [form] = Form.useForm();
  const queryClient = useQueryClient();


  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["tables"],
    queryFn: async () => {
      try {
        const res = await http.get("/tables");
        console.log(res.data);
        return res.data;
      } catch (err) {
        console.error("Lỗi khi fetch bảng:", err);
        return [];
      }
    },
  });


  const mutationSave = useMutation({
    mutationFn: (values) => {
      return editingTable
        ? updateTable(editingTable._id, values, token)
        : createTable(values, token);
    },
    onSuccess: () => {
      message.success(
        editingTable ? "Cập nhật bàn thành công" : "Thêm bàn mới thành công"
      );
      setIsModalOpen(false);
      form.resetFields();
      setEditingTable(null);
      queryClient.invalidateQueries(["tables"]);
    },
    onError: (err) => {
      console.error("Lỗi mutationSave:", err);
      message.error("Lỗi khi lưu bàn");
    },
  });


  const mutationDelete = useMutation({
    mutationFn: (id) => deleteTable(id, token),
    onSuccess: () => {
      message.success(" Xóa bàn thành công");
      queryClient.invalidateQueries(["tables"]);
    },
    onError: (err) => {
      console.error("Lỗi mutationDelete:", err);
      message.error("Không thể xóa bàn");
    },
  });


  const mutationStatus = useMutation({
    mutationFn: ({ id, status }) => updateTableStatus(id, { status }, token),
    onSuccess: () => {
      queryClient.invalidateQueries(["tables"]);
    },
    onError: (err) => {
      console.error("Lỗi mutationStatus:", err);
      message.error("Cập nhật trạng thái thất bại");
    },
  });


  const handleAdd = () => {
    setEditingTable(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (table) => {
    setEditingTable(table);
    form.setFieldsValue(table);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    mutationDelete.mutate(id);
  };

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        mutationSave.mutate(values);
      })
      .catch(() => {});
  };

  const handleStatusChange = (id, newStatus) => {
    mutationStatus.mutate({ id, status: newStatus });
  };

  const columns = [
    {
      title: "Tên bàn",
      dataIndex: "table_name",
    },
    {
      title: "Sức chứa",
      dataIndex: "capacity",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (status, record) => (
        <Select
          value={status}
          onChange={(val) => handleStatusChange(record._id, val)}
          style={{ width: 130 }}
          variant="outlined"
        >
          <Select.Option value="available">Còn trống</Select.Option>
          <Select.Option value="occupied">Đang dùng</Select.Option>
          <Select.Option value="reserved">Đã đặt</Select.Option>
          <Select.Option value="maintenance">Bảo trì</Select.Option>
        </Select>
      ),
    },
    {
      title: "Thao tác",
      render: (_, record) => (
        <Space>
          <Button type="primary" onClick={() => handleEdit(record)}>
            Sửa
          </Button>
          <Popconfirm
            title="Xóa bàn này?"
            onConfirm={() => handleDelete(record._id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button danger>Xóa</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];


  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );

  if (isError)
    return <p className="text-center text-red-500">Không thể tải dữ liệu bàn.</p>;


  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-700">
          Quản lý bàn (Table Management)
        </h1>
        <Button type="primary" onClick={handleAdd}>
          + Thêm bàn mới
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={data}
        rowKey="_id"
        bordered
        pagination={{ pageSize: 5 }}
      />

      <Modal
        title={editingTable ? "Cập nhật bàn" : "Thêm bàn mới"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleSubmit}
        okText={editingTable ? "Cập nhật" : "Thêm mới"}
        confirmLoading={mutationSave.isLoading}
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            name="table_name"
            label="Tên bàn"
            rules={[{ required: true, message: "Nhập tên bàn!" }]}
          >
            <Input placeholder="Nhập tên bàn" variant="outlined" />
          </Form.Item>
          <Form.Item
            name="capacity"
            label="Sức chứa"
            rules={[{ required: true, message: "Nhập sức chứa!" }]}
          >
            <Input type="number" placeholder="Nhập sức chứa" variant="outlined" />
          </Form.Item>
          <Form.Item
            name="status"
            label="Trạng thái"
            initialValue="available"
          >
            <Select variant="outlined">
              <Select.Option value="available">Còn trống</Select.Option>
              <Select.Option value="occupied">Đang dùng</Select.Option>
              <Select.Option value="reserved">Đã đặt</Select.Option>
              <Select.Option value="maintenance">Bảo trì</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TableManagement;
