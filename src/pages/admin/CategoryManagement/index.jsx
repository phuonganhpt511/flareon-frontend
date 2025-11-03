import React, { useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import { Card, Breadcrumb, Form } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'
import AntButton from '@/components/AntButton'
import categoryAPI from '@/apis/category/category.api'
import CategoryTable from './CategoryTable'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import CategoryFormModal from './CategoryFormModal'

const categoryKeys = {
  all: ['categories'],
  list: () => ['categories', 'list'],
  detail: (id) => ['categories', 'detail', id],
}

const CategoryManagement = () => {
  const [form] = Form.useForm()
  const queryClient = useQueryClient()
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [editingRow, setEditingRow] = useState(null)
  const [deletingId, setDeletingId] = useState(null)

  // GET LIST
  const { data: categories = [], isLoading } = useQuery({
    queryKey: categoryKeys.list(),
    queryFn: async () => {
      const res = await categoryAPI.getAll()
      return res.data || []
    },
    onError: () => toast.error('Không thể tải danh mục, vui lòng thử lại!'),
  })

  // CREATE
  const createMutation = useMutation({
    mutationFn: (payload) => categoryAPI.create(payload),
    onSuccess: () => {
      toast.success('Thêm danh mục thành công!')
      queryClient.invalidateQueries({ queryKey: categoryKeys.list() })
      closeModal()
    },
    onError: () => toast.error('Thêm danh mục thất bại!'),
  })

  // UPDATE
  const updateMutation = useMutation({
    mutationFn: ({ id, payload }) => categoryAPI.update(id, payload),
    onSuccess: async () => {
      toast.success('Cập nhật danh mục thành công!')
      await queryClient.invalidateQueries({ queryKey: categoryKeys.list() })
      closeModal()
    },
    onError: () => toast.error('Cập nhật danh mục thất bại!'),
  })

  // DELETE
  const deleteMutation = useMutation({
    mutationFn: (id) => categoryAPI.delete(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: categoryKeys.list() })
      const previous = queryClient.getQueryData(categoryKeys.list())
      queryClient.setQueryData(categoryKeys.list(), (old) =>
        Array.isArray(old) ? old.filter((x) => x._id !== id) : old
      )
      return { previous }
    },
    onError: (_e, _id, ctx) => {
      queryClient.setQueryData(categoryKeys.list(), ctx?.previous)
      toast.error('Xoá danh mục thất bại!')
    },
    onSuccess: () => {
      toast.success('Xoá danh mục thành công!')
    },
    onSettled: () => {
      setDeletingId(null)
      queryClient.invalidateQueries({ queryKey: categoryKeys.list() })
    },
  })

  const openCreate = () => {
    setEditingRow(null)
    form.resetFields()
    setIsOpenModal(true)
  }

  const openEdit = (record) => {
    setEditingRow(record)
    form.resetFields()
    form.setFieldsValue({
      category_name: record.category_name,
      description: record.description || '',
      imageUrl: record.imageUrl || '',
      status: typeof record.status === 'number' ? record.status : 1,
    })
    setIsOpenModal(true)
  }

  const handleRemove = (id) => {
    deleteMutation.mutate(id)
  }

  const closeModal = () => {
    form.resetFields()
    setIsOpenModal(false)
    setEditingRow(null)
  }

  const submitting = createMutation.isPending || updateMutation.isPending
  const modalTitle = useMemo(
    () => (editingRow ? 'Cập nhật danh mục' : 'Thêm danh mục'),
    [editingRow]
  )

  const handleOk = async () => {
    try {
      const values = await form.validateFields()
      const payload = {
        category_name: values.category_name,
        description: values.description,
        imageUrl: values.imageUrl,
        status: values.status,
      }
      if (editingRow) {
        updateMutation.mutate({ id: editingRow._id, payload })
      } else {
        createMutation.mutate(payload)
      }
    } catch {
      // Lỗi validate
    }
  }

  return (
    <div className="h-full overflow-auto">
      <section className="mb-3">
        <h1 className="font-bold text-3xl mb-2">Quản lý danh mục</h1>
        <Breadcrumb items={[{ title: 'Trang chủ' }, { title: 'Quản lý danh mục' }]} />
      </section>

      <section className="flex justify-end mb-5">
        <AntButton type="primary" icon={<PlusCircleOutlined />} onClick={openCreate}>
          Thêm mới
        </AntButton>
      </section>

      <Card title="Danh sách danh mục" className="shadow-sm rounded-2xl">
        <CategoryTable
          data={categories}
          loading={isLoading}
          onEdit={openEdit}
          onRemove={handleRemove}
          deletingId={deletingId}
        />
      </Card>

      <CategoryFormModal
        open={isOpenModal}
        title={modalTitle}
        submitting={submitting}
        form={form}
        onOk={handleOk}
        onCancel={closeModal}
      />
    </div>
  )
}

export default CategoryManagement
