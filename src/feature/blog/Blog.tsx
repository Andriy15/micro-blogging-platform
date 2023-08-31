import React from 'react';
import { IBlog } from '../service/service.model';

interface BlogProps {
  blog: IBlog;
}

export function Blog({ blog }: BlogProps) {
  return (
     <div className="bg-white rounded-lg shadow-md p-4 my-4">
       <img src={blog.urlToImage} alt={blog.title} className="w-full h-auto rounded-lg mb-2" />
       <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
       <p className="text-gray-600 mb-2">{blog.description}</p>
       <p className="text-gray-700 font-medium mb-1">Author: {blog.author}</p>
       <p className="text-gray-700 mb-1">Source: {blog.source.name}</p>
       <p className="text-gray-700 mb-2">Published at: {blog.publishedAt}</p>
       <a href={blog.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
         Read more
       </a>
     </div>
  );
}
