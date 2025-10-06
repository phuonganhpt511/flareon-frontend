import React from 'react'
import OderItem from './oderItem';

const OderPage = () => {
    return (
        <div
            className="bg-white flex flex-col items-center"
            style={{ width: 744, minHeight: 1177, margin: '0 auto' }}
        >
            {/* Header */}
            <div className="w-[672px] mx-auto pt-6 pb-2">
                <span className="text-orange-500 text-xl font-semibold">&lt; Đơn hàng</span>
            </div>
            {/* Order List */}
            <OderItem />
            
        </div>
    );
}

export default OderPage