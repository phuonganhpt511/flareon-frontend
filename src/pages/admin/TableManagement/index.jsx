import React, { useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import { Card, Breadcrumb, Form } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'
import AntButton from '@/components/AntButton'
import TableTable from './TableTable'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import TableFormModal from './TableFormModal'
import tableAPI from '@/apis/table/table.api'

const tableKeys = {
  all: ['tables'],
  list: () => ['tables', 'list'],
  detail: (id) => ['tables', 'detail', id],
}

const TableManagement = () => {
  const [form] = Form.useForm()
  const queryClient = useQueryClient()
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [editingRow, setEditingRow] = useState(null)
  const [deletingId, setDeletingId] = useState(null)

  // GET LIST
  const { data: tables = [], isLoading } = useQuery({
    queryKey: tableKeys.list(),
    queryFn: async () => {
      const res = await tableAPI.getAll()
      return res.data || []
    },
    staleTime: 60000,
    refetchOnWindowFocus: false,
    onError: () => toast.error('Không thể tải bàn ăn, vui lòng thử lại!'),
  })

  // CREATE
  const createMutation = useMutation({
    mutationFn: (payload) => tableAPI.create(payload),
    onSuccess: () => {
      toast.success('Thêm bàn ăn thành công!')
      queryClient.invalidateQueries({ queryKey: tableKeys.list() })
      closeModal()
    },
    onError: () => toast.error('Thêm bàn ăn thất bại!'),
  })

  // UPDATE
  const updateMutation = useMutation({
    mutationFn: ({ id, payload }) => tableAPI.update(id, payload),
    onSuccess: async () => {
      toast.success('Cập nhật bàn ăn thành công!')
      await queryClient.invalidateQueries({ queryKey: tableKeys.list() })
      closeModal()
    },
    onError: () => toast.error('Cập nhật bàn ăn thất bại!'),
  })

  // DELETE
  const deleteMutation = useMutation({
    mutationFn: (id) => tableAPI.delete(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: tableKeys.list() })
      const previous = queryClient.getQueryData(tableKeys.list())
      queryClient.setQueryData(tableKeys.list(), (old) =>
        Array.isArray(old) ? old.filter((x) => x._id !== id) : old
      )
      return { previous }
    },
    onError: (_e, _id, ctx) => {
      queryClient.setQueryData(tableKeys.list(), ctx?.previous)
      toast.error('Xoá bàn ăn thất bại!')
    },
    onSuccess: () => {
      toast.success('Xoá bàn ăn thành công!')
    },
    onSettled: () => {
      setDeletingId(null)
      queryClient.invalidateQueries({ queryKey: tableKeys.list() })
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
      table_name: record.table_name,
      capacity: record.capacity,
      qr_code: record.qr_code, // Để tạm sẽ xóa
      status: record.status,
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
  const modalTitle = useMemo(() => (editingRow ? 'Cập nhật bàn ăn' : 'Thêm bàn ăn'), [editingRow])

  const handleOk = async () => {
    try {
      const values = await form.validateFields()
      const payload = {
        table_name: values.table_name,
        capacity: values.capacity,
        qr_code: 'Test', // Để tạm sẽ xóa
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
    <>
      <section className="mb-3">
        <h1 className="font-bold text-3xl mb-2">Quản lý bàn ăn</h1>
        <Breadcrumb items={[{ title: 'Trang chủ' }, { title: 'Quản lý bàn ăn' }]} />
      </section>

      <section className="flex justify-end mb-5">
        <AntButton type="primary" icon={<PlusCircleOutlined />} onClick={openCreate}>
          Thêm mới
        </AntButton>
      </section>

      <Card title="Danh sách bàn ăn" className="shadow-sm rounded-2xl">
        <TableTable
          data={tables}
          loading={isLoading}
          onEdit={openEdit}
          onRemove={handleRemove}
          deletingId={deletingId}
        />
      </Card>

      <TableFormModal
        open={isOpenModal}
        title={modalTitle}
        submitting={submitting}
        form={form}
        onOk={handleOk}
        onCancel={closeModal}
      />
    </>
  )
}

export default TableManagement
