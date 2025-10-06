import React from 'react';

// Component để hiển thị các ngôi sao đánh giá
const StarRating = ({ rating }) => {
    return (
        <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
                <svg
                    key={i}
                    className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ))}
        </div>
    );
};

const CommentCard = ({ comment }) => {
    return (
        <div className="flex gap-4 p-4 border-b last:border-b-0">
            <img 
                src={comment.avatar} 
                alt={comment.author} 
                className="w-12 h-12 rounded-full" 
            />
            <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-gray-800">{comment.author}</span>
                    <span className="text-sm text-gray-500">{comment.time}</span>
                </div>
                <StarRating rating={comment.rating} />
                <p className="my-2 text-gray-700">{comment.text}</p>
                <div className="text-sm text-gray-600 flex items-center gap-1 cursor-pointer hover:text-blue-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                    <span>{comment.replyCount} comments</span>
                </div>
            </div>
        </div>
    );
};

export default CommentCard;