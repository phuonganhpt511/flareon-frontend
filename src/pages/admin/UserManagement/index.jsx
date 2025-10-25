import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { Card, Breadcrumb, Form } from 'antd'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import UserFormModal from './UserFormModal'
import UserTable from './UserTable'
import userAPI from '@/apis/user/user.api'

const userKeys = {
  all: ['users'],
  list: () => ['users', 'list'],
  detail: (id) => ['users', 'detail', id],
}

const UserManagement = () => {
  const [form] = Form.useForm()
  const queryClient = useQueryClient()
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [editingRow, setEditingRow] = useState(null)
  const [deletingId, setDeletingId] = useState(null)

  // GET LIST
  const { data: users = [], isLoading } = useQuery({
    queryKey: userKeys.list(),
    queryFn: async () => {
      const res = await userAPI.getAll()
      return res.data || []
    },
    onError: () => toast.error('Không thể tải người dùng, vui lòng thử lại!'),
  })

  // UPDATE
  const updateMutation = useMutation({
    mutationFn: ({ id, payload }) => userAPI.update(id, payload),
    onSuccess: async () => {
      toast.success('Cập nhật người dùng thành công!')
      await queryClient.invalidateQueries({ queryKey: userKeys.list() })
      closeModal()
    },
    onError: () => toast.error('Cập nhật người dùng thất bại!'),
  })

  // DELETE
  const deleteMutation = useMutation({
    mutationFn: (id) => userAPI.delete(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: userKeys.list() })
      const previous = queryClient.getQueryData(userKeys.list())
      queryClient.setQueryData(userKeys.list(), (old) =>
        Array.isArray(old) ? old.filter((x) => x._id !== id) : old
      )
      return { previous }
    },
    onError: (_e, _id, ctx) => {
      queryClient.setQueryData(userKeys.list(), ctx?.previous)
      toast.error('Xoá người dùng thất bại!')
    },
    onSuccess: () => {
      toast.success('Xoá người dùng thành công!')
    },
    onSettled: () => {
      setDeletingId(null)
      queryClient.invalidateQueries({ queryKey: userKeys.list() })
    },
  })

  const openEdit = (record) => {
    setEditingRow(record)
    form.resetFields()
    form.setFieldsValue({
      username: record.username,
      email: record.email,
      phone: record.phone,
      password: record.password,
      role: record.role !== undefined && record.role !== null ? record.role : 0,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
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

  const submitting = updateMutation.isPending

  const handleOk = async () => {
    try {
      const values = await form.validateFields()
      const payload = {
        username: values.username,
        email: values.email,
        phone: values.phone,
        password: values.password,
        role: values.role,
        createdAt: values.createdAt,
        updatedAt: values.updatedAt,
      }
      if (editingRow) {
        updateMutation.mutate({ id: editingRow._id, payload })
      }
    } catch {
      // Lỗi validate
    }
  }

  return (
    <>
      <section className="mb-3">
        <h1 className="font-bold text-3xl mb-2">Quản lý người dùng</h1>
        <Breadcrumb items={[{ title: 'Trang chủ' }, { title: 'Quản lý người dùng' }]} />
      </section>

      <Card title="Danh sách người dùng" className="shadow-sm rounded-2xl">
        <UserTable
          data={users}
          loading={isLoading}
          onEdit={openEdit}
          onRemove={handleRemove}
          deletingId={deletingId}
        />
      </Card>

      <UserFormModal
        open={isOpenModal}
        title={'Cập nhật người dùng'}
        submitting={submitting}
        form={form}
        onOk={handleOk}
        onCancel={closeModal}
      />
    </>
  )
}

export default UserManagement
