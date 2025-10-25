export const getTableLink = ({ tableId, tableName }) => {
  const baseUrl = import.meta.env.VITE_LOCAL_URL || 'http://localhost:3000'
  return `${baseUrl}/table/${tableName}?id=${tableId}`
}

export const getQRDataUrl = (canvasRef) => {
  if (!canvasRef?.current) return null
  try {
    return canvasRef.current.toDataURL('image/png')
  } catch {
    return null
  }
}

export const downloadQR = (dataUrl, fileName = 'qr-table.png') => {
  if (!dataUrl) return
  const a = document.createElement('a')
  a.href = dataUrl
  a.download = fileName
  a.click()
}
