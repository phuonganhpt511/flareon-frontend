import React, { useEffect, useState } from 'react'
import { Form, Input, InputNumber, Select, Button, Card, message, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const UpdateDish = () => {
    const [form] = Form.useForm()
    const navigate = useNavigate()
    const { id } = useParams()
    const [fileList, setFileList] = useState([])
    const [imageUrl, setImageUrl] = useState('')

    useEffect(() => {
        // Lấy dữ liệu món ăn theo id để fill vào form
        axios.get(`http://localhost:8080/api/dishes/${id}`)
            .then(res => {
                const dish = res.data.data || res.data
                form.setFieldsValue(dish)
                setImageUrl(dish.image_url || dish.imageUrl || '')
                // Nếu có ảnh cũ, hiển thị trên Upload
                if (dish.image_url || dish.imageUrl) {
                    setFileList([
                        {
                            uid: '-1',
                            name: 'Ảnh hiện tại',
                            status: 'done',
                            url: dish.image_url || dish.imageUrl,
                        }
                    ])
                }
            })
            .catch(() => {
                message.error('Không tìm thấy món ăn!')
                navigate('/admin/dishes')
            })
    }, [id, form, navigate])

    const handleFinish = async (values) => {
        const formData = new FormData()
        Object.keys(values).forEach(key => {
            formData.append(key, values[key])
        })
        // Nếu chọn file mới thì gửi file, không thì giữ ảnh cũ
        if (fileList.length > 0 && fileList[0].originFileObj) {
            formData.append('image', fileList[0].originFileObj)
        } else if (imageUrl) {
            formData.append('image_url', imageUrl)
        }
        try {
            await axios.put(`http://localhost:8080/api/dishes/${id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            message.success('Cập nhật món ăn thành công!')
            navigate('/admin/dishes')
        } catch (error) {
            message.error('Cập nhật thất bại!')
        }
    }

    const uploadProps = {
        beforeUpload: () => false,
        fileList,
        onChange: ({ fileList: newFileList }) => setFileList(newFileList),
        accept: 'image/*',
        maxCount: 1,
        listType: 'picture',
        defaultFileList: fileList,
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
                <h2 className="text-2xl font-bold mb-8">Cập nhật món ăn</h2>
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
                    <Form.Item label="Ảnh">
                        <Upload {...uploadProps}>
                            <Button icon={<UploadOutlined />}>Chọn ảnh mới</Button>
                        </Upload>
                        {imageUrl && fileList.length === 0 && (
                            <img
                                src={imageUrl}
                                alt="Ảnh hiện tại"
                                style={{ marginTop: 16, maxWidth: 200, borderRadius: 8 }}
                            />
                        )}
                    </Form.Item>
                    <div className="flex justify-center gap-4 mt-8">
                        <Button type="primary" htmlType="submit" size="large">
                            Lưu
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

export default UpdateDish