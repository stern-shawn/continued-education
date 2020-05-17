import React from 'react';

const getCommentContent = (comment) => {
  const statusToContentMap = {
    pending: 'This comment is awaiting moderation',
    approved: comment.content,
    rejected: 'This comment has been rejected',
  };

  return statusToContentMap[comment.status];
};

export default function CommentList({ comments }) {
  return (
    <div>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>{getCommentContent(comment)}</li>
        ))}
      </ul>
    </div>
  );
}
