import React, { useRef, useCallback } from 'react'
import { QRCodeCanvas } from 'qrcode.react'
import { getTableLink } from '@/shared/utils/utils'
import AntButton from '../AntButton'
import { DownloadOutlined } from '@ant-design/icons'

const AppQRCode = ({ tableId, tableName, size = 180 }) => {
  const qrRef = useRef(null)

  const handleDownload = useCallback(() => {
    const qrCanvas = qrRef.current
    if (!qrCanvas) return

    const padding = 20
    const textHeight = 50
    const totalHeight = size + textHeight + padding * 2
    const totalWidth = size + padding * 2

    const combinedCanvas = document.createElement('canvas')
    combinedCanvas.width = totalWidth
    combinedCanvas.height = totalHeight

    const ctx = combinedCanvas.getContext('2d')
    ctx.fillStyle = '#fff'
    ctx.fillRect(0, 0, totalWidth, totalHeight)
    ctx.drawImage(qrCanvas, padding, padding, size, size)
    ctx.font = 'bold 20px sans-serif'
    ctx.fillStyle = '#f97316'
    ctx.textAlign = 'center'
    ctx.fillText(tableName || '', totalWidth / 2, size + padding + 25)
    ctx.font = '14px sans-serif'
    ctx.fillStyle = '#4b5563'
    ctx.fillText('Quét QR Code để gọi món', totalWidth / 2, size + padding + 45)

    const dataUrl = combinedCanvas.toDataURL('image/png')
    const a = document.createElement('a')
    a.href = dataUrl
    a.download = `${tableName || 'qr-table'}.png`
    a.click()
  }, [tableName, size])

  return (
    <div className="flex flex-col items-center gap-2">
      <QRCodeCanvas
        ref={qrRef}
        value={getTableLink({ tableId, tableName })}
        size={size}
        bgColor="#ffffff"
        fgColor="#000000"
        level="H"
        includeMargin
      />

      <span className="text-lg font-bold text-orange-400">{tableName}</span>
      <span className="text-gray-600">Quét QR Code để gọi món</span>

      <AntButton
        onClick={handleDownload}
        className="px-3 py-1.5 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
        icon={<DownloadOutlined />}
      >
        Tải xuống
      </AntButton>
    </div>
  )
}

export default AppQRCode
