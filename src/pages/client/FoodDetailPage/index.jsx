import React, { useState } from 'react';

import CommentCard from '@/layouts/DefaultLayout/components/CommentCard';


const foodData = {
    id: 1,
    name: 'Bún Bò Huế Đặc Biệt',
    imageUrl: '/images/banner.png',
    description: 'Một tô bún bò Huế đầy đặn với nước dùng đậm đà, thơm mùi sả và mắm ruốc đặc trưng. Ăn kèm chả cua, tiết, bắp bò và rau sống tươi ngon.',
    price: 50000,
    comments: [
        {
            id: 1,
            author: 'Thanh Hằng',
            avatar: 'https://i.pravatar.cc/150?u=thanhhang',
            rating: 5,
            text: 'Bún bò ở đây rất ngon, nước dùng đậm đà đúng vị. Chắc chắn sẽ quay lại!',
            time: '1 giờ trước',
            replyCount: 8
        },
        {
            id: 2,
            author: 'Minh Tuấn',
            avatar: 'https://i.pravatar.cc/150?u=minhtuan',
            rating: 4,
            text: 'Tô bún đầy đặn, nhiều thịt. Giá cả hợp lý so với chất lượng.',
            time: '3 giờ trước',
            replyCount: 2
        },
    ]
};


const FoodDetailPage = () => {
    const [quantity, setQuantity] = useState(1);

    const handleIncrease = () => {
        setQuantity(prev => prev + 1);
    };

    const handleDecrease = () => {
        setQuantity(prev => (prev > 1 ? prev - 1 : 1));
    };

    return (
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            {/* Phần thông tin chính của món ăn */}
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                {/* Ảnh món ăn */}
                <div className="lg:w-1/2">
                    <img 
                        src={foodData.imageUrl} 
                        alt={foodData.name} 
                        className="w-full h-auto object-cover rounded-lg shadow-lg"
                    />
                </div>

                {/* Thông tin món ăn */}
                <div className="lg:w-1/2 flex flex-col">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800">{foodData.name}</h1>
                    <p className="mt-4 text-gray-600 leading-relaxed">{foodData.description}</p>
                    <p className="mt-6 text-4xl font-bold text-orange-500">
                        {foodData.price.toLocaleString('vi-VN')} ₫
                    </p>
                    
                    <div className="mt-8 flex items-center space-x-4">
                        <label htmlFor="quantity" className="font-semibold text-gray-700">Số lượng:</label>
                        <div className="flex items-center border border-gray-300 rounded-md">
                            <button onClick={handleDecrease} className="px-3 py-2 text-lg font-semibold">-</button>
                            <input type="text" value={quantity} readOnly className="w-14 text-center border-l border-r border-gray-300 focus:outline-none"/>
                            <button onClick={handleIncrease} className="px-3 py-2 text-lg font-semibold">+</button>
                        </div>
                    </div>

                    <button className="mt-8 w-full bg-orange-500 text-white font-bold py-3 px-6 rounded-lg text-lg hover:bg-orange-600 transition-colors duration-300">
                        Thêm vào giỏ hàng
                    </button>
                </div>
            </div>

            {/* Phần bình luận */}
            <div className="mt-12 pt-8 border-t border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Đánh giá & Bình luận</h2>
                <div className="space-y-6">
                    {foodData.comments.map(comment => (
                        <CommentCard key={comment.id} comment={comment} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FoodDetailPage;