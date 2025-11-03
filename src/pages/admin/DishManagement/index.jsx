import React, { useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import { Card, Breadcrumb, Form } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'
import AntButton from '@/components/AntButton'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import dishAPI from '@/apis/dish/dish.api'
import DishTable from './DishTable'
import DishFormModal from './DishFormModal'

const dishKeys = {
  all: ['dishes'],
  list: () => ['dishes', 'list'],
  detail: (id) => ['dishes', 'detail', id],
}

const DishManagement = () => {
  const [form] = Form.useForm()
  const queryClient = useQueryClient()
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [editingRow, setEditingRow] = useState(null)
  const [deletingId, setDeletingId] = useState(null)

  // GET LIST
  const { data: dishes = [], isLoading } = useQuery({
    queryKey: dishKeys.list(),
    queryFn: async () => {
      const res = await dishAPI.getAll()
      return res.data || []
    },
    onError: () => toast.error('Không thể tải món ăn, vui lòng thử lại!'),
  })

  // CREATE
  const createMutation = useMutation({
    mutationFn: (payload) => dishAPI.create(payload),
    onSuccess: () => {
      toast.success('Thêm món ăn thành công!')
      queryClient.invalidateQueries({ queryKey: dishKeys.list() })
      closeModal()
    },
    onError: () => toast.error('Thêm món ăn thất bại!'),
  })

  // UPDATE
  const updateMutation = useMutation({
    mutationFn: ({ id, payload }) => dishAPI.update(id, payload),
    onSuccess: async () => {
      toast.success('Cập nhật món ăn thành công!')
      await queryClient.invalidateQueries({ queryKey: dishKeys.list() })
      closeModal()
    },
    onError: () => toast.error('Cập nhật món ăn thất bại!'),
  })

  // DELETE
  const deleteMutation = useMutation({
    mutationFn: (id) => dishAPI.delete(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: dishKeys.list() })
      const previous = queryClient.getQueryData(dishKeys.list())
      queryClient.setQueryData(dishKeys.list(), (old) =>
        Array.isArray(old) ? old.filter((x) => x._id !== id) : old
      )
      return { previous }
    },
    onError: (_e, _id, ctx) => {
      queryClient.setQueryData(dishKeys.list(), ctx?.previous)
      toast.error('Xoá món ăn thất bại!')
    },
    onSuccess: () => {
      toast.success('Xoá món ăn thành công!')
    },
    onSettled: () => {
      setDeletingId(null)
      queryClient.invalidateQueries({ queryKey: dishKeys.list() })
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
      dish_name: record.dish_name,
      price: record.price,
      description: record.description || '',
      imageUrl: record.imageUrl || '',
      status: record.status,
      category_id:
        typeof record.category_id === 'object'
          ? record.category_id._id
          : record.category_id || null,
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
  const modalTitle = useMemo(() => (editingRow ? 'Cập nhật món ăn' : 'Thêm món ăn'), [editingRow])

  const handleOk = async () => {
    try {
      const values = await form.validateFields()
      console.log('values', values)
      const payload = {
        dish_name: values.dish_name,
        price: values.price,
        description: values.description,
        imageUrl: values.imageUrl,
        status: values.status,
        category_id: values.category_id,
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
        <h1 className="font-bold text-3xl mb-2">Quản lý món ăn</h1>
        <Breadcrumb items={[{ title: 'Trang chủ' }, { title: 'Quản lý món ăn' }]} />
      </section>

      <section className="flex justify-end mb-5">
        <AntButton type="primary" icon={<PlusCircleOutlined />} onClick={openCreate}>
          Thêm mới
        </AntButton>
      </section>

      <Card title="Danh sách món ăn" className="shadow-sm rounded-2xl">
        <DishTable
          data={dishes}
          loading={isLoading}
          onEdit={openEdit}
          onRemove={handleRemove}
          deletingId={deletingId}
        />
      </Card>

      <DishFormModal
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

export default DishManagement
