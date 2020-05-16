import React from 'react';

export default function CommentList({ comments }) {
  return (
    <div>
      <ul>
        {comments.map((comment) => {
          let content;
          if (comment.status === 'approved') {
            content = comment.content;
          }
          if (comment.status === 'pending') {
            content = 'This comment is awaiting moderation';
          }
          if (comment.status === 'rejected') {
            content = 'This comment has been rejected';
          }

          return <li key={comment.id}>{content}</li>;
        })}
      </ul>
    </div>
  );
}
