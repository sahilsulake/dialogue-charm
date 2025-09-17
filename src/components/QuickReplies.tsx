import React from 'react';

interface QuickReply {
  id: string;
  text: string;
}

interface QuickRepliesProps {
  quickReplies: QuickReply[];
  onQuickReply: (reply: QuickReply) => void;
}

const QuickReplies: React.FC<QuickRepliesProps> = ({
  quickReplies,
  onQuickReply
}) => {
  return (
    <div className="quick-replies">
      {quickReplies.map((reply) => (
        <button
          key={reply.id}
          className="quick-reply-btn"
          onClick={() => onQuickReply(reply)}
        >
          {reply.text}
        </button>
      ))}
    </div>
  );
};

export default QuickReplies;