import React, { useState, useEffect } from 'react';
import axios from 'axios';

import CommentCreate from './CommentCreate';
import CommentList from './CommentList';

export default function PostList() {
  const [posts, setPosts] = useState({});

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await axios.get('http://localhost:4002/posts');
      setPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {Object.values(posts).map((post) => (
        <div className="card" style={{ width: '30%', marginBottom: '20px' }} key={post.id}>
          <div className="card-body">
            <h3>{post.title}</h3>
            <CommentList comments={post.comments} />
            <hr />
            <CommentCreate postId={post.id} />
          </div>
        </div>
      ))}
    </div>
  );
}
