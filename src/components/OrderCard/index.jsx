import React from 'react'
import { Tag } from 'antd'

const STATUS_COLOR = {
    pending: 'orange',
    processing: 'blue',
    completed: 'green',
    cancelled: 'red',
}

const formatCurrency = (value = 0) => {
    try {
        return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
    } catch (e) {
        return value
    }
}

const OrderCard = ({ order = {} }) => {
    const { id = 'N/A', date = 'N/A', total = 0, status = 'N/A' } = order
    const color = STATUS_COLOR[(status || '').toLowerCase()] || 'default'

    return (
        <div className="border border-gray-200 rounded p-4 mb-4 flex justify-between items-center">
            <div>
                <div className="text-sm text-gray-500">Mã đơn: <span className="font-medium">{id}</span></div>
                <div className="text-sm text-gray-500">Ngày: <span>{date}</span></div>
                <div className="text-base font-semibold mt-1">{formatCurrency(total)}</div>
            </div>

            <div className="flex flex-col items-end">
                <Tag color={color} className="mb-2">{status}</Tag>
                <button
                    type="button"
                    className="text-sm text-orange-500 hover:underline"
                    onClick={() => {
                        // Best-effort navigation to order detail page if route exists
                        if (!id) return
                        window.location.href = `/order/${id}`
                    }}
                >
                    Xem chi tiết
                </button>
            </div>
        </div>
    )
}

export default OrderCard
