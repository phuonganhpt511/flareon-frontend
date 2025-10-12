import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Card, Breadcrumb, Input } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import AntButton from '@/components/AntButton'
import categoryAPI from '@/apis/category/category.api'
import { CategorySchema } from '@/shared/validations/category.schema'
import CategoryTable from './CategoryTable'
import CategoryFormModal from './CategoryFormModal'
import { DEFAULT_FORM_VALUES } from '@/shared/constants/category'

const CategoryManagement = () => {
  const [categories, setCategories] = useState([])
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [rowData, setRowData] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const fetchCategories = async () => {
    try {
      setIsLoading(true)
      const res = await categoryAPI.getAll()
      setCategories(res.data)
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(CategorySchema),
    defaultValues: DEFAULT_FORM_VALUES,
  })

  const openCreate = () => {
    setRowData(null)
    reset(DEFAULT_FORM_VALUES)
    setIsOpenModal(true)
  }

  const openEdit = (record) => {
    setRowData(record)
    reset({
      category_name: record.category_name,
      description: record.description || '',
      imageUrl: record.imageUrl || '',
      status: record.status ?? 1,
    })
    setIsOpenModal(true)
  }

  const handleRemove = async (id) => {
    try {
      await categoryAPI.delete(id)
      toast.success('Xoá danh mục thành công!')
      setCategories((prev) => prev.filter((item) => item._id !== id))
    } catch (e) {
      console.error(e)
      toast.error('Xoá danh mục thất bại!')
    }
  }

  const onSubmit = async (values) => {
    const payload = {
      category_name: values.category_name,
      description: values.description,
      imageUrl: values.imageUrl,
      status: values.status,
    }

    try {
      setSubmitting(true)
      if (rowData) {
        await categoryAPI.update(rowData._id, payload)
        await fetchCategories()
        toast.success('Cập nhật danh mục thành công!')
      } else {
        const res = await categoryAPI.create(payload)
        toast.success('Thêm danh mục thành công!')
        setCategories((prev) => [res.data, ...prev])
      }
      setIsOpenModal(false)
      setRowData(null)
      reset(DEFAULT_FORM_VALUES)
    } catch (e) {
      console.error(e)
      toast.error('Lưu danh mục thất bại!')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <section className="mb-3">
        <h1 className="font-bold text-3xl mb-2">Quản lý danh mục</h1>
        <Breadcrumb items={[{ title: 'Trang chủ' }, { title: 'Quản lý danh mục' }]} />
      </section>

      <section className="flex justify-between mb-3">
        <Input.Search placeholder="Tìm kiếm danh mục" allowClear style={{ maxWidth: 300 }} />
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
        />
      </Card>

      <CategoryFormModal
        isOpen={isOpenModal}
        rowData={rowData}
        submitting={submitting}
        control={control}
        errors={errors}
        setValue={setValue}
        handleOk={handleSubmit(onSubmit)}
        onCancel={() => {
          reset(DEFAULT_FORM_VALUES)
          setIsOpenModal(false)
          setRowData(null)
        }}
      />
    </>
  )
}

export default CategoryManagement
