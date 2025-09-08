import { Link } from 'react-router-dom'
import CommentLine from '../../assets/icons/comment-line.svg?react'

interface CommentButtonProps {
  commentCount: number
  postId: string | number
}

function CommentButton({ commentCount, postId }: CommentButtonProps) {
  return (
    <Link
      to={`/post-detail/${postId}`}
      className="flex items-center gap-2 p-2 rounded group"
    >
      <div className="w-8 h-8 flex items-center justify-center rounded-full group-hover:bg-primary/10 transition-colors">
        <CommentLine className="w-5 h-5 text-text-secondary group-hover:text-primary transition-colors" />
      </div>
      <span className="text-sm text-text-secondary group-hover:text-primary transition-colors">
        {commentCount}
      </span>
    </Link>
  )
}

export default CommentButton
