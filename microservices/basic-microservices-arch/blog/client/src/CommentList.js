import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function CommentList({ postId }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      const { data } = await axios.get(`http://localhost:4001/posts/${postId}/comments`);
      setComments(data);
    };

    fetchComments();
  }, [postId]);

  return (
    <div>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>
    </div>
  );
}
