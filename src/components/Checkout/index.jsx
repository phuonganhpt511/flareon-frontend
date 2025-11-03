import { Button, Card, Col, Form, Input, Radio, Row, Table } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import axios from 'axios'
import { useState } from 'react'

function Checkout() {
  const handleVNPayPayment = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/payment/create-qr', {
        amount: 100000,
        orderId: 'ORDER123',
        orderInfo: 'Thanh toán đơn hàng ORDER123',
      })

      const { paymentUrl } = response.data
      window.location.href = paymentUrl // Redirect sang VNPay
    } catch (error) {
      alert('Không thể tạo URL thanh toán VNPay')
      console.error(error)
    }
  }

  return (
    <div>
      <h1>Thanh toán</h1>
      <Row>
        <Col span={10}>
          {/* Thông tin sản phẩm */}
          <Card title="Thông tin sản phẩm">
            <Table pagination={false} dataSource={data} columns={columns} />
            <h3>Tổng tiền: 3000</h3>

            <Radio.Group
              defaultValue={'VNPAY'}
              onChange={(e) => {
                setPaymentMethod(e.target.value)
              }}
              style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
            >
              <Radio value={'VNPAY'}>VNPAY</Radio>
              <Radio value={'ZALOPAY'}>ZALOPAY</Radio>
              <Radio value={'COD'}>Ship COD</Radio>
            </Radio.Group>

            <Button
              onClick={handleVNPayPayment}
              style={{ marginTop: 20 }}
              color="primary"
              variant="solid"
            >
              Thanh toán
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Checkout
