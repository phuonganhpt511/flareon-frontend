import { z } from 'zod'

export const CategorySchema = z.object({
  category_name: z.string().min(1, 'Vui lòng nhập tên danh mục'),
  description: z.string().min(1, 'Vui lòng nhập mô tả danh mục'),
  imageUrl: z.string().url('Đường dẫn ảnh không hợp lệ').min(1, 'Vui lòng nhập đường dẫn ảnh'),
  status: z.union([z.literal(0), z.literal(1)], { required_error: 'Chọn trạng thái' }),
})
