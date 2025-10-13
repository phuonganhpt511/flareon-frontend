import React, { useState } from 'react'
import { Form, Input, InputNumber, Select, Button, Card, message, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CreateDish = () => {
    const [form] = Form.useForm()
    const navigate = useNavigate()
    const [fileList, setFileList] = useState([])

    const handleFinish = async (values) => {
        const formData = new FormData()
        Object.keys(values).forEach(key => {
            formData.append(key, values[key])
        })
        if (fileList.length > 0) {
            formData.append('image', fileList[0].originFileObj)
        }
        try {
            await axios.post('http://localhost:8080/api/dishes', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            message.success('Thêm món ăn thành công!')
            navigate('/admin/dishes')
        } catch (error) {
            message.error('Thêm món ăn thất bại!')
        }
    }

    const uploadProps = {
        beforeUpload: () => false,
        fileList,
        onChange: ({ fileList }) => setFileList(fileList),
        accept: 'image/*',
        maxCount: 1,
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-[#f7f8fa]">
            <Card
                style={{
                    width: 700,
                    borderRadius: 10,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                }}
                bodyStyle={{ padding: 40 }}
            >
                <h2 className="text-2xl font-bold mb-8">Thêm món ăn mới</h2>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleFinish}
                >
                    <Form.Item
                        name="dish_name"
                        label="Tên món"
                        rules={[{ required: true, message: 'Nhập tên món' }]}
                    >
                        <Input placeholder="Nhập tên món ăn" size="large" />
                    </Form.Item>
                    <Form.Item name="description" label="Mô tả">
                        <Input.TextArea placeholder="Nhập mô tả" size="large" />
                    </Form.Item>
                    <Form.Item name="category_name" label="Danh mục">
                        <Input placeholder="Nhập danh mục" size="large" />
                    </Form.Item>
                    <Form.Item
                        name="price"
                        label="Giá"
                        rules={[{ required: true, message: 'Nhập giá' }]}
                    >
                        <InputNumber min={0} className="w-full" placeholder="Nhập giá" size="large" />
                    </Form.Item>
                    <Form.Item
                        name="status"
                        label="Trạng thái"
                        rules={[{ required: true, message: 'Chọn trạng thái' }]}
                    >
                        <Select size="large" placeholder="Chọn trạng thái">
                            <Select.Option value="available">Còn hàng</Select.Option>
                            <Select.Option value="out_of_stock">Hết hàng</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="image" label="Ảnh">
                        <Upload {...uploadProps} listType="picture">
                            <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                        </Upload>
                    </Form.Item>
                    <div className="flex justify-center gap-4 mt-8">
                        <Button type="primary" htmlType="submit" size="large">
                            Thêm mới
                        </Button>
                        <Button onClick={() => navigate('/admin/dishes')} size="large">
                            Hủy
                        </Button>
                    </div>
                </Form>
            </Card>
        </div>
    )
}

export default CreateDish