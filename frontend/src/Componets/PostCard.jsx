import React from 'react';

const PostCard = ({ post, onEdit, onDelete }) => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg m-4 bg-gray-800 text-white">
            <img className="w-full h-48 object-cover" src={post.image} alt={post.title} />
            <div className="px-6 py-4">
                <p className="text-white text-base">{post.description}</p>
                <div className="flex justify-between mt-4">
                    <button
                        className="btn btn-primary me-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => onEdit(post._id)}
                    >
                        Edit
                    </button>
                    <button
                        className="btn btn-danger bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => onDelete(post._id)}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PostCard;
