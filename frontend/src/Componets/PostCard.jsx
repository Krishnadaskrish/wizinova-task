import React from 'react';

const PostCard = ({ post }) => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
            <img className="w-full h-48 object-cover" src={post.image} alt='hey' />
            <div className="px-6 py-4">
                <p className="text-gray-700 text-base">{post.description}</p>
            </div>
            
        </div>
    );
};

export default PostCard;
