import { Link } from 'react-router-dom'

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
        <span>💬</span>
      </div>

      <span className="text-sm group-hover:text-primary transition-colors">
        {commentCount}
      </span>
    </Link>
  )
}

export default CommentButton
