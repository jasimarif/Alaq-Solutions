import React from 'react';
import { useNavigate } from 'react-router-dom';

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();

  return (
    <article
      onClick={() => navigate(`/blogs/${blog.id}`)}
      className="bg-gray-800 rounded-2xl overflow-hidden transition-all duration-300 cursor-none group"
    >
      <div className="aspect-video bg-gray-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 group-hover:opacity-80 transition-opacity duration-300"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-lg font-semibold">Blog Image</div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-gray-400 text-sm">{blog.date}</span>
        </div>

        <h2 className="text-xl font-bold text-white mb-3 line-clamp-1 group-hover:text-accent-soft transition-colors duration-300">
          {blog.title}
        </h2>

        <p className="text-gray-300 text-sm mb-4 line-clamp-3">
          {blog.excerpt}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-gray-400 text-sm">By {blog.author}</span>
          <span className="text-accent-soft hover:text-accent-soft transition-colors duration-300 font-medium cursor-none">
            Read More →
          </span>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;